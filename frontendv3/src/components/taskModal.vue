<template>
  <div class="case-sync-modal">
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
    <div>
      <n-grid x-gap="16" :cols="6">
        <n-gi>
          <n-tree
            class="filetree"
            block-line
            expand-on-click
            :data="datas.fileData"
            :default-expanded-keys="defaultExpandedKeys"
            key-field="label"
            :node-props="nodeProps"
          />
        </n-gi>
        <n-gi span="5">
          <n-transfer
            ref="transfer"
            virtual-scroll
            :options="modalDatas.sourceDatas"
            v-model:value="modalDatas.targetDatas"
            source-filterable
            target-filterable
          />
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, h, watch } from "vue";
import {
  FormInst,
  useMessage,
  StepsProps,
  NTree,
  TransferRenderSourceList,
  SelectOption,
  TreeOption,
  NIcon,
} from "naive-ui";
import { FolderOpenOutline, LogoPython } from "@vicons/ionicons5";

import TeamApi from "~/request/team";
import ProjectApi from "~/request/project";
import TaskApi from "~/request/task";

const props = defineProps({
  type: Number,
  tid: Number,
});

const emits = defineEmits(["close"]);

const message = useMessage();

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
};

const datas = reactive({
  fileData: [],
  caseData: [],
});

const modalDatas: ModalDatas = reactive({
  sourceDatas: [],
  targetDatas: [],
});

const formValue = ref<FormDatas>({
  project: sessionStorage.projectId,
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

const model = ref({
  teamOptions: [],
  envOptions: [],
});

// 格式化tree数据
const treeDataFormat = (datas) => {
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
  const resp = await ProjectApi.getProjectTree(sessionStorage.projectId);
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
    message.error("查询失败!");
  }
};

const initEnvsList = async () => {
  datas.loading = true;
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
  datas.loading = false;
};

// 点击项目文件
const handleNodeClick = (data) => {
  // 如果是文件返回 类&方法
  if (data.label.match(".py")) {
    ProjectApi.getProjectCases(sessionStorage.projectId, data.full_name).then(
      (resp) => {
        if (resp.success === true) {
          message.success("获取用例成功");
          // console.log(resp.result);
          datas.caseData = resp.result;
          modalDatas.sourceDatas = resp.result.map((_, index) => ({
            label: _.case_name,
            value: _.case_hash,
          }));
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
      sessionStorage.projectId,
      data.full_name
    ).then((resp) => {
      if (resp.success === true) {
        message.success("获取用例成功");
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

const defaultExpandedKeys = ref(["40", "41"]);

const changeTeamModel = (value: string, option: SelectOption) => {
  formValue.value.team_id = value;
};

const changeEnv = (value: string, option: SelectOption) => {
  formValue.value.env_id = value;
};

// 初始化任务详情
const initTaskDetails = async () => {
  // console.log(props.tid);
  if (props.tid == null) {
  } else {
    const resp = await TaskApi.getTaskDetails(props.tid);
    if (resp.success === true) {
      formValue.value = resp.result;
      formValue.value.taskId = resp.result.id;

      //数据返回导致该回显有点问题，延后处理
      modalDatas.sourceDatas = resp.result.case_list.map((_, index) => ({
        label: _.label,
        value: _.key,
      }));
      modalDatas.targetDatas = resp.result.case_list.map((_, index) => _.key);

      console.log(modalDatas.targetDatas);
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
      console.log(modalDatas.targetDatas);
      let payload = {
        taskId: props.tid,
        project: sessionStorage.projectId,
        name: formValue.value.name,
        env_id: formValue.value.env_id,
        team_id: formValue.value.team_id,
        cases: modalDatas.targetDatas,
      };
      console.log(payload);
      if (props.type === 1) {
        TaskApi.createTask(payload).then((resp) => {
          if (resp.success === true) {
            message.success("创建成功！");
            emits("close");
          } else {
            message.error("创建失败！");
          }
        });
      } else {
        TaskApi.updateTask(props.tid, payload).then((resp) => {
          if (resp.success === true) {
            message.success("更新成功！");
            emits("close");
          } else {
            message.error("更新失败！");
          }
        });
      }
    } else {
      message.error("必填项校验不通过");
      console.log(errors);
    }
  });
};

onMounted(() => {
  initProjectFile();
  initEnvsList();
  initTeamList();
  initTaskDetails();
});
</script>
