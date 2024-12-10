<script setup lang="ts">
import { ref, onMounted } from "vue";
import { FormInst, useMessage } from "naive-ui";
import TaskApi from "~/request/task";
import type { PropType } from "vue";

// 类型定义
interface TimedForm {
  task_id: number;
  second: string;
  minute: string;
  hour: string;
  day: string;
  month: string;
  day_of_week: string;
}

interface TimedConf {
  job_id?: string;
  url?: string;
  second?: string;
  minute?: string;
  hour?: string;
  day?: string;
  month?: string;
  day_of_week?: string;
}

// Props 定义
const props = defineProps({
  taskId: {
    type: Number,
    required: true
  },
  timedConf: {
    type: Object as PropType<TimedConf>,
    default: () => ({})
  }
});

// Emits 定义
const emit = defineEmits<{
  (e: 'cancel', payload: Record<string, never>): void;
  (e: 'refresh'): void;
}>();

// 状态管理
const message = useMessage();
const formRef = ref<FormInst | null>(null);

// 表单数据
const formValue = ref<TimedForm>({
  task_id: props.taskId,
  second: props.timedConf?.second || "0",
  minute: props.timedConf?.minute || "*",
  hour: props.timedConf?.hour || "*",
  day: props.timedConf?.day || "*",
  month: props.timedConf?.month || "*",
  day_of_week: props.timedConf?.day_of_week || "*"
});

// 表单验证规则
const rules = {
  second: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入秒",
  },
  minute: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入分",
  },
  hour: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入小时",
  },
  day: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入日期",
  },
  month: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入月份",
  },
  day_of_week: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入星期",
  }
};

/**
 * 保存定时任务
 */
const saveTimed = async () => {
  try {
    await formRef.value?.validate();
    const resp = await TaskApi.createTimed(formValue.value);
    if (resp.success) {
      message.success("创建定时任务成功！");
      emit('refresh');
      cancelDialog();
    } else {
      message.error(resp.error?.message || '创建失败');
    }
  } catch (error) {
    if (error instanceof Error) {
      message.error(error.message);
    } else {
      message.error('操作失败');
    }
  }
};

/**
 * 关闭弹窗
 */
const cancelDialog = () => {
  emit('refresh');
  emit("cancel", {});
};

/**
 * 删除定时任务
 */
const deleteTimed = async () => {
  try {
    const resp = await TaskApi.deleteTimed(props.taskId.toString());
    if (resp.success) {
      message.success("删除定时任务成功！");
      emit('refresh');
      cancelDialog();
    } else {
      message.error(resp.error?.message || '删除失败');
    }
  } catch (error) {
    message.error('删除失败');
  }
};

// 生命周期钩子
onMounted(() => {
  // 不需要获取任务详情，因为我们直接从 props 获取配置
});
</script>

<template>
  <div class="timed-form">
    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
    >
      <n-form-item label="秒" path="second">
        <n-input 
          v-model:value="formValue.second" 
          placeholder="0-59 的整数，默认0" 
        />
      </n-form-item>
      <n-form-item label="分钟" path="minute">
        <n-input 
          v-model:value="formValue.minute" 
          placeholder="0-59 的整数，默认 *" 
        />
      </n-form-item>
      <n-form-item label="小时" path="hour">
        <n-input 
          v-model:value="formValue.hour" 
          placeholder="0-23 的整数，默认 *" 
        />
      </n-form-item>
      <n-form-item label="日期" path="day">
        <n-input 
          v-model:value="formValue.day" 
          placeholder="1-31 的整数，默认 *" 
        />
      </n-form-item>
      <n-form-item label="月份" path="month">
        <n-input 
          v-model:value="formValue.month" 
          placeholder="1-12 的整数，默认 *" 
        />
      </n-form-item>
      <n-form-item label="星期" path="day_of_week">
        <n-input 
          v-model:value="formValue.day_of_week" 
          placeholder="0-6 的整数，默认 *" 
        />
      </n-form-item>

      <div class="dialog-footer">
        <n-space>
          <n-button @click="cancelDialog">取消</n-button>
          <n-button 
            type="error" 
            @click="deleteTimed"
            v-if="timedConf?.minute"
          >
            删除
          </n-button>
          <n-button type="primary" @click="saveTimed">保存</n-button>
        </n-space>
      </div>
    </n-form>
  </div>
</template>

<style scoped>
.dialog-footer {
  margin-top: 24px;
  text-align: right;
}
</style> 