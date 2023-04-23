<script setup lang="ts">
import { FormInst, useMessage } from "naive-ui";
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  effect,
  watch,
} from "vue";
import CaseApi from "~/request/case";

const props = defineProps({
  caseid: Number,
});

const message = useMessage();

const datas = reactive({});

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
  await CaseApi.getCaseResult(props.caseid).then((resp) => {
    if (resp.success === true) {
      result.value = resp.result;
      console.log(result.value);
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
    <textarea style="width: 100%; border-color: gray" rows="34">
      {{ result.system_out }}
    </textarea>
  </div>
</template>
