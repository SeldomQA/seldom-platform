<template>
  <div class="project-dialog">
    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      :style="{
        maxWidth: '640px',
      }"
    >
      <n-form-item label="名称" path="name">
        <n-input v-model:value="form.name" placeholder="请输入名称" />
      </n-form-item>
      <n-form-item label="关联项目" path="address">
        <n-input v-model:value="form.address" placeholder="请输入关联项目" />
      </n-form-item>
      <n-form-item>
        <n-alert
          style="width: 100%"
          title="关联项目：使用seldom开发的自动化项目路径"
          type="success"
        ></n-alert>
      </n-form-item>
      <n-form-item label="封面">
        <n-upload
          ref="uploadRef"
          v-model:file-list="fileListRef"
          multiple
          directory-dnd
          :action="baseUrl + '/api/project/upload'"
          :max="1"
          @finish="handleFinish"
        >
          <n-upload-dragger>
            <div style="margin-bottom: 12px">
              <n-icon size="48" :depth="3">
                <ArchiveOutline />
              </n-icon>
            </div>
            <n-text style="font-size: 16px">
              点击或者拖动文件到该区域来上传
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
              请上传.png
              .jpg格式的图片，不要上传敏感数据或无意义的数据，破服务器请求手下留情
            </n-p>
          </n-upload-dragger>
        </n-upload>
      </n-form-item>
      <div class="dialog-footer">
        <n-space>
          <n-button cy-data="cancel-project" @click="cancelProject()"
            >取消</n-button
          >
          <n-button cy-data="save-project" type="primary" @click="onSubmit"
            >保存</n-button
          >
        </n-space>
      </div>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { FormInst, useMessage, UploadFileInfo, UploadInst } from "naive-ui";
import ProjectApi from "~/request/project";
import { ArchiveOutline } from "@vicons/ionicons5";
import baseUrl from "~/config/base-url";

const props = defineProps({
  pid: Number,
});

const emit = defineEmits(["cancel"]);

const message = useMessage();

const formRef = ref<FormInst | null>(null);
const uploadRef = ref<UploadInst | null>(null);

const form = ref({
  name: "",
  address: "",
  is_delete: false,
  id: "",
  cover: { dataName: "", name: "" },
});

const rules = {
  name: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入名称",
  },
  address: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入关联项目",
  },
};

// 上传图片
const fileListRef = ref<UploadFileInfo[]>([]);
const handleFinish = ({
  file,
  event,
}: {
  file: UploadFileInfo;
  event?: ProgressEvent;
}) => {
  const jsonresp = JSON.parse((event?.target as XMLHttpRequest).response);
  console.log(form.value);
  // form.value.cover.dataName = "22";
  // form.value.cover.name = file.name;
  return file;
};

// 获取一条项目信息
const getProject = async () => {
  const resp = await ProjectApi.getProject(props.pid);
  if (resp.success === true) {
    console.log(resp.data);
    form.value = resp.data;
  } else {
    message.error(resp.error.message);
  }
};
// 关闭dialog
const cancelProject = () => {
  emit("cancel", {});
};
// 创建项目按钮
const onSubmit = () => {
  // console.log("pid", props.pid);
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (props.pid === 0) {
        ProjectApi.createProject(form.value).then((resp) => {
          if (resp.success === true) {
            message.success("创建成功！");
            cancelProject();
          } else {
            message.error("创建失败！");
          }
        });
      } else {
        ProjectApi.updateProject(props.pid, form.value).then((resp) => {
          if (resp.success === true) {
            message.success("更新成功！");
            cancelProject();
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

onMounted(() => {
  if (props.pid === 0) {
  } else {
    getProject();
  }
});
</script>

<style scoped>
.dialog-footer {
  float: right;
}
</style>
