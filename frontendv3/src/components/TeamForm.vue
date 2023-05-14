<template>
  <div class="team-form">
    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item label="名称" path="name">
        <n-input v-model:value="form.name" placeholder="团队名称" clearable/>
      </n-form-item>
      <n-form-item label="邮箱" path="email">
        <n-input v-model:value="form.email" placeholder="团队邮箱" clearable/>
      </n-form-item>
      <div class="dialog-footer">
        <n-space>
          <n-button @click="cancelDialog()">取消</n-button>
          <n-button type="primary" @click="saveTeam()">保存</n-button>
        </n-space>
      </div>
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

type teamForm = {
  id: number;
  name: string;
  email: string;
};

const form = ref<teamForm>({
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

const initTeam = async (teamId: number) => {
  TeamApi.getTeamDetails(teamId.toString()).then((resp: any) => {
    if (resp.success === true) {
      form.value = resp.result;
    } else {
      message.error(resp.error.message);
    }
  });
};

onMounted(() => {
  if (props.teamId === 0) {
  } else {
    initTeam(props.teamId);
  }
});

// 保存团队
const saveTeam = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (props.teamId === 0) {
        TeamApi.createTeam(form.value).then((resp: any) => {
          if (resp.success === true) {
            message.success("创建成功！");
          } else {
            message.error("创建失败！");
          }
        });
      } else {
        TeamApi.updateTeam(props.teamId, form.value).then((resp: any) => {
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

// 关闭弹窗
const emit = defineEmits(["cancel"]);
const cancelDialog = () => {
  emit("cancel", {});
};
</script>

<style scoped>
</style>
