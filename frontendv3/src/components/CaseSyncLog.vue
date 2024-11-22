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
    <textarea 
      class="log-style" 
      rows="40"
      readonly
    >{{ result.log }}</textarea>
  </div>
</template>

<style scoped>
.case-sync-log {
  width: 100%;
}

.log-style {
  width: 100%;
  border-color: gray;
  background-color: rgb(251, 249, 246);
  padding: 12px;
  font-family: monospace;
  resize: none;
}
</style>