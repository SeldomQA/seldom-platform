<script setup lang="ts">
import { ref, reactive, onMounted, inject, h } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import type { MenuOption } from "naive-ui";
import { useMessage } from 'naive-ui';
import { NIcon } from 'naive-ui';
import type { Component } from 'vue';
import {
  SettingsOutline as SettingIcon,
  DocumentText as DocuIcon,
  LogOutOutline as LogoutIcon,
  PersonCircle as PersonIcon,
  AppsOutline as ProjectIcon,
  CloudOutline as CloudIcon,
  PeopleOutline as PeopleIcon,
  FolderOpenOutline as FolderIcon,
  CalendarOutline as CalendarIcon
} from '@vicons/ionicons5';
import UserApi from '~/request/user';
import ProjectApi from '~/request/project';
import projectStorage from '~/store/index';

// Declare the emitted events
const emit = defineEmits<{
  (e: 'changeThemeSignal'): void;
}>();

// Type definitions
type TprojectOptions = {
  value: string;
  label: string;
};

type modelRef = {
  projectOptions: TprojectOptions[];
  // envOptions: [];
};

// Reactive state
const router = useRouter();
const message = useMessage();
const datas = reactive({
  loading: false,
  projectValue: 0,
});
const mainhtml = document.getElementsByTagName('html');
const btnLabel = ref('深色');
const localStorage = window.localStorage;
const model = ref<modelRef>({
  projectOptions: [],
  // envOptions: [],
});
const token = ref<string | null>('');

// Injected function
const reload = inject<() => void>('reload');

// Menu options
const renderIcon = (icon: Component) => () => h(NIcon, null, { default: () => h(icon) });

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink, {
          to: {
            name: 'manager-Case',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => '用例管理' }
      ),
    key: 'go-back-case',
    icon: renderIcon(FolderIcon),
  },
  {
    label: () =>
      h(
        RouterLink, {
          to: {
            name: 'manager-Task',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => '任务管理' }
      ),
    key: 'go-back-task',
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
            RouterLink, {
              to: {
                name: 'center-Project',
                params: {
                  lang: 'zh-CN'
                }
              }
            },
            { default: () => '项目配置' }
          ),
        key: 'go-back-home',
        icon: renderIcon(ProjectIcon),
      },
      {
        label: () =>
          h(
            RouterLink, {
              to: { 
                name: 'center-Env',
                params: {
                  lang: 'zh-CN'
                }
              }
            },
            { default: () => '环境配置' }
          ),
        key: 'go-back-env',
        icon: renderIcon(CloudIcon),
      },
      {
        label: () =>
          h(
            RouterLink, {
              to: { 
                name: 'center-Team',
                params: {
                  lang: 'zh-CN'
                }
              }
            },
            { default: () => '团队配置' }
          ),
        key: 'go-back-team',
        icon: renderIcon(PeopleIcon),
      },
    ],
  },
];

// 个人选项
const  personOptions = [
    {
      label: '操作手册',
      key: 'help_documentation',
      icon: renderIcon(DocuIcon),
    },
    {
      label: '退出登录',
      key: 'logout',
      icon: renderIcon(LogoutIcon),
    },
]

// Methods
const initProjectList = async () => {
  datas.loading = true;
  const resp = await ProjectApi.getProjects();
  if (resp.success) {
    model.value.projectOptions = resp.result.map((project: any) => ({
      value: project.id,
      label: project.name,
    }));
  } else {
    message.error(resp.error.message); 
  }
  datas.loading = false;
};

const changeProject = (value: number, option: any) => {
  // 保存项目缓存
  projectStorage.setProject(value, option.label)

  reload?.();
};

const changeTheme = () => {
  if (btnLabel.value === '深色') {
    btnLabel.value = '浅色';
    localStorage.setItem('themeMode', 'dark');
  } else {
    btnLabel.value = '深色';
    localStorage.setItem('themeMode', 'light');
  }
  emit('changeThemeSignal');
  mainhtml[0].classList.toggle('dark');
};

const handleSelect = (key: string | number) => {
  switch (key) {
    case 'logout':
      UserApi.logout({ token: token.value }).then((resp: any) => {
        if (resp.success) {
          sessionStorage.clear();
          router.push('/login');
        } else {
          message.error(resp.error.message);
        }
      });
      break;
    case 'help_documentation':
      window.open('https://github.com/SeldomQA/seldom-platform', '_blank');
      break;
    default:
      break;
  }
};

// New method: handleUpdateValue
const handleUpdateValue = (key: string, item: MenuOption) => {
  console.log('[onUpdate] :key=' + JSON.stringify(key) +' item = '+ JSON.stringify(item));
};

// Lifecycle hooks
onMounted(() => {
  const mode = localStorage.getItem('themeMode');
  btnLabel.value = mode === 'light' || mode == null ? '深色' : '浅色';
  token.value = sessionStorage.getItem('token');

  initProjectList();

   const projectData = projectStorage.getProject()
  if (projectData) {
    datas.projectValue = projectData?.id ?? 0
  }
});

// Expose to template
defineExpose({
  menuOptions,
  datas,
  btnLabel,
  changeTheme,
  model,
  changeProject,
  handleSelect,
  handleUpdateValue,
  token,
  PersonIcon,
  personOptions
});
</script>

<template>
  <div class="header">
    <n-space justify="space-between">
      <div>
        <span style="float: left;">
          <img src="../assets/seldom-platform.gif" style="height: 40px" />
        </span>
        <span style="float: right;">
          <n-tag type="warning"> 项目管理 </n-tag>
        </span>
      </div>
      <n-form inline :model="model" label-placement="left">
        <n-form-item label="">
          <n-select
            style="width: 200px"
            :options="model.projectOptions"
            placeholder="选择项目"
            @update:value="changeProject"
            v-model:value="datas.projectValue"
          >
          </n-select>
        </n-form-item>
      </n-form>
      <n-menu :options="menuOptions"  @update:value="handleUpdateValue" mode="horizontal"/>
      <n-space>
        <n-button @click="changeTheme">
          <template #default>
            {{ btnLabel }}
          </template>
        </n-button>
        <n-dropdown :options="personOptions" @select="handleSelect">
          <n-button>
            <template #icon>
              <n-icon :component="PersonIcon"></n-icon>
            </template>
          </n-button>
        </n-dropdown>
      </n-space>
    </n-space>
  </div>
</template>

<style scoped>
</style>
