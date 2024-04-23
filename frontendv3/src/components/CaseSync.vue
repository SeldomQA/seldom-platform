<script setup lang="ts">
import ProjectApi from "~/request/project";
import { ref, onMounted, reactive } from "vue";
import { StepsProps, useMessage } from "naive-ui";

const datas = reactive({
  addCase: [],
  delCase: [],
  req: {},
  succCode: 1,
  stepButton: ""
});

const message = useMessage();

const currentRef = ref<number | null>(1);

const currentStatus = ref<StepsProps["status"]>("process");

const loading = ref(false);


// 1.拉取代码
const syncCode = async () => {
  loading.value = true;
  const resp = await ProjectApi.syncCode(sessionStorage.projectId.toString());
  if (resp.success === true) {
    currentStatus.value = "finish";
    next();
    currentStatus.value = "process";
    datas.stepButton = "同步"
  } else {
    message.error(resp.error.message);
    currentStatus.value = "error";
    datas.succCode = 0;
  }
  loading.value = false;
};

// 2. 同步用例
const syncCase = async () => {
  const resp = await ProjectApi.syncCase(sessionStorage.projectId.toString());
  if (resp.success === true) {
    currentStatus.value = "finish";
    next();
    currentStatus.value = "process";
    datas.stepButton = "结果"
  } else {
    message.error(resp.error.message);
    currentStatus.value = "error";
    datas.succCode = 0;
  }
  loading.value = false;
};

// 3. 同步结果
const syncResult = async () => {
  const resp = await ProjectApi.syncResult(sessionStorage.projectId.toString());
  if (resp.success === true) {
    datas.addCase = resp.result.add_case;
    datas.delCase = resp.result.del_case;
    datas.req = resp.result;
    currentStatus.value = "finish";
    next();
    currentStatus.value = "process";
    datas.stepButton = "合并"
  } else {
    message.error(resp.error.message);
    currentStatus.value = "error";
    datas.succCode = 0;
  }
  loading.value = false;
};

// 4.合并用例
const mergeCase = async () => {
  const resp = await ProjectApi.syncMerge(
    sessionStorage.projectId,
    datas.req
  );
  if (resp.success === true) {
    message.success("合并成功！");
    cancelDialog()
  } else {
    message.error(resp.error.message);
  }
};

const syncRunning = async () => {

  switch (currentRef.value) {
    case 1:
      syncCode();
      break;
    case 2:
      syncCase();
      break;
    case 3:
      syncResult();
      break;
    case 4:
      mergeCase();
      break;
    default:
      break;
  }

};

const next = () => {
  if (currentRef.value === null) currentRef.value = 1;
  else if (currentRef.value >= 4) currentRef.value = null;
  else currentRef.value++;
};



// 关闭dialog
const emit = defineEmits(["cancel"]);
const cancelDialog = () => {
  emit("cancel", {});
};

onMounted(() => {
  datas.stepButton = "拉取"
});

</script>

<template>
  <div class="case-sync-modal">
    <n-space vertical style="margin-top: 30px">
      <n-steps :current="(currentRef as number)" :status="currentStatus">
        <n-step title="拉取代码" description="" />
        <n-step title="同步用例" description="" />
        <n-step title="查找结果" description="" />
        <n-step title="合并结果" description="" />
      </n-steps>

      <div style="margin-top: 20px;">
        <n-space>
          <n-card title="新增用例" size="small" class="add-case-list">
            <n-list class="case-list">
              <div v-for="i in datas.addCase">
              <n-list-item>
                {{ i.class_name }}.{{ i.case_name }}
              </n-list-item>
              </div>
            </n-list>
          </n-card>
          <n-card  title="删除用例" size="small" class="del-case-list">
            <n-list class="case-list">
              <div v-for="i in datas.delCase">
                <n-list-item>
                {{ i.class_name }}.{{ i.case_name }}
                </n-list-item>
                </div>
            </n-list>
          </n-card>
        </n-space>
      </div>
      <div class="dialog-footer">
        <n-space>
          <n-button @click="cancelDialog()">取消</n-button>
          <n-button
            type="primary"
            :loading="loading"
            @click="syncRunning"
            >
            {{ datas.stepButton }}
          </n-button>
        </n-space>
      </div>
    </n-space>
  </div>
</template>

<style scoped>

.sync-button {
  text-align: left;
  margin-right: 10px;
}
.add-case-list {
  width: 365px;
  height: 400px;
  float: left;
  overflow-y: auto;
}
.del-case-list {
  width: 365px;
  height: 400px;
  float: right;
  overflow-y: auto;
}
.case-list {
   width: 100%;
}
</style>
