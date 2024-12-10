<script setup lang="ts">
import { reactive, onMounted, h, ref } from "vue";
import {
  NButton,
  NIcon,
  useMessage,
  useDialog,
  NSpace,
  NTag,
  type ModalProps,
  NSwitch
} from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import {
  SearchOutline as SearchIcon,
  ArrowBack as BackIcon,
  List as ListIcon
} from "@vicons/ionicons5";
import TaskApi from "~/request/task";
import TeamApi from "~/request/team";
import TaskReport from "@/TaskReport.vue";
import TaskModal from "@/TaskModal.vue";
import projectStorage from '~/store/index';
import TaskTimed from "@/TaskTimed.vue";

// 类型定义
/**
 * 任务数据行类型
 */
interface TaskRow {
  id: number;
  name: string;
  env: string;
  team: string;
  execute_count: number;
  status: number;
  create_time: string;
  timed_status: string;
  timed_conf: {
    job_id?: string;
    url?: string;
    second?: string;
    minute?: string;
    hour?: string;
    day?: string;
    month?: string;
    day_of_week?: string;
  };
}

/**
 * 查询参数类型
 */
interface QueryParams {
  page: number;
  size: number;
  project_id: string;
  team_id: string | null;
  name: string | null;
}

/**
 * 页面数据状态类型
 */
interface PageState {
  loading: boolean;
  projectId: string;
  caseNumber: number;
  tableData: TaskRow[];
  teamIdSelected: string;
  tid: number;
  total: number;
  query: QueryParams;
  taskFlag: boolean;
  timedDialog: boolean;
}

/**
 * 模态框数据类型
 */
interface ModalState {
  type?: number;
  taskId?: number;
  title: string;
}

/**
 * 团队选项类型
 */
interface TeamOption {
  value: string;
  label: string;
}

/**
 * 团队模型类型
 */
interface TeamModel {
  teamOptions: TeamOption[];
  envOptions: never[];
}

/**
 * 团队数据类型
 */
interface TeamData {
  id: string;
  name: string;
}

/**
 * 模态框配置类型
 */
interface ModalConfig {
  segmented: ModalProps['segmented']
}

// 全局状态和工具
const message = useMessage();
const dialog = useDialog();

// 响应式状态
const projectId = ref<string>("");
const showModalTask = ref(false);

const model = ref<TeamModel>({
  teamOptions: [],
  envOptions: [],
});

/**
 * 页面主数据状态
 */
const datas = reactive<PageState>({
  loading: true,
  projectId: "",
  caseNumber: 0,
  tableData: [],
  teamIdSelected: "",
  tid: 0,
  total: 0,
  query: {
    page: 1,
    size: 5,
    project_id: "",
    team_id: null,
    name: null,
  },
  taskFlag: true,
  timedDialog: false,
});

/**
 * 模态框数据状态
 */
const modalDatas = reactive<ModalState>({
  title: "",
  type: 1,
});

/**
 * 模态框配置
 */
const modalConfig = reactive<ModalConfig>({
  segmented: {
    content: 'soft',
    footer: 'soft'
  }
});

/**
 * 创建表格列配置
 */
