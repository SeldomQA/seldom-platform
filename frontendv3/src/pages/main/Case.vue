<script setup lang="ts">
import ProjectApi from "~/request/project";
import CaseApi from "~/request/case";
import { reactive, onMounted, h, defineComponent, ref } from "vue";
import {
  NIcon,
  useMessage,
  TreeOption,
  SelectOption,
  NSpace,
  NButton,
} from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { FolderOpenOutline, LogoPython } from "@vicons/ionicons5";
import CaseResult from "~/components/CaseResult.vue";
import CaseSync from "~/components/CaseSync.vue";

type RowData = {
  id: number;
  class_name: string;
  class_doc: string;
  case_name: string;
  case_doc: string;
  status: number;
};

const createColumns = ({
  play,
}: {
  play: (row: RowData, action: String) => void;
}): DataTableColumns<RowData> => {
  return [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "测试类",
      key: "class_name",
    },
    {
      title: "测试类描述",
      key: "class_doc",
    },
    {
      title: "测试方法",
      key: "case_name",
    },
    {
      title: "测试方法描述",
      key: "case_doc",
    },
    {
      title: "状态",
      key: "status",
      render(row) {
        if (row.status === 0) {
          return "未执行";
        } else if (row.status === 1) {
          return "执行中";
        } else if (row.status === 2) {
          return "已执行";
        } else {
          return "未知";
        }
      },
    },
    {
      title: "操作",
      key: "actions",
      render(row) {
        return h(
          NSpace,
          {},
          {
            default: () => [
              h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: "small",
                  onClick: () => play(row, "report"),
                },
                { default: () => "查看" }
              ),
              h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: "small",
                  onClick: () => play(row, "run"),
                },
                { default: () => "执行" }
              ),
            ],
          }
        );
      },
    },
  ];
};

const datas = reactive({
  loading: true,
  projectId: "",
  fileData: [],
  caseData: [],
  caseNumber: 0,
  defaultProps: {
    children: "children",
    label: "label",
  },
  env: null,
  selectedCase: {},
  showCaseSync: false,
  cid: 0,
});

const selectedTreeNode = ref<TtreeNode>();

const message = useMessage();

type TEnvModel = {
  envOptions: { value: string; label: string }[];
};

const model = ref<TEnvModel>({
  envOptions: [],
});

// 初始化项目文件列表
const initProjectFile = async () => {
  const resp = await ProjectApi.getProjectTree(sessionStorage.projectId);
  if (resp.success === true) {
    datas.fileData = resp.result.files;
    datas.caseNumber = resp.result.case_number;
  } else {
    message.error(resp.error.message);
  }
};

