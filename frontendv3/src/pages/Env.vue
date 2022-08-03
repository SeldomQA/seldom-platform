<script setup lang="ts">
import ProjectApi from "~/request/project";
import CaseApi from "~/request/case";
import { reactive, onMounted, h, defineComponent, ref } from "vue";
import { NIcon, useMessage, TreeOption, SelectOption } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import baseUrl from "~/config/base-url";
import { CashOutline as CashIcon } from "@vicons/ionicons5";
import envForm from "@/envForm.vue";

const message = useMessage();

const envDatas = [
  {
    header: "测试环境",
    desc: "这是用于测试环境",
    descItems: {
      "base-url": "http://10.10.33.51:3000/env",
      username: "test",
      passwd: "123456",
    },
  },
  {
    header: "正式环境",
    desc: "这是用于正式环境",
    descItems: {
      "base-url": "http://10.10.33.51:3000/env",
      username: "admin",
      passwd: "123456",
    },
  },
];

const form = ref();

const datas = reactive({
  loading: false,
  showDailog: false,
  modalType: 0,
});

// 显示创建窗口
const showCreate = () => {
  console.log(123);
  datas.showDailog = true;
};

const onNegativeClick = () => {
  message.success("Cancel");
  datas.showDailog = false;
};
const onPositiveClick = () => {
  message.success("Submit");
  datas.showDailog = false;
  message.success(JSON.stringify(form.value.model));
};
</script>

<template>
  <div class="body">
    <div class="pageheader">
      <n-space justify="space-between">
        <span>环境配置</span>
        <n-breadcrumb separator=">">
          <n-breadcrumb-item href="/">首页</n-breadcrumb-item>
          <n-breadcrumb-item>环境配置</n-breadcrumb-item>
        </n-breadcrumb>
      </n-space>
    </div>
    <n-card class="main-card">
      <div class="filter-line">
        <n-button type="primary" @click="showCreate"> 创建 </n-button>
      </div>

      <n-space>
        <n-thing v-for="(item, index) in envDatas" class="envthing" style="">
          <template #avatar>
            <n-avatar>
              <n-icon>
                <cash-icon />
              </n-icon>
            </n-avatar>
          </template>
          <template #header> {{ item.header }} </template>
          <template #header-extra>
            <n-button circle size="small">
              <template #icon>
                <cash-icon />
              </template>
            </n-button>
          </template>
          <template #description> {{ item.desc }} </template>
          <n-descriptions label-placement="left">
            <n-descriptions-item
              v-for="(val, key, index) in item.descItems"
              :label="key"
            >
              {{ val }}
            </n-descriptions-item>
          </n-descriptions>
          <template #footer> Action </template>
          <template #action>
            <n-space>
              <n-button size="small">
                <template #icon>
                  <n-icon>
                    <cash-icon />
                  </n-icon>
                </template>
                1 块钱
              </n-button>
              <n-button size="small">
                <template #icon>
                  <n-icon>
                    <cash-icon />
                  </n-icon>
                </template>
                10 块钱
              </n-button>
              <n-button size="small">
                <template #icon>
                  <n-icon>
                    <cash-icon />
                  </n-icon>
                </template>
                100 块钱
              </n-button>
            </n-space>
          </template>
        </n-thing>
      </n-space>
    </n-card>

    <n-modal
      v-model:show="datas.showDailog"
      style="min-width: 600px"
      preset="dialog"
      positive-text="确认"
      negative-text="算了"
      @positive-click="onPositiveClick"
      @negative-click="onNegativeClick"
      :title="datas.modalType ? '新建环境' : '创建项目'"
    >
      <envForm ref="form" />
    </n-modal>
  </div>
</template>

<style>
.filter-line {
  padding-bottom: 20px;
}
.envthing {
  width: 400px;
  padding: 18px;
  border: solid;
  border-color: rgb(239, 239, 245);
}
</style>
