<script setup lang="ts">
import ProjectApi from "~/request/project";
import CaseApi from "~/request/case";
import { reactive, onMounted, h, ref } from "vue";
import {
  NIcon,
  useMessage,
  TreeOption,
  NSpace,
  NButton,
  NTag
} from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { FolderOpenOutline, LogoPython, Refresh } from "@vicons/ionicons5";
import CaseResult from "@/CaseResult.vue";
import CaseSync from "@/CaseSync.vue";
import CaseSyncLog from "@/CaseSyncLog.vue";
import projectStorage from '~/store/index';
import type { VNode } from 'vue';

/**
 * 树节点类型定义,继承 TreeOption 以兼容 naive-ui
 */
interface TtreeNode extends TreeOption {
  children?: TtreeNode[];
  full_name: string;
  isLeaf: boolean;
  label: string;
  prefix?: () => VNode;
}

/**
 * 用例数据行类型定义
 */
interface RowData {
  id: number;
  class_name: string;
  class_doc: string;
  case_name: string;
  case_doc: string;
  label: string;
  status: number;
}

/**
 * 环境选项类型定义
 */
interface TEnvModel {
  envOptions: Array<{ value: string; label: string }>;
}

/**
 * 页面主要数据状态接口
 */
interface PageData {
  loading: boolean;
  projectId: string;
  fileData: TtreeNode[];
  caseData: RowData[];
  caseNumber: number;
  defaultProps: {
    children: string;
    label: string;
  };
  env: string | null;
  selectedCase: Record<string, any>;
  syncCaseDialog: boolean;
  syncLogDialog: boolean;
  cid: number;
}

// 全局消息提示
const message = useMessage();

// 响应式状态
const showModal = ref(false);
const selectedTreeNode = ref<TtreeNode>();
const caseSync = ref();
const model = ref<TEnvModel>({
  envOptions: [],
});

/**
 * 页面主要数据状态
 */
const datas = reactive<PageData>({
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
  syncCaseDialog: false,
  syncLogDialog: false,
  cid: 0,
});

/**
 * 创建表格列配置
 * @param caseAction 用例操作回调函数
 * @returns DataTableColumns 表格列配置
 */
const createColumns = ({
  caseAction,
}: {
  caseAction: (row: RowData, action: String) => void;
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
      render(row) {
        const classDocText = row.class_doc || '无描述';
        return h(
          'span',
          {
            style: {
              color: '#8B8BA8'
            }
          },
          classDocText
        );
      }
    },
    {
      title: "测试方法",
      key: "case_name",
    },
    {
      title: "测试方法描述",
      key: "case_doc",
      render(row) {
        const caseDocText = row.case_doc || '无描述';
        return h(
          'span',
          {
            style: {
              color: '#8B8BA8'
            }
          },
          caseDocText
        );
      }
    },
    {
      title: "标签",
      key: "label",
      render(row) {
        const labelText = row.label || '无标签';
        return h(
          NTag,
          {
            type: 'warning',
            size: 'small',
          },
          { default: () => labelText }
        );
      }
    },
    {
      title: "状态",
      key: "status",
      render(row) {
        const statusMap: Record<number, { type: 'default' | 'success' | 'warning' | 'error', text: string }> = {
          0: { type: 'default', text: '未执行' },
          1: { type: 'warning', text: '执行中' },
          2: { type: 'success', text: '已执行' },
        };
        const status = statusMap[row.status] || { type: 'error', text: '未知' };
        return h(
          NTag,
          {
            type: status.type,
            size: 'small',
          },
          { default: () => status.text }
        );
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
                  secondary: true,
                  size: "small",
                  type: "info",
                  onClick: () => caseAction(row, "run"),
                },
                { default: () => "执行" }
              ),
              h(
                NButton,
                {
                  strong: true,
                  secondary: true,
                  size: "small",
                  type: "primary",
                  onClick: () => caseAction(row, "report"),
                },
                { default: () => "查看" }
              ),
            ],
          }
        );
      },
    },
  ];
};

// 在 createColumns 定义之后再定义 columns
const columns = ref<DataTableColumns<RowData>>(
  createColumns({
    caseAction(row: RowData, action: String) {
      switch (action) {
        case "run":
          runCase(row);
          break;
        case "report":
          openReport(row);
          break;
      }
    },
  })
);

const pagination = ref(false);

/**
 * 格式化树形数据
 * @param datas 原始数据
 * @returns 格式化后的树形数据
 */
const treeDataFormat = (datas: any): TtreeNode[] => {
  return datas.map((_: any) => {
    const label = _.label;
    const full_name = _.full_name;
    const children = _.children || [];
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
    } as TtreeNode;
  });
};

/**
 * 初始化项目文件树
 */
const initProjectFile = async () => {
  const projectData = projectStorage.getProject()
  if (projectData) {
    const projectId = String(projectData.id)
    const resp = await ProjectApi.getProjectTree(projectId);
    if (resp.success === true) {
      datas.fileData = treeDataFormat(resp.result.files);
      datas.caseNumber = resp.result.case_number;
    } else {
      message.error(resp.error.message);
    }
  }

};

/**
 * 初始化环境列表
 */
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

