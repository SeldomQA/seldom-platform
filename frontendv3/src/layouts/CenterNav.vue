<script setup lang="ts">
import { h } from 'vue';
import { RouterLink } from 'vue-router';
import { NIcon } from 'naive-ui';
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
    key: 'go-back-home',
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
    key: 'go-back-env',
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
    key: 'go-back-team',
    icon: renderIcon(PeopleIcon),
  },
];
</script>

<template>
  <BaseNav 
    :menu-options="menuOptions"
    :tag="{ type: 'success', text: '配置中心' }" />
</template>
