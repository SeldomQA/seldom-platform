<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { StepsProps, useMessage } from "naive-ui";
import ProjectApi from "~/request/project";
import projectStorage from '~/store/index';

// 类型定义
interface CaseItem {
  class_name: string;
  case_name: string;
}

interface SyncData {
  addCase: CaseItem[];
  delCase: CaseItem[];
  req: Record<string, any>;
  succCode: number;
  stepButton: string;
}

// 状态管理
const datas = reactive<SyncData>({
  addCase: [],
  delCase: [],
  req: {},
  succCode: 1,
  stepButton: ""
});

const message = useMessage();
const currentRef = ref<number | null>(1);
const currentStatus = ref<StepsProps["status"]>("process");
const loading = ref(false);
const projectId = ref<string>("");

// 事件定义
const emit = defineEmits<{
  (e: 'cancel', payload: Record<string, never>): void
}>();

/**
 * 1. 拉取代码
 */
const syncCode = async () => {
  loading.value = true;
  try {
    const resp = await ProjectApi.syncCode(projectId.value);
    if (resp.success) {
      currentStatus.value = "finish";
      next();
      currentStatus.value = "process";
      datas.stepButton = "同步";
    } else {
      message.error(resp.error.message);
      currentStatus.value = "error";
      datas.succCode = 0;
    }
  } catch (error) {
    message.error('拉取代码失败');
    currentStatus.value = "error";
    datas.succCode = 0;
  } finally {
    loading.value = false;
  }
};

/**
 * 2. 同步用例
 */
const syncCase = async () => {
  try {
    const resp = await ProjectApi.syncCase(projectId.value);
    if (resp.success) {
      currentStatus.value = "finish";
      next();
      currentStatus.value = "process";
      datas.stepButton = "结果";
    } else {
      message.error(resp.error.message);
      currentStatus.value = "error";
      datas.succCode = 0;
    }
  } catch (error) {
    message.error('同步用例失败');
    currentStatus.value = "error";
    datas.succCode = 0;
  } finally {
    loading.value = false;
  }
};

/**
 * 3. 同步结果
 */
const syncResult = async () => {
  try {
    const resp = await ProjectApi.syncResult(projectId.value);
    if (resp.success) {
      datas.addCase = resp.result.add_case;
      datas.delCase = resp.result.del_case;
      datas.req = resp.result;
      currentStatus.value = "finish";
      next();
      currentStatus.value = "process";
      datas.stepButton = "合并";
    } else {
      message.error(resp.error.message);
      currentStatus.value = "error";
      datas.succCode = 0;
    }
  } catch (error) {
    message.error('获取同步结果失败');
    currentStatus.value = "error";
    datas.succCode = 0;
  } finally {
    loading.value = false;
  }
};

/**
 * 4. 合并用例
 */
const mergeCase = async () => {
  try {
    const resp = await ProjectApi.syncMerge(projectId.value, datas.req);
    if (resp.success) {
      message.success("合并成功！");
      cancelDialog();
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('合并用例失败');
  }
};

/**
 * 执行同步操作
 */
const syncRunning = async () => {
  switch (currentRef.value) {
    case 1:
      await syncCode();
      break;
    case 2:
      await syncCase();
      break;
    case 3:
      await syncResult();
      break;
    case 4:
      await mergeCase();
      break;
  }
};

/**
 * 下一步
 */
const next = () => {
  if (currentRef.value === null) currentRef.value = 1;
  else if (currentRef.value >= 4) currentRef.value = null;
  else currentRef.value++;
};

/**
 * 关闭弹窗
 */
const cancelDialog = () => {
  emit("cancel", {});
};

// 生命周期钩子
onMounted(() => {
  datas.stepButton = "拉取";
  const projectData = projectStorage.getProject();
  if (projectData) {
    projectId.value = String(projectData.id);
  }
});
</script>

<template>
  <div class="case-sync-modal">
    <n-space vertical style="margin-top: 30px">
      <!-- 步骤条 -->
      <n-steps :current="(currentRef as number)" :status="currentStatus">
        <n-step title="拉取代码" />
        <n-step title="同步用例" />
        <n-step title="查找结果" />
        <n-step title="合并结果" />
      </n-steps>

      <!-- 用例列表 -->
      <div class="case-lists">
        <n-space>
          <!-- 新增用例列表 -->
          <n-card title="新增用例" size="small" class="add-case-list">
            <n-list class="case-list">
              <n-list-item v-for="item in datas.addCase" :key="`${item.class_name}.${item.case_name}`">
                {{ item.class_name }}.{{ item.case_name }}
              </n-list-item>
            </n-list>
          </n-card>

          <!-- 删除用例列表 -->
          <n-card title="删除用例" size="small" class="del-case-list">
            <n-list class="case-list">
              <n-list-item v-for="item in datas.delCase" :key="`${item.class_name}.${item.case_name}`">
                {{ item.class_name }}.{{ item.case_name }}
              </n-list-item>
            </n-list>
          </n-card>
        </n-space>
      </div>

      <!-- 底部按钮 -->
      <div class="dialog-footer">
        <n-space>
          <n-button @click="cancelDialog">取消</n-button>
          <n-button
            type="primary"
            :loading="loading"
            @click="syncRunning"
          >
            {{ datas.stepButton }}
          </n-button>
        </n-space>
      </div>
    </n-space>
  </div>
</template>

<style scoped>
.case-sync-modal {
  width: 100%;
}

.case-lists {
  margin-top: 20px;
}

.add-case-list,
.del-case-list {
  width: 365px;
  height: 400px;
  overflow-y: auto;
}

.case-list {
  width: 100%;
}

.dialog-footer {
  margin-top: 16px;
  text-align: right;
}
</style>
