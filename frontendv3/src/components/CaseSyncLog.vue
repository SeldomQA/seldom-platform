<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useMessage } from "naive-ui";
import CaseApi from "~/request/case";

// 类型定义
type TResult = {
  log: string;
};

// 组件属性定义
const props = defineProps({
  caseid: { 
    type: Number, 
    required: true 
  },
});

// 状态管理
const message = useMessage();
const result = ref<TResult>({
  log: "无同步错误日志" // 默认显示文本
});

/**
 * 获取同步错误日志
 * 如果有日志内容则显示，否则保持默认文本
 */
const getSyncLog = async () => {
  try {
    const resp = await CaseApi.getSyncLog();
    if (resp.success && resp.result.length > 0) {
      result.value = resp.result;
    }
  } catch (error) {
    message.error('获取同步日志失败');
    console.error(error);
  }
};

// 生命周期钩子
onMounted(() => {
  getSyncLog();
});
</script>

<template>
  <div class="case-sync-log">
    <n-input
      v-model:value="result.log"
      type="textarea"
      rows="40"
      status="warning"
    ></n-input>
  </div>
</template>

<style scoped>
.case-sync-log {
  width: 100%;
}
</style>