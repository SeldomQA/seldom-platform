<script setup lang="ts">
import { reactive, ref, onMounted, h } from "vue";
import { FormInst, useMessage, SelectOption, TreeOption, NIcon } from "naive-ui";
import { FolderOpenOutline, LogoPython } from "@vicons/ionicons5";
import TeamApi from "~/request/team";
import ProjectApi from "~/request/project";
import TaskApi from "~/request/task";
import projectStorage from '~/store/index';

// 类型定义
interface FormData {
  type?: number | null;
  taskId?: number | null;
  project: string | null;
  name: string | null;
  env_id: string | null;
  team_id: string | null;
  cases: string[];
}

interface ModalData {
  sourceDatas: Array<{ label: string; value: string }>;
  targetDatas: string[];
  caseHashList: string[];
}

interface TreeData {
  fileData: TreeOption[];
  caseData: any[];
}

interface TeamOption {
  value: string;
  label: string;
}

interface TeamModel {
  teamOptions: TeamOption[];
  envOptions: TeamOption[];
}

interface TreeDataItem {
  label: string;
  full_name: string;
  children?: any[];
  leaf: boolean;
}

// 扩展类型定义
interface TeamData {
  id: string;
  name: string;
}

interface EnvData {
  id: string;
  name: string;
}

interface CaseListItem {
  label: string;
  key: string;
}

interface CaseData {
  class_name: string;
  case_name: string;
  case_hash: string;
}

interface TreeNodeData extends TreeOption {
  label: string;
  full_name: string;
  children?: TreeNodeData[];
}

// Props & Emits
const props = defineProps({
  type: { type: Number, required: true },
  tid: { type: Number, required: true }
});

const emits = defineEmits(["close"]);

// 状态管理
const message = useMessage();
const formRef = ref<FormInst | null>(null);
const projectId = ref<string>("");

// 表单数据
const formValue = ref<FormData>({
  project: projectId.value,
  name: null,
  env_id: null,
  team_id: null,
  cases: []
});

// 模态框数据
const modalDatas = reactive<ModalData>({
  sourceDatas: [],
  targetDatas: [],
  caseHashList: []
});

// 树形数据
const datas = reactive<TreeData>({
  fileData: [],
  caseData: []
});

// 团队和环境选项
const model = ref<TeamModel>({
  teamOptions: [],
  envOptions: []
});

// 表单验证规则
const rulesTask = {
  name: {
    required: true,
    message: "请输入任务名称",
    trigger: ["input"]
  },
  env_id: {
    type: "number",
    required: true,
    message: "请选择运行环境",
    trigger: ["blur", "change"]
  },
  team_id: {
    type: "number",
    required: true,
    message: "请输入团队",
    trigger: ["blur", "change"]
  }
};

/**
 * 格式化树形数据
 * @param datas 原始树形数据
 * @returns 格式化后的树形数据
 */
const treeDataFormat = (datas: TreeDataItem[]) => {
  return datas.map(item => ({
    label: item.label,
    full_name: item.full_name,
    children: item.children || [],
    isLeaf: item.leaf,
    prefix: () => h(NIcon, null, {
      default: () => h(item.leaf ? LogoPython : FolderOpenOutline)
    })
  }));
};

/**
 * 初始化数据
 */
const initData = async () => {
  const projectData = projectStorage.getProject();
  if (projectData) {
    projectId.value = String(projectData.id);
  }
  await Promise.all([
    initProjectFile(),
    initEnvsList(),
    initTeamList(),
    initTaskDetails()
  ]);
};

/**
 * 初始化项目文件列表
 */
