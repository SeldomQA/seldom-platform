<template>
  <div class="case-sync-modal">
    <n-space vertical>
      <n-steps :current="(current as number)" :status="currentStatus">
        <n-step
          title="拉取代码"
          description="All through the day, I me mine I me mine, I me mine"
        />
        <n-step
          title="同步用例"
          description="When I find myself in times of trouble Mother Mary comes to me"
        />
        <n-step
          title="查找结果"
          description="Here come old flat top He come grooving up slowly"
        />
      </n-steps>

      <n-button
        v-if="datas.succCode == 1"
        n-button
        type="primary"
        :loading="loading"
        @click="syncRunning"
      >
        开始
      </n-button>
      <n-button v-else type="warning" :loading="loading" @click="syncRunning">
        重试
      </n-button>

      <n-space justify="space-between">
        <n-list id="caseSyncList">
          <n-list-item>
            <n-thing title="新增用例" description="同步后新增加的用例">
              {{ datas.addCase }}
            </n-thing>
          </n-list-item>
        </n-list>
        <n-list id="caseSyncList">
          <n-list-item>
            <n-thing title="删除用例" description="同步后需要删除的用例">
              {{ datas.delCase }}
            </n-thing>
          </n-list-item>
        </n-list>
      </n-space>
    </n-space>
  </div>
</template>

<script lang="ts">
import ProjectApi from "~/request/project";
import { defineComponent, ref, h, onMounted, reactive } from "vue";
import { StepsProps, useMessage } from "naive-ui";

export default defineComponent({
  setup() {
    const datas = reactive({
      addCase: [],
      delCase: [],
      succCode: 1,
    });

    const message = useMessage();

    const currentRef = ref<number | null>(1);

    const currentStatus = ref<StepsProps["status"]>("process");

    const loading = ref(false);

    onMounted(() => {});

    // 同步用例
    const syncCode = async () => {
      loading.value = true;
      const resp = await ProjectApi.syncCode(
        sessionStorage.projectId.toString()
      );
      if (resp.success === true) {
        currentStatus.value = "finish";
        next();
        currentStatus.value = "process";
      } else {
        message.error(resp.error.message);
        currentStatus.value = "error";
      }
      loading.value = false;
    };

    const syncCase = async () => {
      const resp = await ProjectApi.syncCase(
        sessionStorage.projectId.toString()
      );
      if (resp.success === true) {
        currentStatus.value = "finish";
        next();
        currentStatus.value = "process";
      } else {
        message.error(resp.error.message);
        currentStatus.value = "error";
      }
    };

    const syncResult = async () => {
      const resp = await ProjectApi.syncResult(
        sessionStorage.projectId.toString()
      );
      if (resp.success === true) {
        currentStatus.value = "finish";
        datas.addCase = resp.result.add_case;
        datas.delCase = resp.result.add_case;
      } else {
        message.error(resp.error.message);
        currentStatus.value = "error";
      }
    };

    const syncRunning = async () => {
      if (sessionStorage.projectId === "") {
        message.error("请选择项目");
        return;
      } else {
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
          default:
            break;
        }
      }
    };

    const next = () => {
      if (currentRef.value === null) currentRef.value = 1;
      else if (currentRef.value >= 3) currentRef.value = null;
      else currentRef.value++;
    };
    const prev = () => {
      if (currentRef.value === 0) currentRef.value = null;
      else if (currentRef.value === null) currentRef.value = 3;
      else currentRef.value--;
    };

    return {
      datas,
      loading,
      currentStatus,
      current: currentRef,
      syncRunning,
      next,
      prev,
    };
  },
});
</script>

<style scoped>
#caseSyncList {
  width: 500px;
}
</style>
