<script setup lang="ts">
import { FormInst, useMessage } from "naive-ui";
import { ref, onMounted } from "vue";
import ProjectApi from "~/request/project";
import type { FormRules } from 'naive-ui';


const props = defineProps({
  envId: Number,
});

const typeOptions = [
  {
    label: "http",
    value: "http",
  },
  {
    label: "web",
    value: "web",
  },
  // app 暂时不支持
  // {
  //   label: "app",
  //   value: "app",
  // },
];

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
const formRef = ref<FormInst | null>(null);

type envForm = {
  id: number;
  name: string;
  test_type: string;
  base_url: string | null;
  browser: string | null;
  remote: string | null;
  env: string | null;
  rerun: number;
  is_clear_cache: boolean;
};

const formValue = ref<envForm>({
  id: 0,
  name: "",
  test_type: "http",
  base_url: null,
  browser: null,
  remote: null,
  env: null,
  rerun: 0,
  is_clear_cache: false,
});

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


const message = useMessage();

const getEnv = async () => {
  const envId = props.envId + ''
  ProjectApi.getEnv(envId).then((resp: any) => {
    if (resp.success === true) {
      formValue.value = resp.result;
    } else {
      message.error(resp.error.message);
    }
  });
};

onMounted(() => {
  if (props.envId === 0) {
  } else {
    getEnv();
  }
});

// 保存环境
const saveEnv = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (props.envId === 0) {
        ProjectApi.createEnv(formValue.value).then((resp: any) => {
          if (resp.success === true) {
            message.success("创建成功！");
            cancelDialog();
          } else {
            message.error(resp.error.message);
          }
        });
      } else {
        const envId = props.envId + ''
        ProjectApi.updateEnv(envId, formValue.value).then((resp: any) => {
          if (resp.success === true) {
            message.success("更新成功！");
            cancelDialog();
          } else {
            message.error(resp.error.message);
          }
        });
      }
    } else {
      return false;
    }
  });
};

// 关闭dialog
const emit = defineEmits(["cancel"]);
const cancelDialog = () => {
  emit("cancel", {});
};

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('验证成功');
    } else {
      console.log(errors);
      message.error('验证失败');
    }
  });
};
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
     <n-divider title-placement="left">
        基本配置
      </n-divider>
      <n-form-item label="名称" path="name">
        <n-input v-model:value="formValue.name" placeholder="环境名称" clearable />
      </n-form-item>
      <n-form-item label="环境" path="env">
        <n-input v-model:value="formValue.env" placeholder="环境变量名（env）" clearable />
      </n-form-item>
      <n-form-item label="重跑" path="rerun">
        <n-input-number v-model:value="formValue.rerun" clearable />
      </n-form-item>
      <n-form-item label="清理缓存" path="clear_cache" required>
        <n-radio-group v-model:value="formValue.is_clear_cache">
          <n-space>
            <n-radio :value="true">是</n-radio>
            <n-radio :value="false">否</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-divider title-placement="left">
        测试类型配置
      </n-divider>
      <n-form-item label="类型" path="test_type">
        <n-select
          v-model:value="formValue.test_type"
          placeholder="测试类型"
          :options="typeOptions"
        />
      </n-form-item>
      <n-form-item
        v-if="formValue.test_type === 'http'"
        label="基础URL"
        path="base-url"
      >
        <n-input v-model:value="formValue.base_url" placeholder="基础URL，例如：https://httpbin.org" clearable />
      </n-form-item>
      <n-form-item
        v-if="formValue.test_type === 'web'"
        label="Browser"
        path="browser">
        <n-select
          v-model:value="formValue.browser"
          placeholder="浏览器名称"
          :options="browserOptions"
        />
      </n-form-item>
      <n-form-item
        v-if="formValue.test_type === 'web'"
        label="Remote"
        path="remote">
        <n-input v-model:value="formValue.remote" placeholder="远程节点，例如：http://192.168.1.13:4444" clearable />
      </n-form-item>
      
      <div class="dialog-footer">
        <n-space>
          <n-button @click="cancelDialog()">取消</n-button>
          <n-button type="primary" @click="saveEnv()">保存</n-button>
        </n-space>
      </div>
    </n-form>
  </div>
</template>

<style scoped>
</style>