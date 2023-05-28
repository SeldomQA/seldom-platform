<script setup lang="ts">
import { reactive, onMounted} from "vue";
import { useMessage } from "naive-ui";
import TaskApi from "~/request/task";

const props = defineProps({
  rid: { type: Number, required: true },
  type: String,
});

const message = useMessage();

const datas = reactive({
  showStatus: true,
  showTitle: "报告详情",
  resultData: [],
  caseDetails: {
    doc: "",
    error_out: "",
    failure_out: "",
    skipped_message: "",
    system_err: "",
    system_out: "",
  },
});

// 初始化任务详情
const initTaskDetails = async () => {
  const data = {};
  console.log(props.rid);
  const resp = await TaskApi.getReportResult(props.rid.toString(), data);
  if (resp.success === true) {
    datas.resultData = resp.result;
  } else {
    message.error(resp.error.message);
  }
};

// 点击用例详情
const caseRowClick = (row: any) => {
  return {
    style: "cursor: pointer;",
    onClick: () => {
      datas.caseDetails = row;
    },
  };
};

onMounted(() => {
  // 初始化方法
  initTaskDetails();
});
</script>

<template>
  <div class="report-modal">
    <n-grid x-gap="16" :cols="4">
      <n-gi span="1">
        <div class="class-list">
        <n-data-table
          class="table"
          :columns="[
            {
              title: '用例列表',
              key: 'name',
            },
          ]"
          :data="datas.resultData"
          :row-props="caseRowClick"
          height="500"
          :bordered="false"
        />
        </div>
      </n-gi>
      <n-gi span="3">
      <span>
        <n-descriptions label-placement="left" title="用例详情" :column="2">
          <n-descriptions-item label="Case name">
            {{ datas.caseDetails.name }}
          </n-descriptions-item>
          <n-descriptions-item label="Run time">
            {{ datas.caseDetails.run_time }}
          </n-descriptions-item>
          <n-descriptions-item label="Test class">
            {{ datas.caseDetails.class_name }}
          </n-descriptions-item>
        </n-descriptions>
        <div v-if="datas.caseDetails.doc !== ''">
          <h4> doc </h4>
          <n-input
            class="log-bg"
            type="textarea"
            :rows="2"
            placeholder="null"
            v-model:value="datas.caseDetails.doc"
          >
          </n-input>
        </div>
        <div v-if="datas.caseDetails.system_err !== ''">
          <h4> system err </h4>
          <n-input
            class="log-bg"
            type="textarea"
            :rows="10"
            placeholder="null"
            v-model:value="datas.caseDetails.system_err"
          >
          </n-input>
        </div>
        <div v-if="datas.caseDetails.system_out !== ''">
          <h4>system out</h4>
          <n-input
            class="log-bg"
            type="textarea"
            :rows="10"
            placeholder="null"
            v-model:value="datas.caseDetails.system_out"
          >
          </n-input>
        </div>
        <div v-if="datas.caseDetails.failure_out !== ''">
          <h4>failure</h4>
          <n-input
            class="log-bg"
            type="textarea"
            :rows="10"
            placeholder="null"
            v-model:value="datas.caseDetails.failure_out"
          >
          </n-input>
        </div>
        <div v-if="datas.caseDetails.error_out !== ''">
          <h4>error</h4>
          <n-input
            class="log-bg"
            type="textarea"
            :rows="10"
            placeholder="null"
            v-model:value="datas.caseDetails.error_out"
          >
          </n-input>
        </div>
        <div v-if="datas.caseDetails.skipped_message !== ''">
          <h4>skipped message</h4>
          <n-input
            class="log-bg"
            type="textarea"
            :rows="2"
            placeholder="null"
            v-model:value="datas.caseDetails.skipped_message"
          >
          </n-input>
        </div>
      </span>
    </n-gi>
    </n-grid>
  </div>
</template>

<style scoped>
.class-list {
  min-height: 600px;
  overflow-y: scroll
}
.log-bg {
  background-color: #FBF9F6;
}
</style>
