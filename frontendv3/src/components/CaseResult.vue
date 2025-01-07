<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useMessage } from "naive-ui";
import CaseApi from "~/request/case";

// 类型定义
type TResult = {
  name: string;
  create_time: string;
  run_time: string;
  system_out: string;
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
  name: "",
  create_time: "",
  run_time: "",
  system_out: "暂无运行日志" // 默认显示文本
});

/**
 * 获取用例执行结果
 * 包含报告名称、创建时间、运行时长和运行日志
 */
const getResult = async () => {
  try {
    const resp = await CaseApi.getCaseResult(props.caseid.toString());
    if (resp.success && resp.result) {
      result.value = resp.result;
    }
  } catch (error) {
    message.error('获取执行结果失败');
    console.error(error);
  }
};

// 生命周期钩子
onMounted(() => {
  getResult();
});
</script>

<template>
  <div class="case-result">
    <!-- 结果描述部分 -->
    <n-descriptions 
      label-placement="left"
      class="result-info"
    >
      <n-descriptions-item label="报告名称">
        {{ result.name }}
      </n-descriptions-item>
      <n-descriptions-item label="创建时间">
        {{ result.create_time }}
      </n-descriptions-item>
      <n-descriptions-item label="运行时长">
        {{ result.run_time }}
      </n-descriptions-item>
    </n-descriptions>

    <!-- 日志部分 -->
    <n-divider title-placement="left">运行日志</n-divider>
    <n-input
      v-model:value="result.system_out"
      type="textarea"
      rows="34"
      status="warning"
    >
    </n-input>
  </div>
</template>

<style scoped>
.case-result {
  width: 100%;
}

.result-info {
  margin-bottom: 16px;
}

</style>