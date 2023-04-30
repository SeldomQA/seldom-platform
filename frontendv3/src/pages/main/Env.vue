<script setup lang="ts">
import ProjectApi from "~/request/project";
import CaseApi from "~/request/case";
import { reactive, onMounted, h, defineComponent, ref } from "vue";
import { NIcon, useMessage, TreeOption, SelectOption } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import baseUrl from "~/config/base-url";
import {
  MenuOutline,
  CloudOutline,
  TrashOutline,
  PencilOutline,
} from "@vicons/ionicons5";
import envForm from "@/envForm.vue";

const message = useMessage();

const form = ref();

const datas = reactive({
  loading: false,
  showDailog: false,
  modalType: 0,
  envDatas: [],
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

const getEnvList = async () => {
  const resp = await ProjectApi.getEnvs();
  if (resp.success === true) {
    datas.envDatas = resp.result;
  } else {
    message.error(resp.error.message);
  }
};

const deleteEnv = async (id: number) => {
  const resp = await ProjectApi.deleteEnv(id);
  if (resp.success === true) {
    message.success("删除成功！");
    getEnvList();
  } else {
    message.error("删除失败");
  }
};

// 关闭表单
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
        <span>环境管理</span>
        <n-breadcrumb separator=">">
          <n-breadcrumb-item>首页</n-breadcrumb-item>
          <n-breadcrumb-item>配置管理</n-breadcrumb-item>
          <n-breadcrumb-item>环境管理</n-breadcrumb-item>
        </n-breadcrumb>
      </n-space>
    </div>
    <n-card class="main-card">
      <div class="filter-line">
        <n-button type="primary" @click="showCreate"> 创建 </n-button>
      </div>

      <n-space>
        <n-thing
          v-for="(item, index) in datas.envDatas"
          :key="index"
          class="envthing"
        >
          <template #avatar>
            <n-avatar>
              <n-icon>
                <CloudOutline />
              </n-icon>
            </n-avatar>
          </template>
          <template #header> {{ item.name }} </template>
          <template #header-extra>
            <n-button circle size="small">
              <template #icon>
                <MenuOutline />
              </template>
            </n-button>
          </template>
          <template #description> {{ item.desc }} </template>
          <n-descriptions id="thing-desc" label-placement="left" :column="1">
            <n-descriptions-item v-if="item.test_type" label="类型">
              <n-tag type="success" size="small">
                {{ item.test_type }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item v-if="item.base_url" label="base_url">
              {{ item.base_url }}
            </n-descriptions-item>
            <n-descriptions-item v-if="item.browser" label="browser">
              {{ item.browser }}
            </n-descriptions-item>
            <n-descriptions-item v-if="item.env" label="env">
              {{ item.env }}
            </n-descriptions-item>
          </n-descriptions>
          <!-- <template #footer>  </template> -->
          <template #action>
            <n-space>
              <n-button size="small" @click="showUpdate(item.id)">
                <template #icon>
                  <n-icon>
                    <PencilOutline />
                  </n-icon>
                </template>
                编辑
              </n-button>
              <n-button size="small" @click="deleteEnv(item.id)">
                <template #icon>
                  <n-icon>
                    <TrashOutline />
                  </n-icon>
                </template>
                删除
              </n-button>
            </n-space>
          </template>
        </n-thing>
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
        <envForm ref="form" :envid="datas.envId" @cancel="cancelDialog" />
      </n-card>
    </n-modal>
  </div>
</template>

<style>
.filter-line {
  padding-bottom: 20px;
}

.envthing {
  max-width: 400px;
  min-width: 300px;
  padding: 18px;
  border: solid;
  border-color: rgb(239, 239, 245);
}

#thing-desc .n-descriptions-table-content {
  padding: 4px;
}
</style>