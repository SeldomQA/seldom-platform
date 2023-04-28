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

    <n-grid cols="8" item-responsive responsive="screen">
      <n-grid-item span="0 m:3 l:3">
        <n-data-table
          :columns="columnsReport"
          :data="datas.tableData"
          :pagination="pagination"
          :bordered="false"
        />
      </n-grid-item>
      <n-grid-item span="0 m:3 l:3">
        <Bar id="my-chart-id" :options="barChartOptions" :data="barChartData" />
      </n-grid-item>
      <n-grid-item span="0 m:2 l:2">
        <Doughnut
          id="my-chart-id"
          :options="doughnutChartOptions"
          :data="doughnutChartData"
        />
      </n-grid-item>
    </n-grid>
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
import { reactive, ref, onMounted, effect, watch,h } from "vue";
import { useMessage, NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
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

// created() {
//   datas.req.task_id = props.tid;
// }

// 初始化任务列表
const initReportList = async () => {
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

type Song2 = {
  id: number;
  name: string;
  env: string;
  team: string;
  execute_count: number;
  status: number;
  create_time: string;
};

const clickReportName = (row: Song2) => {
  console.log(row);
};

const createColumnsReport = ({
  clickReportName,
}: {
  clickReportName: (row: Song2) => void;
}): DataTableColumns<Song2> => {
  return [
    {
      title: "Name",
      key: "name",
      render(row) {
        return h(
          NButton,
          {
            size: "small",
            onClick: () => clickReportName(row),
          },
          { default: () => row.name }
        );
      },
    },
  ];
};

const columnsReport = createColumnsReport({ clickReportName });

const pagination = false as const

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
</style>
