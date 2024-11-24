<!--
/**
* @author yongchin
* @date 2022-04-27
* @desc 任务管理/报告列表
*/
-->
<script setup lang="ts">
import { reactive, ref, onMounted, h } from "vue";
import { useMessage, NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar, Doughnut } from "vue-chartjs";
import TaskReportDialog from "~/components/TaskReportModal.vue";
import TaskApi from "~/request/task";

// 注册 Chart.js 组件
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

// 类型定义
interface RowData {
  id: number;
  name: string;
  tests: number;
  passed: number;
  error: number;
  failure: number;
  skipped: number;
  run_time: string;
  create_time: string;
}

interface QueryParams {
  page: number;
  size: number;
  task_id: number;
}

// Props 定义
const props = defineProps({
  tid: { 
    type: Number, 
    required: true 
  },
});

// 状态管理
const message = useMessage();
const checkedRowKeysRef = ref<[number]>([0]);

/**
 * 页面数据状态
 */
const datas = reactive({
  loading: true,
  reportDialog: false,
  reportId: 0,
  resultType: "",
  tableData: [] as RowData[],
  total: 0,
  query: {
    page: 1,
    size: 10,
    task_id: 0,
  } as QueryParams,
});

/**
 * 图表配置
 */
const chartColors = ["#5c60f5", "#00CC88", "#FF3366", "#FF8C00", "#CFD6DF"];
const chartLabels = ["总数", "通过", "错误", "失败", "跳过"];

// 柱状图配置
const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  height: 800,
};

// 环形图配置
const doughnutChartOptions = {
  responsive: true,
  cutout: 70,
  radius: 80,
};

// 图表数据
const barChartData = ref(createInitialBarChartData());
const doughnutChartData = ref(createInitialDoughnutChartData());

/**
 * 创建初始柱状图数据
 */
function createInitialBarChartData() {
  return {
    labels: chartLabels,
    datasets: [{
      label: "总数",
      data: [0, 0, 0, 0, 0],
      backgroundColor: chartColors,
      borderColor: chartColors,
      borderWidth: 1,
      borderRadius: 10,
      barThickness: 20,
    }]
  };
}

/**
 * 创建初始环形图数据
 */
function createInitialDoughnutChartData() {
  return {
    labels: chartLabels,
    datasets: [{
      label: "数量",
      data: [1, 1, 1, 1, 1],
      backgroundColor: chartColors,
      borderColor: chartColors,
      cutoutPercentage: 10,
      hoverOffset: 50,
    }]
  };
}

/**
 * 渲染柱状图数据
 */
const renderBarChartData = (data: number[]) => ({
  labels: chartLabels,
  datasets: [{
    label: "总数",
    data,
    backgroundColor: chartColors,
    borderColor: chartColors,
    borderWidth: 1,
    borderRadius: 10,
    barThickness: 20,
  }]
});

/**
 * 渲染环形图数据
 */
const renderDoughnutChartData = (data: number[]) => ({
  labels: chartLabels,
  datasets: [{
    label: "数量",
    data,
    backgroundColor: chartColors,
    borderColor: chartColors,
    cutoutPercentage: 10,
    hoverOffset: 50,
  }]
});

// 表格相关方法和配置
/**
 * 处理报告名称点击
 */
const clickReportName = (row: RowData) => {
  console.log(row);
};

/**
 * 创建表格列配置
 */
function createColumnsReport({clickReportName}: {
  clickReportName: (row: RowData) => void;
}): DataTableColumns<RowData> {
  return [
    {
      type: "selection",
      multiple: false,
    },
    {
      title: "名称",
      key: "name",
    },
    {
      title: "总数",
      key: "tests",
    },
    {
      title: "通过",
      key: "passed",
    },
    {
      title: "错误",
      key: "error",
    },
    {
      title: "失败",
      key: "failure",
    },
    {
      title: "跳过",
      key: "skipped",
    },
    {
      title: "运行(s)",
      key: "run_time",
    },
    {
      title: "创建时间",
      key: "create_time",
    },
    {
      title: "操作",
      key: "actions",
      render(row) {
        return h(
          NButton,
          {
            type: "info",
            strong: true,
            secondary: true,
            size: "small",
            onClick: () => showReport(row, "tests"),
          },
          { default: () => "查看" }
        );
      },
    },
  ];
}

// 表格配置
const columnsReport = createColumnsReport({ clickReportName });
const pagination = false as const;

// 事件处理方法
/**
 * 初始化报告列表
 */
const initReportList = async () => {
  datas.query.task_id = props.tid;
  try {
    const resp = await TaskApi.getReportAll(datas.query);
    if (resp.success) {
      datas.tableData = resp.result;
      datas.total = resp.total;
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('获取报告列表失败');
  }
};

/**
 * 处理页码变更
 */
const pageChange = (page: number) => {
  datas.query.page = page;
  initReportList();
};

/**
 * 显示报告详情
 */
const showReport = (row: RowData, type: string) => {
  datas.reportDialog = true;
  datas.reportId = row.id;
  datas.resultType = type;
};

/**
 * 关闭报告弹窗
 */
const cancelDialog = () => {
  datas.reportDialog = false;
};

/**
 * 处理行点击
 */
const rowKey = (row: RowData) => row.id;

const rowProps = (row: RowData) => ({
  style: "cursor: pointer;",
  onClick: () => {
    checkedRowKeysRef.value = [row.id];
    const data = [row.tests, row.passed, row.error, row.failure, row.skipped];
    barChartData.value = renderBarChartData(data);
    doughnutChartData.value = renderDoughnutChartData(data);
  },
});

// 生命周期钩子
onMounted(() => {
  initReportList();
});
</script>

<template>
  <div class="task-report">
    <!-- 图表展示 -->
    <n-space justify="space-between">
      <Doughnut
        id="my-chart-id"
        :options="doughnutChartOptions"
        :data="doughnutChartData"
      />
      <Bar 
        id="my-chart-id" 
        :options="barChartOptions" 
        :data="barChartData" 
      />
    </n-space>

    <!-- 数据表格 -->
    <n-data-table
      class="table"
      :columns="columnsReport"
      :data="datas.tableData"
      :pagination="pagination"
      :bordered="false"
      :row-key="rowKey"
      :row-props="rowProps"
      v-model:checked-row-keys="checkedRowKeysRef"
    />

    <!-- 分页 -->
    <div class="foot-page">
      <n-space vertical>
        <n-pagination 
          :default-page-size="datas.query.size"
          :item-count="datas.total"
          :on-update:page="pageChange"
        />
      </n-space>
    </div>

    <!-- 报告详情弹窗 -->
    <n-modal
      v-model:show="datas.reportDialog"
      class="custom-card"
      preset="card"
      title="报告详情"
      size="huge"
      style="width: 1200px"
      :bordered="false"
    >
      <TaskReportDialog 
        :rid="datas.reportId" 
        :type="datas.resultType" 
      />
    </n-modal>
  </div>
</template>

<style scoped>
.table {
  height: 100%;
}
</style>
