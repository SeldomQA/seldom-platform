<script setup lang="ts">
import { reactive, ref, onMounted, effect, watch, h } from "vue";
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
  <div class="report-dialog" width="1200px">
    <div style="min-height: 600px; overflow-y: scroll">
      <span style="float: left; width: 30%">
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
          style="width: 100%"
          height="500"
          :bordered="false"
        />
      </span>
      <span style="float: right; width: 65%; margin-right: 10px">
        <n-descriptions label-placement="left" title="用例详情" :column="2">
          <n-descriptions-item label="Case name">{{
            datas.caseDetails.name
          }}</n-descriptions-item>
          <n-descriptions-item label="Run time">{{
            datas.caseDetails.run_time
          }}</n-descriptions-item>
          <n-descriptions-item label="Test class">{{
            datas.caseDetails.class_name
          }}</n-descriptions-item>
        </n-descriptions>
        <div v-if="datas.caseDetails.doc !== ''">
          <p>doc</p>
          <n-input
            id="doc"
            type="textarea"
            :rows="3"
            placeholder="null"
            v-model:value="datas.caseDetails.doc"
          >
          </n-input>
        </div>
        <div v-if="datas.caseDetails.system_err !== ''">
          <p>system err</p>
          <n-input
            id="system-err"
            type="textarea"
            :rows="10"
            placeholder="null"
            v-model:value="datas.caseDetails.system_err"
          >
          </n-input>
        </div>
        <div v-if="datas.caseDetails.system_out !== ''">
          <p>system out</p>
          <n-input
            id="system-out"
            type="textarea"
            :rows="10"
            placeholder="null"
            v-model:value="datas.caseDetails.system_out"
          >
          </n-input>
        </div>
        <div v-if="datas.caseDetails.failure_out !== ''">
          <p>failure</p>
          <n-input
            id="failure"
            type="textarea"
            :rows="10"
            placeholder="null"
            v-model:value="datas.caseDetails.failure_out"
          >
          </n-input>
        </div>
        <div v-if="datas.caseDetails.error_out !== ''">
          <p>error</p>
          <n-input
            id="error"
            type="textarea"
            :rows="10"
            placeholder="null"
            v-model:value="datas.caseDetails.error_out"
          >
          </n-input>
        </div>
        <div v-if="datas.caseDetails.skipped_message !== ''">
          <p>skipped message</p>
          <n-input
            id="skipped-message"
            type="textarea"
            :rows="2"
            placeholder="null"
            v-model:value="datas.caseDetails.skipped_message"
          >
          </n-input>
        </div>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
