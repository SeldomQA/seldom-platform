<template>
  <n-form ref="formRef" :model="model" :style="{ maxWidth: '640px' }">
    <n-form-item
      label="环境名称"
      path="name"
      :rule="{
        required: true,
        message: 'please input name',
        trigger: ['input', 'blur'],
      }"
    >
      <n-input v-model:value="model.name" clearable />
    </n-form-item>
    <n-form-item label="base-url" path="base-url">
      <n-input v-model:value="model.base_url" clearable />
    </n-form-item>
    <n-form-item label="browser" path="browser">
      <n-input v-model:value="model.browser" clearable />
    </n-form-item>
    <n-form-item label="env" path="env">
      <n-input v-model:value="model.env" clearable />
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { FormInst, useMessage } from "naive-ui";
import { defineComponent, defineProps, reactive, ref, onMounted } from "vue";
import ProjectApi from "~/request/project";

type Tform = {
  id: number;
  name: string;
  base_url: string | null;
  browser: string | null;
  env: string | null;
};

const props = defineProps({
  envid: Number,
});

const message = useMessage();

const model = ref<Tform>({
  id: 0,
  name: "",
  base_url: null,
  browser: null,
  env: null,
});

const getEnv = async () => {
  ProjectApi.getEnv(props.envid).then((resp) => {
    if (resp.success === true) {
      model.value = resp.result;
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

defineExpose({
  model,
});
</script>
