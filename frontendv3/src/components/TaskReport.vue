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
import TaskReportDialog from "~/components/TaskReportModal.vue";
import TaskApi from "~/request/task";

const props = defineProps({
  tid: { type: Number, required: true },
});

const message = useMessage();

const datas = reactive({
  loading: true,
  reportDialog: false,
  reportId: 0,
  resultType: "",
  tableData: [],
  total: 0,
  req: {
    page: 1,
    size: 10,
    task_id: 0,
  },
});

// 初始化任务列表
const initReportList = async () => {
  datas.req.task_id = props.tid;
  const resp = await TaskApi.getReportAll(datas.req);
  if (resp.success === true) {
    datas.tableData = resp.result;
    datas.total = resp.total;
  } else {
    message.error("获得任务列表失败！");
  }
};

// 翻页（改变页数）
const pageTurning = (page: any) => {
  datas.req.page = page
  initReportList()
}

// 显示报告详情
const showReport = async (row: RowData, type: string) => {
  datas.reportDialog = true;
  datas.reportId = row.id;
  datas.resultType = type;
};
// 创建任务子组件的回调
const cancelDialog = () => {
  datas.reportDialog = false;
};

type RowData = {
  id: number;
  name: string;
  tests: number;
  passed: number;
  error: number;
  failure: number;
  skipped: number;
  run_time: string;
  create_time: string;
};

const rowKey = (row: RowData) => row.id;

const checkedRowKeysRef = ref<[number]>([0]);

const rowProps = (row: RowData) => {
  return {
    style: "cursor: pointer;",
    onClick: () => {
      checkedRowKeysRef.value = [row.id];
      let data = [row.tests, row.passed, row.error, row.failure, row.skipped];
      barChartData.value = renderBarChartData(data);
      doughnutChartData.value = renderDoughnutChartData(data);
    },
  };
};

const createColumnsReport = ({
  clickReportName,
}: {
  clickReportName: (row: RowData) => void;
}): DataTableColumns<RowData> => {
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
      title: "运行",
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
            size: "small",
            onClick: () => showReport(row, "tests"),
          },
          { default: () => "查看" }
        );
      },
    },
  ];
};

const clickReportName = (row: RowData) => {
  console.log(row);
};

const columnsReport = createColumnsReport({ clickReportName });

const pagination = false as const;

//chart.js
import { Bar, Doughnut } from "vue-chartjs";
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

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

const barChartData = ref({
  labels: ["总数", "通过", "错误", "失败", "跳过"],
  datasets: [
    {
      label: "总数",
      data: [0, 0, 0, 0, 0],
      backgroundColor: ["#5c60f5", "#00CC88", "#FF3366", "#FF8C00", "#CFD6DF"],
      borderColor: ["#5c60f5", "#00CC88", "#FF3366", "#FF8C00", "#CFD6DF"],
      borderWidth: 1,
      //柱体弧度
      borderRadius: 10,
      //柱体宽度
      barThickness: 20,
    },
  ],
});

const barChartOptions = {
  responsive: true,

  maintainAspectRatio: false,
  height: 800,
};

const doughnutChartData = ref({
  labels: ["总数", "通过", "错误", "失败", "跳过"],
  datasets: [
    {
      label: "数量",
      data: [1, 1, 1, 1, 1],
      backgroundColor: ["#5c60f5", "#00CC88", "#FF3366", "#FF8C00", "#CFD6DF"],
      borderColor: ["#5c60f5", "#00CC88", "#FF3366", "#FF8C00", "#CFD6DF"],
      cutoutPercentage: 10,
      hoverOffset: 50,
    },
  ],
});

const doughnutChartOptions = {
  responsive: true,
  //柱体  比例
  cutout: 70,
  //大小
  radius: 80,
};

const renderBarChartData = (data: any) => ({
  labels: ["总数", "通过", "错误", "失败", "跳过"],
  datasets: [
    {
      label: "总数",
      data: data,
      backgroundColor: ["#5c60f5", "#00CC88", "#FF3366", "#FF8C00", "#CFD6DF"],
      borderColor:["#5c60f5", "#00CC88", "#FF3366", "#FF8C00", "#CFD6DF"],
      borderWidth: 1,
      //柱体弧度
      borderRadius: 10,
      //柱体宽度
      barThickness: 20,
    },
  ],
});

const renderDoughnutChartData = (data: any) => ({
  labels: ["总数", "通过", "错误", "失败", "跳过"],
  datasets: [
    {
      label: "数量",
      data: data,
      backgroundColor: ["#5c60f5", "#00CC88", "#FF3366", "#FF8C00", "#CFD6DF"],
      borderColor: ["#5c60f5", "#00CC88", "#FF3366", "#FF8C00", "#CFD6DF"],
      cutoutPercentage: 10,
      hoverOffset: 50,
    },
  ],
});

onMounted(() => {
  // 初始化方法
  initReportList();
});
</script>

<template>
  <div class="task-report">
    <n-space justify="space-between">
      <Doughnut
        id="my-chart-id"
        :options="doughnutChartOptions"
        :data="doughnutChartData"
      />
      <Bar id="my-chart-id" :options="barChartOptions" :data="barChartData" />
    </n-space>

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
          :default-page-size="datas.req.size"
          :item-count="datas.total"
          :on-update:page="(page: number) => pageTurning(page)"/>
      </n-space>
    </div>
    <!-- 引用组件 -->
    <n-modal
      v-model:show="datas.reportDialog"
      class="custom-card"
      preset="card"
      title="报告详情"
      size="huge"
      style="width: 1200px"
      :bordered="false"
    >
      <TaskReportDialog :rid="datas.reportId" :type="datas.resultType" />
    </n-modal>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  height: 100%;
}
</style>
