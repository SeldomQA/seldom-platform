<script setup lang="ts">
import { ref, reactive, onMounted, inject, h, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { NIcon, NMenu } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import {
  SettingsOutline as SettingIcon,
  AppsOutline as ProjectIcon,
  CloudOutline as CloudIcon,
  PeopleOutline as PeopleIcon,
  FolderOpenOutline as FolderIcon,
  CalendarOutline as CalendarIcon
} from '@vicons/ionicons5';
import BaseNav from './BaseNav.vue';
import ProjectApi from '~/request/project';
import projectStorage from '~/store/index';

type TprojectOptions = {
  value: string;
  label: string;
};

type modelRef = {
  projectOptions: TprojectOptions[];
};

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
            name: 'manager-Case',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => '用例管理' }
      ),
    key: 'manager-Case',
    icon: renderIcon(FolderIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'manager-Task',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => '任务管理' }
      ),
    key: 'manager-Task',
    icon: renderIcon(CalendarIcon),
  },
  {
    label: '配置中心',
    key: 'system-setting',
    icon: renderIcon(SettingIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'center-Project',
                params: {
                  lang: 'zh-CN'
                }
              }
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
                params: {
                  lang: 'zh-CN'
                }
              }
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
                params: {
                  lang: 'zh-CN'
                }
              }
            },
            { default: () => '团队配置' }
          ),
        key: 'center-Team',
        icon: renderIcon(PeopleIcon),
      },
    ],
  },
];

const datas = reactive({
  loading: false,
  projectValue: 0,
});

const model = ref<modelRef>({
  projectOptions: [],
});

const selectedKey = ref<string | null>(null);
const route = useRoute();

watch(route, (newRoute: any) => {
  selectedKey.value = newRoute.name as string;
});

const reload = inject<() => void>('reload');

const initProjectList = async () => {
  datas.loading = true;
  const resp = await ProjectApi.getProjects();
  if (resp.success) {
    model.value.projectOptions = resp.result.map((project: any) => ({
      value: project.id,
      label: project.name,
    }));
  }
  datas.loading = false;
};

const changeProject = (value: number, option: any) => {
  projectStorage.setProject(value, option.label);
  reload?.();
};

onMounted(() => {
  initProjectList();
  const projectData = projectStorage.getProject();
  if (projectData) {
    datas.projectValue = projectData?.id ?? 0;
  }
  selectedKey.value = route.name as string;
});
</script>

<template>
  <BaseNav 
    :menu-options="menuOptions"
    :tag="{ type: 'warning', text: '项目管理' }"
    :selectedKey="selectedKey"
  >
    <template #project-select>
      <n-form inline :model="model" label-placement="left">
        <n-form-item label="">
          <n-select
            style="width: 200px"
            :options="model.projectOptions"
            placeholder="选择项目"
            @update:value="changeProject"
            v-model:value="datas.projectValue"
          />
        </n-form-item>
      </n-form>
    </template>
  </BaseNav>
</template>

<style scoped>
</style>