const createColumns = ({
  play,
}: {
  play: (row: TaskRow, action: string) => void;
}): DataTableColumns<TaskRow> => {
  return [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "任务名称",
      key: "name",
      render(row) {
        return h(
          NButton,
          {
            type: "info",
            quaternary: true,
            onClick: () => play(row, "clickTaskName"),
          },
          { default: () => row.name }
        );
      },
    },
    {
      title: "环境",
      key: "env",
    },
    {
      title: "团队",
      key: "team",
    },
    {
      title: "执行次数",
      key: "execute_count",
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
      title: "定时",
      key: "timed_status",
      render(row) {
        if (!row.timed_status) {
          return h('div', null, [
            h(NTag, { type: 'default', size: 'small' }, { default: () => '未设置' })
          ]);
        }

        const active = row.timed_status === 'running';
        
        return h('div', null, [
          h(NSpace, { align: 'center' }, {
            default: () => [
              h(NSwitch, {
                value: active,
                disabled: !row.timed_status,
                onUpdateValue: async (value) => {
                  try {
                    const resp = await TaskApi.switchTimed(row.id.toString());
                    if (resp.success) {
                      message.success(value ? '定时任务已启动' : '定时任务已暂停');
                      initTaskList(); // 刷新列表
                    } else {
                      message.error(resp.error?.message || '操作失败');
                    }
                  } catch (error) {
                    message.error('操作失败');
                  }
                }
              }),
            ]
          }),
          // 显示 cron 表达式
          row.timed_conf?.minute ? h(
            'div',
            { style: 'font-size: 12px; margin-top: 4px; color: #666;' },
            `${row.timed_conf.second} ${row.timed_conf.minute} ${row.timed_conf.hour} ${row.timed_conf.day} ${row.timed_conf.month} ${row.timed_conf.day_of_week}`
          ) : null
        ]);
      }
    },
    {
      title: "创建",
      key: "create_time",
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
                  type: "info",
                  strong: true,
                  secondary: true,
                  size: "small",
                  onClick: () => play(row, "run"),
                },
                { default: () => "运行" }
              ),
              h(
                NButton,
                {
                  type: "warning",
                  strong: true,
                  secondary: true,
                  size: "small",
                  onClick: () => play(row, "timed"),
                },
                { default: () => "定时" }
              ),
              h(
                NButton,
                {
                  type: "primary",
                  strong: true,
                  secondary: true,
                  size: "small",
                  onClick: () => play(row, "edit"),
                },
                { default: () => "编辑" }
              ),
              h(
                NButton,
                {
                  type: "error",
                  strong: true,
                  secondary: true,
                  size: "small",
                  onClick: () => play(row, "delete"),
                },
                { default: () => "删除" }
              ),
            ],
          }
        );
      },
    },
  ];
};

// API 方法
/**
 * 初始化团队列表
 */
