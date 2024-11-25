<script setup lang="ts">
import { FormInst, useMessage } from "naive-ui";
import { ref, onMounted } from "vue";
import ProjectApi from "~/request/project";
import type { FormRules } from 'naive-ui';

// 类型定义
interface EnvForm {
  id: number;
  name: string;
  test_type: string;
  base_url: string | null;
  browser: string | null;
  remote: string | null;
  env: string | null;
  rerun: number;
  is_clear_cache: boolean;
}

// Props 定义
const props = defineProps({
  envId: {
    type: Number,
    required: true,
    default: 0
  }
});

// Emits 定义
const emit = defineEmits<{
  (e: 'cancel', payload: Record<string, never>): void
}>();

// 状态管理
const message = useMessage();
const formRef = ref<FormInst | null>(null);

/**
 * 测试类型选项
 */
const typeOptions = [
  {
    label: "http",
    value: "http",
  },
  {
    label: "web",
    value: "web",
  },
  {
    label: "app(暂不支持)",
    value: "app",
    disabled: true, // 置灰不可选
  }
];

/**
 * 浏览器选项
 */
const browserOptions = [
  {
    label: "chrome",
    value: "chrome",
  },
  {
    label: "edge",
    value: "edge",
  },
  {
    label: "firefox",
    value: "firefox",
  },
];

/**
 * 表单数据
 */
const formValue = ref<EnvForm>({
  id: 0,
  name: "",
  test_type: "http", // 默认选择 http
  base_url: null,
  browser: 'chrome',
  remote: null,
  env: null,
  rerun: 0,
  is_clear_cache: false,
});

/**
 * 表单验证规则
 */
const rules: FormRules = {
  name: {
    required: true,
    trigger: ["input"],
    message: "请输入环境名称",
  },
  test_type: {
    required: true,
    trigger: ["input", "blur"],
    message: "请选择测试类型",
  },
  browser: {
    required: true,
    trigger: ["input", "blur"],
    message: "请选择浏览器名称",
  },
  clear_cache: {
    required: true,
    type: 'boolean',
    trigger: ['blur', 'change'],
    message: '请选择是否清理缓存',
    validator: (rule: any, value: any) => {
      if (value === null) {
        return new Error('请选择是否清理缓存');
      }
      return true;
    }
  }
};

/**
 * 获取环境详情
 */
const getEnv = async () => {
  try {
    const resp = await ProjectApi.getEnv(props.envId.toString());
    if (resp.success) {
      formValue.value = resp.result;
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('获取环境信息失败');
  }
};

/**
 * 保存环境配置
 */
const saveEnv = async () => {
  try {
    await formRef.value?.validate();
    
    const api = props.envId === 0 
      ? ProjectApi.createEnv(formValue.value)
      : ProjectApi.updateEnv(props.envId.toString(), formValue.value);
      
    const resp = await api;
    if (resp.success) {
      message.success(props.envId === 0 ? "创建成功！" : "更新成功！");
      cancelDialog();
    } else {
      message.error(resp.error.message);
    }
  } catch (error) {
    message.error('操作失败');
  }
};

/**
 * 关闭弹窗
 */
const cancelDialog = () => {
  emit("cancel", {});
};

// 生命周期钩子
onMounted(() => {
  if (props.envId !== 0) {
    getEnv();
  }
});
</script>

<template>
  <div class="env-form">
    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="medium"
      :style="{
        maxWidth: '640px'
      }"
    >
      <!-- 基本配置 -->
      <n-divider title-placement="left">基本配置</n-divider>
      <n-form-item label="名称" path="name">
        <n-input v-model:value="formValue.name" placeholder="环境名称" clearable />
      </n-form-item>
      <n-form-item label="环境" path="env">
        <n-input v-model:value="formValue.env" placeholder="环境变量名（env）" clearable />
      </n-form-item>
      <n-form-item label="重跑" path="rerun">
        <n-input-number v-model:value="formValue.rerun" placeholder="失败重跑次数"/>
      </n-form-item>
      <n-form-item label="清理缓存" path="clear_cache" required>
        <n-radio-group v-model:value="formValue.is_clear_cache">
          <n-space>
            <n-radio :value="true">是</n-radio>
            <n-radio :value="false">否</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>

      <!-- 类型配置 -->
      <n-divider title-placement="left">类型配置</n-divider>
      <n-form-item label="类型" path="test_type">
        <n-radio-group v-model:value="formValue.test_type">
          <n-space>
            <n-radio 
              v-for="option in typeOptions" 
              :key="option.value" 
              :value="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>

      <!-- HTTP 配置 -->
      <n-form-item
        v-if="formValue.test_type === 'http'"
        label="基础URL"
        path="base-url"
      >
        <n-input 
          v-model:value="formValue.base_url" 
          placeholder="基础URL，例如：https://httpbin.org" 
          clearable 
        />
      </n-form-item>

      <!-- Web 配置 -->
      <template v-if="formValue.test_type === 'web'">
        <n-form-item label="Browser" path="browser">
          <n-select
            v-model:value="formValue.browser"
            placeholder="浏览器名称"
            :options="browserOptions"
          />
        </n-form-item>
        <n-form-item label="Remote" path="remote">
          <n-input 
            v-model:value="formValue.remote" 
            placeholder="远程节点，例如：http://192.168.1.13:4444" 
            clearable 
          />
        </n-form-item>
      </template>
      
      <!-- 底部按钮 -->
      <div class="dialog-footer">
        <n-space>
          <n-button @click="cancelDialog">取消</n-button>
          <n-button type="primary" @click="saveEnv">保存</n-button>
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