/**
 * 处理树节点点击事件
 * @param data 被点击的节点数据
 */
const handleNodeClick = async (data: TtreeNode) => {
  selectedTreeNode.value = data;
  try {
    if (data.label.match(".py")) {
      const resp = await ProjectApi.getProjectCases(datas.projectId, data.full_name);
      if (resp.success) {
        datas.caseData = resp.result;
      } else {
        message.error(resp.error.message);
      }
    } else {
      // 处理目录节点
      const children = data.children || [];
      if (children.length === 0) {
        const resp = await ProjectApi.getProjectSubdirectory(datas.projectId, data.full_name);
        if (resp.success) {
          data.children = treeDataFormat(resp.result);
        } else {
          message.error(resp.error.message);
        }
      }
    }
  } catch (error) {
    message.error('操作失败');
    console.error(error);
  }
};

/**
 * 配置树节点属性
 */
const nodeProps = ({ option }: { option: TreeOption }) => ({
  onClick() {
    handleNodeClick(option as TtreeNode);
  },
});

/**
 * 处理环境切换事件
 */
const changeEnv = (value: string) => {
  datas.env = value as null | string;
};

/**
 * 运行用例
 * @param row 用例数据
 */
const runCase = async (row: RowData) => {
  if (!datas.env) {
    message.warning("请选择执行环境");
    return;
  }
  
  try {
    const resp = await CaseApi.runningCase(row.id.toString(), {
      env: datas.env,
    });
    if (resp.success) {
      message.success("开始执行");
      row.status = 1
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('执行失败');
    console.error(error);
  }
};

/**
 * 刷新用例列表
 */
const refreshCase = async () => {
  if (!selectedTreeNode.value) {
    message.warning("请选择左侧树节点用例文件");
    return;
  }

  try {
    const resp = await ProjectApi.getProjectCases(
      datas.projectId,
      selectedTreeNode.value.full_name
    );
    if (resp.success) {
      message.success("刷新成功");
      datas.caseData = resp.result;
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('刷新失败');
    console.error(error);
  }
};

/**
 * 打开用例报告
 * @param row 用例数据
 */
const openReport = (row: RowData) => {
  if (row.status === 0) {
    message.warning("请先执行用例！");
    return;
  } 
  if (row.status === 1) {
    message.warning("正在执行用例！");
    return;
  }
  datas.selectedCase = row;
  datas.cid = row.id;
  showModal.value = true;
};

/**
 * 显示同步用例弹窗
 */
const showSync = () => {
  if (!datas.projectId) {
    message.warning("请选择项目！");
    return;
  }
  datas.syncCaseDialog = true;
};

/**
 * 显示同步日志弹窗
 */
const showLog = () => {
  if (!datas.projectId) {
    message.warning("请选择项目");
    return;
  }
  datas.syncLogDialog = true;
};

/**
 * 关闭同步用例弹窗回调
 */
const cancelDialog = () => {
  datas.syncCaseDialog = false;
  initProjectFile();
};

// 生命周期钩子
onMounted(() => {
  initEnvsList();
  initProjectFile();

  const projectData = projectStorage.getProject()
  if (projectData) {
    datas.projectId = String(projectData.id);
  }
});

// 添加模态框样式配置
const modalStyle = {
  width: '85%'
};

const segmented = {
  content: true,
  footer: 'soft'
};
</script>

<template>
  <div class="body">
    <div class="pageheader">
      <n-space justify="space-between" class="breadcrumb-navigation">
        <span>用例管理</span>
        <n-breadcrumb separator=">">
          <n-breadcrumb-item>项目管理</n-breadcrumb-item>
          <n-breadcrumb-item>用例管理</n-breadcrumb-item>
        </n-breadcrumb>
      </n-space>
    </div>
    <n-card class="main-card">
      <div>
        <n-space justify="space-between">
          <div>
            <n-button type="primary" @click="showSync">同步</n-button>
            <n-button @click="showLog" style="left: 10px;">日志</n-button>
          </div>
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
        <n-button strong secondary type="primary" size="small" @click="refreshCase">
          <template #icon>
            <Refresh />
          </template>
        </n-button>
      </n-space>
      <div>
        <n-grid x-gap="16" :cols="5">
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
          <n-gi span="4">
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

    <!-- 同步用例弹窗 -->
    <n-modal
      v-model:show="datas.syncCaseDialog"
      preset="card"
      style="width: 800px"
      title="同步用例"
      :segmented="segmented"
    >
      <CaseSync ref="caseSync" @cancel="cancelDialog"/>
    </n-modal>

    <!-- 同步日志弹窗 -->
    <n-modal
      v-model:show="datas.syncLogDialog"
      preset="card"
      :style="modalStyle"
      title="同步日志"
      size="huge"
      :bordered="false"
      :segmented="segmented"
    >
      <CaseSyncLog />
    </n-modal>

    <!-- 执行结果弹窗 -->
    <n-modal
      v-model:show="showModal"
      preset="card"
      :style="modalStyle"
      title="执行结果"
      size="huge"
      :bordered="false"
      :segmented="segmented"
    >
      <CaseResult :caseid="datas.cid" />
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

</style>
