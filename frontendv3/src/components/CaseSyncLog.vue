<script setup lang="ts">
import { useMessage } from "naive-ui";
import { ref, onMounted } from "vue";
import CaseApi from "~/request/case";

const props = defineProps({
  caseid: { type: Number, required: true },
});

const message = useMessage();

type TResult = {
  log: string;
  
};

const result = ref<TResult>({
  log: "",
});

// 获取同步（错误）日志
const getSyncLog = async () => {
  await CaseApi.getSyncLog().then((resp: any) => {
    if (resp.success === true) {
      result.value = resp.result;
    } else {
      message.error(resp.error.message);
    }
  });
};

onMounted(() => {
  getSyncLog();
});
</script>

<template>
  <div class="case-sync-log">
    <textarea class="log-style" rows="40">
      {{ result.log }}
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