const initTeamList = async () => {
  try {
    const resp = await TeamApi.getTeamAll();
    if (resp.success) {
      model.value.teamOptions = resp.result.map((item: TeamData) => ({
        value: item.id,
        label: item.name,
      }));
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('获取团队列表失败');
    console.error(error);
  }
};

/**
 * 初始化任务列表
 */
const initTaskList = async () => {
  try {
    datas.query.project_id = projectId.value;
    datas.loading = true;
    
    const resp = await TaskApi.getTaskAll(datas.query);
    if (resp.success) {
      datas.tableData = resp.result;
      datas.total = resp.total;
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('获取任务列表失败');
    console.error(error);
  } finally {
    datas.loading = false;
  }
};

// 事件处理方法
/**
 * 处理团队选择变更
 */
const changeTeam = (value: string) => {
  datas.teamIdSelected = value;
};

/**
 * 打开任务模态框
 */
const openModalTask = (type: number) => {
  if (!projectId.value) {
    message.warning("请选择项目");
    return;
  }

  modalDatas.type = type;
  modalDatas.title = type === 1 ? "新增任务" : "编辑任务";
  datas.tid = type === 1 ? 0 : datas.tid;
  showModalTask.value = true;
};

/**
 * 删除任务
 */
const deleteTask = async (row: TaskRow) => {
  dialog.warning({
    title: "警告",
    content: "检查是否有正在运行的定时任务，确定删除?",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: async () => {
      try {
        const resp = await TaskApi.deleteTask(row.id.toString());
        if (resp.success) {
          await initTaskList();
          message.success("删除任务成功！");
        } else {
          message.error(resp.error.message);
        }
      } catch (error) {
        message.error('删除任务失败');
        console.error(error);
      }
    },
  });
};

/**
 * 运行任务
 */
const runTask = async (row: TaskRow) => {
  try {
    const resp = await TaskApi.runningTask(row.id.toString());
    if (resp.success) {
      message.success("开始运行！");
      await initTaskList();
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('运行任务失败');
    console.error(error);
  }
};

/**
 * 显示任务报告
 */
const clickTaskName = (row: TaskRow) => {
  datas.tid = row.id;
  datas.taskFlag = false;
};

/**
 * 返回任务列表
 */
const goBack = () => {
  datas.taskFlag = true;
};

/**
 * 处理分页变化
 */
const pageChange = (page: number) => {
  datas.query.page = page;
  initTaskList();
};

/**
 * 关闭模态框
 */
const closeModal = async () => {
  showModalTask.value = false;
  await initTaskList();
};

/**
 * 关闭定时任务弹窗
 */
const closeTimedModal = () => {
  datas.timedDialog = false;
};

// 表格配置
const columns = createColumns({
  play(row: TaskRow, action: string) {
    switch (action) {
      case "run":
        runTask(row);
        break;
      case "edit":
        datas.tid = row.id;
        openModalTask(2);
        break;
      case "delete":
        deleteTask(row);
        break;
      case "clickTaskName":
        clickTaskName(row);
        break;
      case "timed":
        datas.tid = row.id;
        datas.timedDialog = true;
        break;
    }
  },
});

const pagination = false;

// 生命周期钩子
onMounted(async () => {
  const projectData = projectStorage.getProject();
  if (projectData) {
    projectId.value = String(projectData.id);
  }
  await Promise.all([initTeamList(), initTaskList()]);
});
</script>

<template>
  <div class="body">
    <div class="task-list" v-if="datas.taskFlag">
      <div class="pageheader">
        <n-space justify="space-between" class="breadcrumb-navigation">
          <span>任务管理</span>
          <n-breadcrumb separator=">">
            <n-breadcrumb-item>项目管理</n-breadcrumb-item>
            <n-breadcrumb-item>任务管理</n-breadcrumb-item>
          </n-breadcrumb>
        </n-space>
      </div>
      <n-card class="main-card">
        <div>
          <n-space justify="space-between">
            <n-button type="primary" @click="openModalTask(1)">创建</n-button>
            <n-form inline :model="model" label-placement="left">
              <n-form-item label="团队">
                <n-select
                  style="width: 200px"
                  v-model:value="datas.query.team_id"
                  placeholder="选择团队"
                  :options="model.teamOptions"
                  @update:value="changeTeam"
                  clearable
                >
                </n-select>
              </n-form-item>
              <n-form-item label="名称" label-placement="left">
                <n-input
                  v-model:value="datas.query.name"
                  placeholder="请输入任务名称"
                ></n-input>
              </n-form-item>
              <n-form-item label-placement="left">
                <n-button type="primary" @click="initTaskList">
                  <template #icon>
                    <n-icon>
                      <SearchIcon />
                    </n-icon>
                  </template>
                  搜索
                </n-button>
              </n-form-item>
            </n-form>
          </n-space>
        </div>
        <!-- 任务表 -->
        <n-data-table
          :columns="columns"
          :data="datas.tableData"
          :pagination="pagination"
          :bordered="false"
        />
        <!-- 分页 -->
        <div class="foot-page">
          <n-space vertical>
            <n-pagination 
              :default-page-size="datas.query.size"
              :item-count="datas.total"
              :on-update:page="(page: number) => pageChange(page)"/>
          </n-space>
        </div>
      </n-card>

      <n-modal
        v-model:show="showModalTask"
        class="custom-card"
        preset="card"
        style="width: 1200px"
        :title="modalDatas.title"
        size="huge"
        :bordered="false"
        :segmented="modalConfig.segmented"
      >
        <TaskModal
          :type="modalDatas.type"
          :tid="datas.tid"
          @close="closeModal"
        />
      </n-modal>

      <n-modal
        v-model:show="datas.timedDialog"
        preset="card"
        style="width: 600px"
        title="定时任务"
        :bordered="false"
        :segmented="{
          content: true,
          footer: true
        }"
      >
        <TaskTimed
          :task-id="datas.tid"
          :timed-conf="datas.tableData.find(item => item.id === datas.tid)?.timed_conf"
          @cancel="closeTimedModal"
          @refresh="initTaskList"
        />
      </n-modal>

    </div>

    <div class="task-report" v-else>
      <div class="pageheader">
        <n-space justify="space-between" class="breadcrumb-navigation">
          <div>
            <n-button strong secondary type="primary" size="small" @click="goBack">
              <template #icon>
                <n-icon>
                  <BackIcon />
                </n-icon>
              </template>
              返回
            </n-button>
          </div>
          <div>
            <!-- 显示任务的名称 -->
            <n-tag>
              【{{ datas.tableData.find(item => item.id === datas.tid)?.name }}】- 报告列表
            </n-tag>
          </div>

          <n-breadcrumb separator=">">
            <n-breadcrumb-item>项目管理</n-breadcrumb-item>
            <n-breadcrumb-item>任务管理</n-breadcrumb-item>
            <n-breadcrumb-item>任务报告</n-breadcrumb-item>
          </n-breadcrumb>
        </n-space>
      </div>
      <n-card class="main-card">
        <TaskReport :tid="datas.tid" />
      </n-card>
    </div>
  </div>
</template>
