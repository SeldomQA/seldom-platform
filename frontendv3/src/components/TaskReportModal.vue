<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";
import { useMessage } from "naive-ui";
import { InformationCircleOutline } from '@vicons/ionicons5';
import TaskApi from "~/request/task";

// 类型定义
interface CaseDetails {
  doc: string;
  error_out: string;
  failure_out: string;
  skipped_message: string;
  system_err: string;
  system_out: string;
  name: string;
  run_time: string;
  class_name: string;
}

interface TaskReportData {
  showStatus: boolean;
  showTitle: string;
  resultData: any[];
  caseDetails: CaseDetails | null;
}

// Props 定义
const props = defineProps({
  rid: { type: Number, required: true },
  type: String,
});

const message = useMessage();

// 状态管理
const datas = reactive<TaskReportData>({
  showStatus: true,
  showTitle: "报告详情",
  resultData: [],
  caseDetails: null,
});

// 计算属性：是否显示详情
const showDetails = computed(() => datas.caseDetails !== null);

/**
 * 初始化任务详情
 */
const initTaskDetails = async () => {
  try {
    const resp = await TaskApi.getReportResult(props.rid.toString(), {});
    if (resp.success) {
      datas.resultData = resp.result;
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('获取任务详情失败');
  }
};

/**
 * 处理用例行点击
 */
const caseRowClick = (row: CaseDetails) => {
  return {
    style: "cursor: pointer;",
    onClick: () => {
      datas.caseDetails = row;
    },
  };
};

// 生命周期钩子
onMounted(() => {
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
        <!-- 未选择用例时显示提示信息 -->
        <div v-if="!showDetails" class="empty-state">
          <n-icon size="48" class="info-icon">
            <InformationCircleOutline />
          </n-icon>
          <p class="empty-text">请点击左侧的用例查看详情</p>
        </div>
        
        <!-- 选择用例后显示详情 -->
        <template v-else-if="datas.caseDetails">
          <n-descriptions label-placement="left" title="用例详情" :column="2">
            <n-descriptions-item label="Case name">
              {{ datas.caseDetails?.name }}
            </n-descriptions-item>
            <n-descriptions-item label="Run time">
              {{ datas.caseDetails?.run_time }}
            </n-descriptions-item>
            <n-descriptions-item label="Test class">
              {{ datas.caseDetails?.class_name }}
            </n-descriptions-item>
          </n-descriptions>
          
          <template v-if="datas.caseDetails">
            <div v-if="datas.caseDetails?.doc">
              <h4>doc</h4>
              <n-input
                class="log-bg"
                type="textarea"
                :rows="2"
                placeholder="null"
                :value="datas.caseDetails?.doc"
                readonly
              />
            </div>
            
            <div v-if="datas.caseDetails?.system_err">
              <h4>system err</h4>
              <n-input
                class="log-bg"
                type="textarea"
                :rows="10"
                placeholder="null"
                :value="datas.caseDetails?.system_err"
                readonly
              />
            </div>
            
            <div v-if="datas.caseDetails?.system_out">
              <h4>system out</h4>
              <n-input
                class="log-bg"
                type="textarea"
                :rows="10"
                placeholder="null"
                :value="datas.caseDetails?.system_out"
                readonly
              />
            </div>
            
            <div v-if="datas.caseDetails?.failure_out">
              <h4>failure</h4>
              <n-input
                class="log-bg"
                type="textarea"
                :rows="10"
                placeholder="null"
                :value="datas.caseDetails?.failure_out"
                readonly
              />
            </div>
            
            <div v-if="datas.caseDetails?.error_out">
              <h4>error</h4>
              <n-input
                class="log-bg"
                type="textarea"
                :rows="10"
                placeholder="null"
                :value="datas.caseDetails?.error_out"
                readonly
              />
            </div>
            
            <div v-if="datas.caseDetails?.skipped_message">
              <h4>skipped message</h4>
              <n-input
                class="log-bg"
                type="textarea"
                :rows="2"
                placeholder="null"
                :value="datas.caseDetails?.skipped_message"
                readonly
              />
            </div>
          </template>
        </template>
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped>
.class-list {
  min-height: 600px;
  overflow-y: scroll;
}

.log-bg {
  background-color: #FBF9F6;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  color: #909399;
}

.info-icon {
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
  margin: 0;
}
</style>
