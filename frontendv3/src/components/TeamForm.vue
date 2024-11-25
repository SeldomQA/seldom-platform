<script setup lang="ts">
import { ref, onMounted } from "vue";
import { FormInst, useMessage } from "naive-ui";
import TeamApi from "~/request/team";

// 类型定义
interface TeamForm {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse {
  success: boolean;
  result: any;
  error?: {
    message: string;
  };
}

// Props 定义
const props = defineProps({
  teamId: {
    type: Number,
    required: true, // 确保 teamId 必须传入
    default: 0
  },
});

// Emits 定义
const emit = defineEmits<{
  (e: 'cancel', payload: Record<string, never>): void
}>();

// 状态管理
const message = useMessage();
const formRef = ref<FormInst | null>(null);

// 表单数据
const form = ref<TeamForm>({
  id: 0,
  name: "",
  email: "",
});

// 表单验证规则
const rules = {
  name: {
    required: true,
    trigger: ["input"],
    message: "请输入团队名称",
  },
  email: {
    required: true,
    trigger: ["blur", "input"],
    validator: (rule: any, value: string) => {
      if (!value) {
        return new Error("请输入邮箱");
      }
      // 邮箱格式正则表达式
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(value)) {
        return new Error("请输入正确的邮箱格式");
      }
      return true;
    }
  },
};

/**
 * 初始化团队信息
 */
const initTeam = async (teamId: number) => {
  try {
    const resp = await TeamApi.getTeamDetails(teamId.toString());
    if (resp.success) {
      form.value = resp.result;
    } else {
      message.error(resp.error?.message || '获取团队信息失败');
    }
  } catch (error) {
    message.error('获取团队信息失败');
  }
};

/**
 * 保存团队信息
 */
const saveTeam = async () => {
  try {
    // 表单验证
    await formRef.value?.validate();
    
    // 验证通过后执行保存
    const api = props.teamId === 0 
      ? TeamApi.createTeam(form.value)
      : TeamApi.updateTeam(props.teamId.toString(), form.value);
      
    const resp = await api;
    if (resp.success) {
      message.success(props.teamId === 0 ? "创建成功！" : "更新成功！");
      cancelDialog(); // 无论是创建还是更新，都关闭弹窗
    } else {
      message.error(resp.error?.message || '操作失败');
    }
  } catch (error) {
    // 表单验证失败或其他错误
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
  emit("cancel", {});
};

// 生命周期钩子
onMounted(() => {
  if (props.teamId !== 0) {
    initTeam(props.teamId);
  }
});
</script>

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
        <n-input 
          v-model:value="form.name" 
          placeholder="团队名称" 
          clearable
        />
      </n-form-item>
      <n-form-item label="邮箱" path="email">
        <n-input 
          v-model:value="form.email" 
          placeholder="邮箱: name@company.com" 
          clearable
        />
      </n-form-item>
      <div class="dialog-footer">
        <n-space>
          <n-button @click="cancelDialog">取消</n-button>
          <n-button type="primary" @click="saveTeam">保存</n-button>
        </n-space>
      </div>
    </n-form>
  </div>
</template>

<style scoped>
</style>
