<script setup lang="ts">
import { reactive, ref, onMounted, h } from "vue";
import {
  FormInst,
  useMessage,
  SelectOption,
  TreeOption,
  NIcon,
} from "naive-ui";
import { FolderOpenOutline, LogoPython } from "@vicons/ionicons5";

import TeamApi from "~/request/team";
import ProjectApi from "~/request/project";
import TaskApi from "~/request/task";
import projectStorage from '~/store/index';

const props = defineProps({
  type: {
    type: Number,
    required: true,
  },
  tid: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["close"]);

const message = useMessage();

const projectId = ref<string>("");

type FormDatas = {
  type?: number | null;
  taskId?: number | null;
  project: string | null;
  name: string | null;
  env_id: string | null;
  team_id: string | null;
  cases: string[];
};

type ModalDatas = {
  sourceDatas: { label: string; value: string }[];
  targetDatas: string[];
  caseHashList: string[];
};

type Tdatas = {
  fileData: TreeOption[] | undefined;
  caseData: [];
};

const datas = reactive<Tdatas>({
  fileData: [],
  caseData: [],
});

const modalDatas = reactive<ModalDatas>({
  sourceDatas: [],
  targetDatas: [],
  caseHashList: [],
});

const formValue = ref<FormDatas>({
  project: projectId.value,
  name: null,
  env_id: null,
  team_id: null,
  cases: [],
});

const rulesTask = {
  name: {
    required: true,
    message: "请输入任务名称",
    trigger: ["input"],
  },
  env_id: {
    type: "number",
    required: true,
    message: "请选择运行环境",
    trigger: ["blur", "change"],
  },
  team_id: {
    type: "number",
    required: true,
    message: "请输入团队",
    trigger: ["blur", "change"],
  },
};

type TteamOptions = {
  value: string;
  label: string;
};

type TteamModel = {
  teamOptions: TteamOptions[];
  envOptions: TteamOptions[];
};

const model = ref<TteamModel>({
  teamOptions: [],
  envOptions: [],
});

type TrespDatas = {
  label: string;
  full_name: string;
  children?: [];
  leaf: boolean;
};

// 格式化tree数据
const treeDataFormat = (datas: TrespDatas[]) => {
  return datas.map((_, index) => {
    const label = _.label;
    const full_name = _.full_name;
    const children = _.children;
    const isLeaf = _.leaf ? true : false;
    const prefix = () =>
      h(NIcon, null, {
        default: () => h(isLeaf ? LogoPython : FolderOpenOutline),
      });

    return {
      label,
      full_name,
      children,
      isLeaf,
      prefix,
    };
  });
};

// 初始化项目文件列表
const initProjectFile = async () => {
  const resp = await ProjectApi.getProjectTree(projectId.value);
  if (resp.success === true) {
    datas.fileData = treeDataFormat(resp.result.files);
  } else {
    message.error(resp.error.message);
  }
};

// 初始化获取团队列表
const initTeamList = async () => {
  const resp = await TeamApi.getTeamAll();
  if (resp.success === true) {
    for (let i = 0; i < resp.result.length; i++) {
      model.value.teamOptions.push({
        value: resp.result[i].id,
        label: resp.result[i].name,
      });
    }
  } else {
    message.error(resp.error.message);
  }
};

//初始化环境列表
const initEnvsList = async () => {
  const resp = await ProjectApi.getEnvs();
  if (resp.success === true) {
    for (let i = 0; i < resp.result.length; i++) {
      model.value.envOptions.push({
        value: resp.result[i].id,
        label: resp.result[i].name,
      });
    }
  } else {
    message.error(resp.error.message);
  }
};

// 点击项目文件
const handleNodeClick = (data: any) => {
  // 如果是文件返回 类&方法
  if (data.label.match(".py")) {
    ProjectApi.getProjectCases(projectId.value, data.full_name).then(
      (resp: any) => {
        if (resp.success === true) {
          datas.caseData = resp.result;
          const fileCase = resp.result.map((_: any, index: Number) => ({
            label: _.class_name + "." + _.case_name,
            value: _.case_hash,
          }));
          // 判断用例是否在 "穿梭框" 列表，不再则添加
          for (let i of fileCase) {
            var inSourceList: boolean = false;
            for (let j of modalDatas.caseHashList) {
              if (i.value == j) {
                inSourceList = true;
                break;
              }
            }
            if (inSourceList == false) {
              modalDatas.sourceDatas.push(i);
              modalDatas.caseHashList.push(i.value);
            }
          }
        } else {
          message.error(resp.error.message);
        }
      }
    );
  } else {
    // 如果目录返回下一级 目录&文件
    if (data.children.length > 0) {
      // 下一级不为空，直接返回
      return;
    }
    ProjectApi.getProjectSubdirectory(
      projectId.value,
      data.full_name
    ).then((resp: any) => {
      if (resp.success === true) {
        data.children = treeDataFormat(resp.result);
      } else {
        message.error(resp.error.message);
      }
    });
  }
};

const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick() {
      handleNodeClick(option);
    },
  };
};

const changeTeamModel = (value: string, option: SelectOption) => {
  formValue.value.team_id = value;
};

const changeEnv = (value: string, option: SelectOption) => {
  formValue.value.env_id = value;
};

// 初始化任务详情
const initTaskDetails = async () => {
  if (props.tid === 0) {
  } else {
    const resp = await TaskApi.getTaskDetails(props.tid.toString());
    if (resp.success === true) {
      formValue.value = resp.result;
      formValue.value.taskId = resp.result.id;

      //数据返回导致该回显有点问题，延后处理
      modalDatas.sourceDatas = resp.result.case_list.map(
        (_: any, index: Number) => ({
          label: _.label,
          value: _.key,
        })
      );
      modalDatas.caseHashList = resp.result.case_list.map(
        (_: any, index: Number) => _.key
      );
      modalDatas.targetDatas = resp.result.case_list.map(
        (_: any, index: Number) => _.key
      );
    } else {
      message.error(resp.error.message);
    }
  }
};

const formRef = ref<FormInst | null>(null);

const handleSave = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (modalDatas.targetDatas.length === 0) {
        message.error("请选择测试用例！");
        return;
      }
      let payload = {
        taskId: props.tid,
        project: projectId.value,
        name: formValue.value.name,
        env_id: formValue.value.env_id,
        team_id: formValue.value.team_id,
        cases: modalDatas.targetDatas,
      };
      if (props.type === 1) {
        TaskApi.createTask(payload).then((resp: any) => {
          if (resp.success === true) {
            message.success("创建成功！");
            emits("close");
          } else {
            message.error(resp.error.message);
          }
        });
      } else {
        TaskApi.updateTask(props.tid.toString(), payload).then((resp: any) => {
          if (resp.success === true) {
            message.success("更新成功！");
            emits("close");
          } else {
            message.error(resp.error.message);
          }
        });
      }
    } else {
      message.error("必填项校验不通过");
    }
  });
};

onMounted(() => {
  const projectData = projectStorage.getProject()
  if (projectData) {
    projectId.value = String(projectData.id);
  }
  initProjectFile();
  initEnvsList();
  initTeamList();
  initTaskDetails();
});
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
