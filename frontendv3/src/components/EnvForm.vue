<script setup lang="ts">
import { FormInst, useMessage } from "naive-ui";
import { ref, onMounted } from "vue";
import ProjectApi from "~/request/project";

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
  env: string | null;
};

const form = ref<envForm>({
  id: 0,
  name: "",
  test_type: "http",
  base_url: null,
  browser: null,
  env: null,
});

const rules = {
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
};


const message = useMessage();

const getEnv = async () => {
  const envId = props.envId + ''
  ProjectApi.getEnv(envId).then((resp: any) => {
    if (resp.success === true) {
      form.value = resp.result;
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
        ProjectApi.createEnv(form.value).then((resp: any) => {
          if (resp.success === true) {
            message.success("创建成功！");
            cancelDialog();
          } else {
            message.error(resp.error.message);
          }
        });
      } else {
        const envId = props.envId + ''
        ProjectApi.updateEnv(envId, form.value).then((resp: any) => {
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
</script>

<template>
  <div class="env-form">
    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item label="名称" path="name">
        <n-input v-model:value="form.name" placeholder="环境名称" clearable />
      </n-form-item>
      <n-form-item label="类型" path="test_type">
        <n-select
          v-model:value="form.test_type"
          placeholder="测试类型"
          :options="typeOptions"
        />
      </n-form-item>
      <n-form-item label="env" path="env">
        <n-input v-model:value="form.env" placeholder="环境变量名" clearable />
      </n-form-item>
      <n-form-item
        v-if="form.test_type === 'http'"
        label="base_url"
        path="base-url"
      >
        <n-input v-model:value="form.base_url" placeholder="基础URL" clearable />
      </n-form-item>
      <n-form-item
        v-if="form.test_type === 'web'"
        label="browser"
        path="browser">
        <n-select
          v-model:value="form.browser"
          placeholder="浏览器名称"
          :options="browserOptions"
        />
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