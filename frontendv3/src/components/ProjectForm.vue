<script setup lang="ts">
import { ref, onMounted } from "vue";
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
  case_dir: "",
  is_delete: false,
  id: "",
  cover_name: "",
  path_name: "",
});

const rules = {
  name: {
    required: true,
    trigger: ["input"],
    message: "请输入项目名称",
  },
  address: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入git地址",
  },
  case_dir: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入用例目录",
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
  console.log(fileListRef.value);
  // console.log(jsonresp);
  if (jsonresp.success) {
    form.value.cover_name = file.name;
    form.value.path_name = jsonresp.result.name;
    message.success("上传成功");
  } else {
    fileListRef.value[0].id = "";
    fileListRef.value[0].status = "error";
    message.error(jsonresp.error.message);
  }
  return file;
};

// 获取一条项目信息
const getProject = async () => {
  const pId = props.pid + ''
  const resp = await ProjectApi.getProject(pId);
  if (resp.success === true) {
    form.value = resp.result;
    if (form.value.path_name != "") {
      fileListRef.value.push({
        id: form.value.path_name,
        name: form.value.cover_name,
        status: "finished",
      });
    }
  } else {
    message.error(resp.error.message);
  }
};

// 关闭dialog
const cancelProject = () => {
  emit("cancel", {});
};

// 新增&编辑保存按钮
const onSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (props.pid === 0) {
        ProjectApi.createProject(form.value).then((resp: any) => {
          if (resp.success === true) {
            message.success("创建成功！");
            cancelProject();
          } else {
            message.error(resp.error.message);
          }
        });
      } else {
        const pId = props.pid + ''
        ProjectApi.updateProject(pId, form.value).then((resp: any) => {
          if (resp.success === true) {
            message.success("更新成功！");
            cancelProject();
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

onMounted(() => {
  if (props.pid === 0) {
    // 创建
  } else {
    // 编辑
    getProject();
  }
});
</script>

<template>
  <div class="project-form">
    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item label="名称" path="name">
        <n-input v-if="props.pid === 0" v-model:value="form.name" placeholder="项目名称"/>
        <n-input v-else v-model:value="form.name" placeholder="项目名称" disabled />
      </n-form-item>
      <n-form-item label="Git地址" path="address">
        <n-input v-model:value="form.address" placeholder="项目的github/gitee/gitlab...地址" />
      </n-form-item>
      <n-form-item label="用例目录" path="case_dir">
        <n-input v-model:value="form.case_dir" placeholder="用例目录" />
      </n-form-item>
      <n-form-item label="项目Logo">
        <n-upload
          ref="uploadRef"
          v-model:file-list="fileListRef"
          multiple
          directory-dnd
          :action="baseUrl + '/api/project/upload'"
          :max="1"
          @finish="handleFinish"
          :show-retry-button="false"
        >
          <n-upload-dragger>
            <div style="margin-bottom: 12px">
              <n-icon size="48" :depth="3">
                <ArchiveOutline />
              </n-icon>
            </div>
            <n-text style="font-size: 16px">
              点击或者拖动文件到该区域
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
              请上传PNG、JPG格式的图片, 只支持上传1个图片。
            </n-p>
          </n-upload-dragger>
        </n-upload>
      </n-form-item>
      <div class="dialog-footer">
        <n-space>
          <n-button cy-data="cancel-project" @click="cancelProject()"
            >取消</n-button
          >
          <n-button cy-data="save-project" type="primary" @click="onSubmit()"
            >保存</n-button
          >
        </n-space>
      </div>
    </n-form>
  </div>
</template>

<style scoped>
.dialog-footer {
  float: right;
}
</style>
