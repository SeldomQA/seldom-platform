<script lang="ts">
import ProjectApi from "~/request/project";
import CaseApi from "~/request/case";
import { reactive, onMounted, h, defineComponent, ref } from "vue";
import {
  NButton,
  NIcon,
  useMessage,
  TreeOption,
  SelectOption,
  FormInst,
  NSpace,
} from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import baseUrl from "~/config/base-url";
import { FolderOpenOutline, LogoPython } from "@vicons/ionicons5";
import TaskApi from "~/request/task";

type Song = {
  no: number;
  title: string;
  length: string;
};

const createColumns = ({
  play,
}: {
  play: (row: Song) => void;
}): DataTableColumns<Song> => {
  return [
    {
      title: "ID",
      key: "no",
    },
    {
      title: "团队名称",
      key: "title",
    },
    {
      title: "团队邮箱",
      key: "length",
    },
    {
      title: "更新时间",
      key: "length",
    },
    {
      title: "Action",
      key: "actions",
      render(row) {
        return h(
          NSpace,
          {},
          {
            default: () => [
              h(
                NButton,
                {
                  type: "info",
                  secondary: true,
                  onClick: () => play(row, "edit"),
                },
                { default: () => "编辑" }
              ),
              h(
                NButton,
                {
                  type: "error",
                  secondary: true,
                  onClick: () => play(row, "delete"),
                },
                { default: () => "删除" }
              ),
            ],
          }
        );
      },
    },
  ];
};

const data: Song[] = [
  { no: 3, title: "Wonderwall", length: "4:18" },
  { no: 4, title: "Don't Look Back in Anger", length: "4:48" },
  { no: 12, title: "Champagne Supernova", length: "7:27" },
];

export default defineComponent({
  setup() {
    const message = useMessage();
    return {
      data,
      columns: createColumns({
        play(row: Song) {
          message.info(`Play ${row.title}`);
        },
      }),
      pagination: false as const,
    };
  },
});
</script>

<template>
  <div class="body">
    <div class="pageheader">
      <n-space justify="space-between">
        <span>环境管理</span>
        <n-breadcrumb separator=">">
          <n-breadcrumb-item href="/">首页</n-breadcrumb-item>
          <n-breadcrumb-item>配置管理</n-breadcrumb-item>
          <n-breadcrumb-item>环境管理</n-breadcrumb-item>
        </n-breadcrumb>
      </n-space>
    </div>

    <n-card class="main-card">
      <div class="filter-line">
        <n-button type="primary" @click="showCreate"> 创建 </n-button>
      </div>

      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :bordered="false"
      />
    </n-card>
  </div>
</template>
