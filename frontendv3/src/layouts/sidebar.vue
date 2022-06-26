<template>
  <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
</template>

<script lang="ts">
import { defineComponent, h, Component } from "vue";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
import {
  HomeOutline,
  FolderOpenOutline,
  DocumentTextOutline,
} from "@vicons/ionicons5";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "index",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "首页" }
      ),
    key: "go-back-home",
    icon: renderIcon(HomeOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "Case",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "用例管理" }
      ),
    key: "go-back-case",
    icon: renderIcon(FolderOpenOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "Report",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "报告管理" }
      ),
    key: "go-back-report",
    icon: renderIcon(DocumentTextOutline),
  },
];

export default defineComponent({
  setup() {
    return {
      menuOptions,
      handleUpdateValue(key: string, item: MenuOption) {
        console.log("[onUpdate:value]: " + JSON.stringify(key));
        console.log("[onUpdate:value]: " + JSON.stringify(item));
      },
    };
  },
});
</script>
