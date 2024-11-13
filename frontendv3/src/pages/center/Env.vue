<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useMessage, useDialog} from "naive-ui";
import {
  MenuOutline,
  CloudOutline,
  TrashOutline,
  PencilOutline
} from "@vicons/ionicons5";
import ProjectApi from "~/request/project";
import EnvForm from "@/EnvForm.vue";

const message = useMessage();
const dialog = useDialog();
const form = ref();

const datas = reactive({
  loading: false,
  showDailog: false,
  modalType: 0,
  envData: [],
  envId: 0,
});

// 显示创建窗口
const showCreate = () => {
  datas.modalType = 1;
  datas.envId = 0;
  datas.showDailog = true;
};

// 显示编辑窗口
const showUpdate = (id: number) => {
  datas.modalType = 0;
  datas.envId = id;
  datas.showDailog = true;
};

// 初始化环境列表
const getEnvList = async () => {
  const resp = await ProjectApi.getEnvs();
  if (resp.success === true) {
    datas.envData = resp.result;
  } else {
    message.error(resp.error.message);
  }
};

// 删除环境
const deleteEnv = (id: number) => {
  dialog.warning({
    title: '警告',
    content: '你确定删除环境吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      ProjectApi.deleteEnv(id.toString()).then((resp: any) => {
        if (resp.success === true) {
          message.success("删除成功！");
          getEnvList();
        } else {
          message.error(resp.error.message);
        }
      })
    },
    onNegativeClick: () => {
      console.log('取消删除');
    }
  })
};

// 关闭弹窗回调
const cancelDialog = () => {
  datas.showDailog = false;
  getEnvList();
};

onMounted(() => {
  getEnvList();
});
</script>

<template>
  <div class="body">
    <div class="pageheader">
      <n-space justify="space-between" class="breadcrumb-navigation">
        <span>环境配置</span>
        <n-breadcrumb separator=">">
          <n-breadcrumb-item>配置中心</n-breadcrumb-item>
          <n-breadcrumb-item>环境配置</n-breadcrumb-item>
        </n-breadcrumb>
      </n-space>
    </div>
    <n-card class="main-card">
      <div class="filter-line">
        <n-button type="primary" @click="showCreate"> 创建 </n-button>
      </div>

      <n-space>
        <div v-for="(item, index) in datas.envData" :key="index">
          <n-card
              :title="item['name']"
              class="card-style"
              content-style="padding: 24px; height:50%;"
              hoverable
            >
            <template #header> {{ item['name'] }} </template>
            <template #header-extra>
              <n-button circle size="small">
                <template #icon>
                  <CloudOutline />
                </template>
              </n-button>
            </template>
            <n-descriptions id="thing-desc" label-placement="left" :column="1">
              <n-descriptions-item v-if="item['test_type']" label="类型">
                <n-tag type="success" size="small">
                  {{ item['test_type'] }}
                </n-tag>
              </n-descriptions-item>
              <n-descriptions-item v-if="item['base_url']" label="base_url">
                {{ item['base_url'] }}
              </n-descriptions-item>
              <n-descriptions-item v-if="item['browser']" label="browser">
                {{ item['browser'] }}
              </n-descriptions-item>
              <n-descriptions-item v-if="item['env']" label="env">
                {{ item['env'] }}
              </n-descriptions-item>
            </n-descriptions>
            <template #action>
              <n-space>
                <n-button type="info" size="small" secondary @click="showUpdate(item['id'])">
                  编辑
                </n-button>
                <n-button type="error" size="small" secondary @click="deleteEnv(item['id'])">
                  删除
                </n-button>
              </n-space>
            </template>
          </n-card>
        </div>
      </n-space>
    </n-card>

    <!-- 创建&编辑弹窗 -->
    <n-modal v-model:show="datas.showDailog">
      <n-card
        style="width: 600px"
        :title="datas.modalType ? '新建环境' : '编辑环境'"
        :bordered="false"
        role="dialog"
        aria-modal="true"
      >
        <EnvForm ref="form" :envId="datas.envId" @cancel="cancelDialog" />
      </n-card>
    </n-modal>
  </div>
</template>

<style>
.filter-line {
  padding-bottom: 20px;
}

.card-style {
  width: 300px;
  margin-right: 20px;
}

</style>