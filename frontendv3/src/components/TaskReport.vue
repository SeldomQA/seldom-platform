<!--
/**
* @author yongchin
* @date 2022-04-27
* @desc 任务管理/报告列表
*/
-->
<template>
  <div class="task-report">
    <!-- <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="tests"
        label="总数"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.tests === 0">
            {{scope.row.tests}}
          </span>
          <span v-else>
            <el-button @click="showReport(scope.row)" type="text" size="small">
              <el-tag>{{scope.row.tests}}</el-tag>
            </el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="passed"
        label="通过"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.passed === 0">
            {{scope.row.passed}}
          </span>
          <span v-else>
            <el-button @click="showReport(scope.row, 'success')" type="text" size="small">
              <el-tag type="success">{{scope.row.passed}}</el-tag>
            </el-button>
          </span>
      </template>
      </el-table-column>
      <el-table-column
        prop="error"
        label="错误"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.error === 0">
            {{scope.row.error}}
          </span>
          <span v-else>
            <el-button @click="showReport(scope.row, 'error')" type="text" size="small">
              <el-tag type="danger">{{scope.row.error}}</el-tag>
            </el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="failure"
        label="失败"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.failure === 0">
            {{scope.row.failure}}
          </span>
          <span v-else>
            <el-button @click="showReport(scope.row, 'failure')" type="text" size="small">
              <el-tag type="warning">{{scope.row.failure}}</el-tag>
            </el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="skipped"
        label="跳过"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.skipped === 0">
            {{scope.row.skipped}}
          </span>
          <span v-else>
            <el-button @click="showReport(scope.row, 'skipped')" type="text" size="small">
              <el-tag type="info">{{scope.row.skipped}}</el-tag>
            </el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="run_time"
        label="运行">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
    </el-table> -->

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
    <!-- <div class="foot-page">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div> -->
    <!-- 引用组件 -->
    <!-- <TaskReportDialog
      v-if="reportDialog"
      :rid="reportId"
      :type="resultType"
      @cancel="cancelDialog"
    ></TaskReportDialog> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, effect, watch, h } from "vue";
import { useMessage, NButton } from "naive-ui";
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import TaskApi from "~/request/task";
// import TaskReportDialog from "./TaskReportDialog.vue";

const props = defineProps({
  tid: Number,
});

const datas = reactive({
  loading: true,
  reportDialog: false,
  reportId: false,
  resultType: "",
  tableData: [],
  total: 0,
  req: {
    page: 1,
    size: 10,
    task_id: 0,
  },
});

const form = ref({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  user: "",
});

const message = useMessage();

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
// 显示报告详情
const showReport = async (row, type) => {
  datas.reportDialog = true;
  datas.reportId = row.id;
  datas.resultType = type;
};
// 创建任务子组件的回调
const cancelDialog = () => {
  datas.reportDialog = false;
};
// 跳转到第几页
const handleCurrentChange = (val) => {
  datas.req.page = val;
  initReportList();
};

type Song = {
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

const rowKey = (row: Song) => row.id;

const checkedRowKeysRef = ref<[number]>([0]);

const rowProps = (row: Song) => {
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

const clickReportName = (row: Song) => {
  console.log(row);
};

const createColumnsReport = ({
  clickReportName,
}: {
  clickReportName: (row: Song) => void;
}): DataTableColumns<Song> => {
  return [
    {
      type: "selection",
      multiple: false,
    },
    {
      title: "名称",
      key: "name",
      render(row) {
        return h(
          NButton,
          {
            size: "small",
            bordered: false,
            onClick: () => clickReportName(row),
          },
          { default: () => row.name }
        );
      },
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
            onClick: () => clickReportName(row),
          },
          { default: () => "查看" }
        );
      },
    },
  ];
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
  ChartData,
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
      label: "432",
      data: [40, 50, 60, 30, 10],
      backgroundColor: [
        "rgba(54, 162, 235, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(255, 99, 132, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(153, 102, 255, 0.8)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(153, 102, 255, 1)",
      ],
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
      data: [65, 59, 80, 81, 56],
      backgroundColor: [
        "rgba(54, 162, 235, 0.9)",
        "rgba(75, 192, 192, 0.9)",
        "rgba(255, 99, 132, 0.9)",
        "rgba(255, 206, 86, 0.9)",
        "rgba(153, 102, 255, 0.9)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(153, 102, 255, 1)",
      ],
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
      label: "432",
      data: data,
      backgroundColor: [
        "rgba(54, 162, 235, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(255, 99, 132, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(153, 102, 255, 0.8)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(153, 102, 255, 1)",
      ],
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
      backgroundColor: [
        "rgba(54, 162, 235, 0.9)",
        "rgba(75, 192, 192, 0.9)",
        "rgba(255, 99, 132, 0.9)",
        "rgba(255, 206, 86, 0.9)",
        "rgba(153, 102, 255, 0.9)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(153, 102, 255, 1)",
      ],
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

<style>
.el-popover.home-popover {
  width: 70px;
  min-width: auto;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 定义当前组件使用的CSS */
.foot-page {
  margin-top: 20px;
  text-align: right;
}
.table {
  height: 100%;
}
</style>