// 格式化tree数据
const treeDataFormat = (datas: any) => {
  return datas.map((_: any, index: number) => {
    const label = _.label;
    const full_name = _.full_name;
    const children = _.children;
    const isLeaf = _.is_leaf ? true : false;
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

type TtreeNode = {
  children?: TtreeNode[];
  full_name: string;
  isLeaf: boolean;
  label: string;
};

// 点击项目文件
const handleNodeClick = (data: any) => {
  selectedTreeNode.value = data;
  // 如果是文件返回 类&方法
  if (data.label.match(".py")) {
    ProjectApi.getProjectCases(datas.projectId, data.full_name).then(
      (resp: any) => {
        if (resp.success === true) {
          message.success("获取用例成功");
          datas.caseData = resp.result;
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
    ProjectApi.getProjectSubdirectory(datas.projectId, data.full_name).then(
      (resp: any) => {
        if (resp.success === true) {
          message.success("获取用例成功");
          // console.log(resp.result);
          data.children = treeDataFormat(resp.result);
          // datas.caseData = resp.result
          // datas.initProject()
        } else {
          message.error(resp.error.message);
        }
      }
    );
  }
};

// 同步项目用例
const showCreate = () => {
  datas.showCaseSync = true;
};

const caseSync = ref();

const cancelCallback = () => {
  message.success("Cancel");
};

// 合并用例
const submitCallback = async () => {
  const resp = await ProjectApi.syncMerge(
    sessionStorage.projectId,
    caseSync.value.datas.req
  );
  if (resp.success === true) {
    message.success("合并成功！");
  } else {
    message.error(resp.error.message);
  }
};

const changeEnv = (value: string, option: SelectOption) => {
  datas.env = value;
};

// 运行用例
const runCase = async (row: RowData) => {
  if (datas.env === null) {
    message.warning("请选择执行环境");
  } else {
    const resp = await CaseApi.runningCase(row.id.toString(), {
      env: datas.env,
    });
    if (resp.success === true) {
      // datas.fileData = resp.result
      message.success("开始执行");
    } else {
      message.error("运行失败");
    }
  }
  // initProjectFile()
};

// refresh
const refresh = () => {
  if (selectedTreeNode.value == null || selectedTreeNode == undefined) {
    message.warning("请选择左侧树节点用例文件");
  } else {
    ProjectApi.getProjectCases(
      datas.projectId,
      selectedTreeNode.value.full_name
    ).then((resp: any) => {
      if (resp.success === true) {
        message.success("刷新成功");
        datas.caseData = resp.result;
      } else {
        message.error(resp.error.message);
      }
    });
  }
};

// 打开报告
const openReport = (row: RowData) => {
  datas.selectedCase = row;
  datas.cid = row.id;
  showModal.value = true;
};

const showModal = ref(false);

const columns = createColumns({
  play(row: RowData, action: String) {
    switch (action) {
      case "run":
        runCase(row);
        break;
      case "report":
        openReport(row);
        break;
    }
  },
});
const pagination = false;

const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick() {
      handleNodeClick(option);
    },
  };
};

onMounted(() => {
  initEnvsList();
  initProjectFile();
  datas.projectId = sessionStorage.projectId;
});
</script>

<template>
  <div class="body">
    <div class="pageheader">
      <n-space justify="space-between" class="breadcrumb-navigation">
        <span>用例管理</span>
        <n-breadcrumb separator=">">
          <n-breadcrumb-item>首页</n-breadcrumb-item>
          <n-breadcrumb-item>用例管理</n-breadcrumb-item>
        </n-breadcrumb>
      </n-space>
    </div>
    <n-card class="main-card">
      <div>
        <n-space justify="space-between">
          <n-button type="primary" @click="showCreate">同步</n-button>
          <n-form inline label-placement="left">
            <n-form-item label="环境">
              <n-select
                style="width: 200px"
                :options="model.envOptions"
                placeholder="选择环境"
                @update:value="changeEnv"
              >
              </n-select>
            </n-form-item>
            <n-form-item label="用例">
              <n-tag type="info" style="margin-right: 12px">{{
                datas.caseNumber
              }}</n-tag>
              条
            </n-form-item>
          </n-form>
        </n-space>
      </div>
      <n-space justify="space-between" align="center">
        <h3>用例列表</h3>
        <n-button type="primary" @click="refresh">刷新</n-button>
      </n-space>
      <div>
        <n-grid x-gap="16" :cols="6">
          <n-gi>
            <n-tree
              class="filetree"
              block-line
              expand-on-click
              :data="datas.fileData"
              key-field="label"
              :node-props="nodeProps"
            />
          </n-gi>
          <n-gi span="5">
            <n-data-table
              :columns="columns"
              :data="datas.caseData"
              :pagination="pagination"
              :bordered="false"
            />
          </n-gi>
        </n-grid>
      </div>
    </n-card>

    <n-modal id="result" v-model:show="showModal">
      <n-card
        title="执行结果"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <CaseResult :caseid="datas.cid" />
      </n-card>
    </n-modal>

    <n-modal
      id="syncpage"
      v-model:show="datas.showCaseSync"
      preset="dialog"
      title="同步用例"
      size="huge"
      positive-text="合并"
      negative-text="取消"
      @positive-click="submitCallback"
      @negative-click="cancelCallback"
    >
      <CaseSync ref="caseSync" />
    </n-modal>
  </div>
</template>

<style scoped>
.filter-line {
  padding-bottom: 20px;
}

.filetree {
  border: solid 1px var(--n-border-color);
}

.n-tree-node-content {
  text-align: left;
}

#result {
  height: 720px;
  width: 1280px;
}

#syncpage {
  width: 1080px;
}

.n-dialog__content {
  height: 85%;
}
</style>
