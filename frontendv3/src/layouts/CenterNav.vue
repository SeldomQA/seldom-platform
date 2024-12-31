<script setup lang="ts">
import { h, ref, onMounted, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { NIcon, NMenu } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import {
  AppsOutline as ProjectIcon,
  CloudOutline as CloudIcon,
  PeopleOutline as PeopleIcon,
} from '@vicons/ionicons5';
import BaseNav from './BaseNav.vue';

const renderIcon = (icon: any) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'center-Project',
            params: { lang: 'zh-CN' },
          },
        },
        { default: () => '项目配置' }
      ),
    key: 'center-Project',
    icon: renderIcon(ProjectIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'center-Env',
            params: { lang: 'zh-CN' },
          },
        },
        { default: () => '环境配置' }
      ),
    key: 'center-Env',
    icon: renderIcon(CloudIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'center-Team',
            params: { lang: 'zh-CN' },
          },
        },
        { default: () => '团队配置' }
      ),
    key: 'center-Team',
    icon: renderIcon(PeopleIcon),
  },
];

const selectedKey = ref<string | null>(null);
const route = useRoute();

watch(route, (newRoute) => {
  selectedKey.value = newRoute.name as string;
});

onMounted(() => {
  selectedKey.value = route.name as string;
});
</script>

<template>
  <BaseNav 
    :menu-options="menuOptions"
    :tag="{ type: 'success', text: '配置中心' }"
    :selectedKey="selectedKey" 
  />
</template>
