<template>
  <div class="project-dialog">
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      :style="{
        maxWidth: '640px',
      }"
    >
      <n-form-item label="名称" path="name">
        <n-input v-model:value="model.name" placeholder="请输入团队名称" />
      </n-form-item>
      <n-form-item label="邮箱" path="email">
        <n-input v-model:value="model.email" placeholder="请输入团队邮箱" />
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { FormInst, useMessage } from "naive-ui";
import TeamApi from "~/request/team";

const props = defineProps({
  teamId: Number,
});

const message = useMessage();

const formRef = ref<FormInst | null>(null);

type Tform = {
  id: number;
  name: string;
  email: string;
};

const model = ref<Tform>({
  id: 0,
  name: "",
  email: "",
});

const rules = {
  name: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入团队名称",
  },
  email: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入团队邮箱",
  },
};

const getTeam = async (teamId: number) => {
  TeamApi.getTeamDetails(teamId.toString()).then((resp) => {
    if (resp.success === true) {
      model.value = resp.result;
    } else {
      message.error(resp.error.message);
    }
  });
};

onMounted(() => {
  if (props.teamId === 0) {
  } else {
    getTeam(props.teamId);
  }
});

defineExpose({
  model,
});
</script>

<style scoped>
.dialog-footer {
  float: right;
}
</style>
