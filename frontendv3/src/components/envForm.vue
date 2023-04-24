<template>
  <n-form
    ref="formRef"
    :model="form"
    label-placement="left"
    label-width="auto"
    :rules="rules"
  >
    <n-form-item label="环境名称" path="name">
      <n-input v-model:value="form.name" placeholder="环境名称" clearable />
    </n-form-item>
    <n-form-item label="base_url" path="base-url">
      <n-input v-model:value="form.base_url" placeholder="基础URL" clearable />
    </n-form-item>
    <n-form-item label="browser" path="browser">
      <n-input
        v-model:value="form.browser"
        placeholder="浏览器名称"
        clearable
      />
    </n-form-item>
    <n-form-item label="env" path="env">
      <n-input v-model:value="form.env" placeholder="环境变量名" clearable />
    </n-form-item>
    <div class="dialog-footer">
      <n-space>
        <n-button @click="cancelDialog()">取消</n-button>
        <n-button type="primary" @click="saveTeam()">保存</n-button>
      </n-space>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { FormInst, useMessage } from "naive-ui";
import { defineComponent, reactive, ref, onMounted } from "vue";
import ProjectApi from "~/request/project";

const props = defineProps({
  envid: Number,
});

const formRef = ref<FormInst | null>(null);

type teamForm = {
  id: number;
  name: string;
  base_url: string | null;
  browser: string | null;
  env: string | null;
};

const rules = {
  name: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入环境名称",
  },
};

const emit = defineEmits(["cancel"]);

const message = useMessage();

const form = ref<teamForm>({
  id: 0,
  name: "",
  base_url: null,
  browser: null,
  env: null,
});

const getEnv = async () => {
  ProjectApi.getEnv(props.envid).then((resp) => {
    if (resp.success === true) {
      form.value = resp.result;
    } else {
      message.error(resp.error.message);
    }
  });
};

onMounted(() => {
  if (props.envid === 0) {
  } else {
    getEnv();
  }
});

// 保存按钮
const saveTeam = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (props.envid === 0) {
        ProjectApi.createEnv(form.value).then((resp) => {
          if (resp.success === true) {
            message.success("创建成功！");
            cancelDialog();
          } else {
            message.error("创建失败！");
          }
        });
      } else {
        ProjectApi.updateEnv(props.envid, form.value).then((resp) => {
          if (resp.success === true) {
            message.success("更新成功！");
            cancelDialog();
          } else {
            message.error("更新失败！");
          }
        });
      }
    } else {
      return false;
    }
  });
};

// 关闭dialog
const cancelDialog = () => {
  emit("cancel", {});
};
</script>

<style scoped>
</style>