const initProjectFile = async () => {
  try {
    const resp = await ProjectApi.getProjectTree(projectId.value);
    if (resp.success) {
      datas.fileData = treeDataFormat(resp.result.files);
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('获取项目文件失败');
  }
};

/**
 * 初始化团队列表
 */
const initTeamList = async () => {
  try {
    const resp = await TeamApi.getTeamAll();
    if (resp.success) {
      model.value.teamOptions = (resp.result as TeamData[]).map(team => ({
        value: team.id,
        label: team.name
      }));
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('获取团队列表失败');
  }
};

/**
 * 初始化环境列表
 */
const initEnvsList = async () => {
  try {
    const resp = await ProjectApi.getEnvs();
    if (resp.success) {
      model.value.envOptions = (resp.result as EnvData[]).map(env => ({
        value: env.id,
        label: env.name
      }));
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('获取环境列表失败');
  }
};

/**
 * 初始化任务详情
 */
const initTaskDetails = async () => {
  if (props.tid === 0) return;
  
  try {
    const resp = await TaskApi.getTaskDetails(props.tid.toString());
    if (resp.success) {
      formValue.value = { ...resp.result, taskId: resp.result.id };
      
      const caseList = (resp.result.case_list || []) as CaseListItem[];
      modalDatas.sourceDatas = caseList.map(item => ({
        label: item.label,
        value: item.key
      }));
      modalDatas.caseHashList = caseList.map(item => item.key);
      modalDatas.targetDatas = caseList.map(item => item.key);
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('获取任务详情失败');
  }
};

/**
 * 处理节点点击事件
 */
const handleNodeClick = async (data: TreeNodeData) => {
  try {
    if (data.label && data.label.toString().match(".py")) {
      await handleFileNode(data);
    } else {
      await handleDirectoryNode(data);
    }
  } catch (error) {
    message.error('处理节点点击失败');
  }
};

/**
 * 处理文件节点点击
 */
const handleFileNode = async (data: TreeNodeData) => {
  const resp = await ProjectApi.getProjectCases(projectId.value, data.full_name as string);
  if (resp.success) {
    datas.caseData = resp.result;
    const fileCase = (resp.result as CaseData[]).map(item => ({
      label: `${item.class_name}.${item.case_name}`,
      value: item.case_hash
    }));
    
    fileCase.forEach(item => {
      if (!modalDatas.caseHashList.includes(item.value)) {
        modalDatas.sourceDatas.push(item);
        modalDatas.caseHashList.push(item.value);
      }
    });
  } else {
    message.error(resp.error.message);
  }
};

/**
 * 处理目录节点点击
 */
const handleDirectoryNode = async (data: TreeNodeData) => {
  if (data.children && data.children.length > 0) return;
  
  const resp = await ProjectApi.getProjectSubdirectory(projectId.value, data.full_name as string);
  if (resp.success) {
    data.children = treeDataFormat(resp.result);
  } else {
    message.error(resp.error.message);
  }
};

/**
 * 处理环境变更
 */
const changeEnv = (value: string, option: SelectOption) => {
  formValue.value.env_id = value;
};

/**
 * 处理团队变更
 */
const changeTeamModel = (value: string, option: SelectOption) => {
  formValue.value.team_id = value;
};

/**
 * 节点属性配置
 */
const nodeProps = ({ option }: { option: TreeOption }) => ({
  onClick: () => handleNodeClick(option as unknown as TreeNodeData)
});

/**
 * 处理表单保存
 */
const handleSave = async (e: MouseEvent) => {
  e.preventDefault();
  
  try {
    await formRef.value?.validate();
    
    if (modalDatas.targetDatas.length === 0) {
      message.error("请选择测试用例！");
      return;
    }

    const payload = {
      taskId: props.tid,
      project: projectId.value,
      name: formValue.value.name,
      env_id: formValue.value.env_id,
      team_id: formValue.value.team_id,
      cases: modalDatas.targetDatas
    };

    const resp = await (props.type === 1 
      ? TaskApi.createTask(payload)
      : TaskApi.updateTask(props.tid.toString(), payload));

    if (resp.success) {
      message.success(props.type === 1 ? "创建成功！" : "更新成功！");
      emits("close");
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error("表单验证失败");
  }
};

// 生命周期钩子
onMounted(initData);
</script>

<template>
  <div class="task-modal">
    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rulesTask"
      label-placement="left"
      inline
      :label-width="80"
      size="medium"
      show-require-mark
    >
      <n-form-item label="任务名称" path="name">
        <n-input v-model:value="formValue.name" placeholder="请输入任务名称" />
      </n-form-item>
      <n-form-item label="运行环境" path="env_id">
        <n-select
          v-model:value="formValue.env_id"
          style="width: 200px"
          :options="model.envOptions"
          placeholder="请选择运行环境"
          @update:value="changeEnv"
        >
        </n-select>
      </n-form-item>
      <n-form-item label="团队" path="team_id">
        <n-select
          style="width: 200px"
          v-model:value="formValue.team_id"
          placeholder="选择团队"
          :options="model.teamOptions"
          @update:value="changeTeamModel"
          clearable
        >
        </n-select>
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="handleSave"> 保存 </n-button>
      </n-form-item>
    </n-form>
    <n-divider title-placement="left"> 选择用例 </n-divider>
    <div style="height: 500px">
      <n-grid x-gap="16" :cols="8">
        <n-gi span="2">
          <n-tree
            class="filetree"
            block-line
            expand-on-click
            :data="datas.fileData"
            key-field="label"
            :node-props="nodeProps"
          />
        </n-gi>
        <n-gi span="6">
          <n-transfer
            ref="transfer"
            virtual-scroll
            :options="modalDatas.sourceDatas"
            v-model:value="modalDatas.targetDatas"
            source-filterable
            target-filterable
            class="transfer-style"
          />
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<style scoped>
.transfer-style {
  height: 500px;
}
</style>
