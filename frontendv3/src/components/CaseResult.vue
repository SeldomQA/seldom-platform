<script setup lang="ts">
import { useMessage } from "naive-ui";
import { ref, onMounted } from "vue";
import CaseApi from "~/request/case";

const props = defineProps({
  caseid: { type: Number, required: true },
});

const message = useMessage();

type TResult = {
  name: string;
  create_time: string;
  run_time: string;
  system_out: string;
};

const result = ref<TResult>({
  name: "",
  create_time: "",
  run_time: "",
  system_out: "",
});

const getResult = async () => {
  await CaseApi.getCaseResult(props.caseid.toString()).then((resp: any) => {
    if (resp.success === true) {
      result.value = resp.result;
    } else {
      message.error(resp.error.message);
    }
  });
};

onMounted(() => {
  getResult();
});
</script>

<template>
  <div>
    <n-descriptions label-placement="left">
      <n-descriptions-item label="报告名称"
        >{{ result.name }}
      </n-descriptions-item>
      <n-descriptions-item label="创建时间">
        {{ result.create_time }}
      </n-descriptions-item>
      <n-descriptions-item label="运行时长">
        {{ result.run_time }}
      </n-descriptions-item>
    </n-descriptions>
    <n-divider title-placement="left">运行日志</n-divider>
    <textarea class="log-style" rows="34">
      {{ result.system_out }}
    </textarea>
  </div>
</template>

<style scoped>
.log-style {
  width: 100%;
  border-color: gray;
  background-color:rgb(251, 249, 246);
}
</style>