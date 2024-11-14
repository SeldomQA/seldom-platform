<script setup lang="ts">
import { h, ref, onMounted, reactive, inject } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import { NIcon, useMessage } from 'naive-ui';
import {
  AppsOutline as ProjectIcon,
  DocumentText as DocuIcon,
  LogOutOutline as LogoutIcon,
  PersonCircle as PersonIcon,
  CloudOutline as CloudIcon,
  PeopleOutline as PeopleIcon,
} from '@vicons/ionicons5';
import UserApi from '~/request/user';

// Define the emit event
const emit = defineEmits<{
  (e: 'changeThemeSignal'): void;
}>();

// Reactive variables
const router = useRouter();
const message = useMessage();
const datas = reactive({
  loading: false,
  projectValue: null,
});
const token = ref<string | null>('');

// Theme management
const mainhtml = document.getElementsByTagName('html');
const btnLabel = ref('深色');
const localStorage = window.localStorage;

// Theme change method
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

// Method to handle menu selection (logout, etc.)
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

// Menu options
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
    icon: () => h(NIcon, null, { default: () => h(ProjectIcon) }),
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
    icon: () => h(NIcon, null, { default: () => h(CloudIcon) }),
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
    icon: () => h(NIcon, null, { default: () => h(PeopleIcon) }),
  },
];

// Options for the dropdown menu (help document and logout)
const personOptions: MenuOption[] = [
  {
    label: '操作手册',
    key: 'help_documentation',
    icon: () => h(NIcon, null, { default: () => h(DocuIcon) }),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h(NIcon, null, { default: () => h(LogoutIcon) }),
  },
];

// Injected function for component reload
const reload = inject<() => void>('reload');

// Handle component mounting and initialization
onMounted(() => {
  const mode = localStorage.getItem('themeMode');
  btnLabel.value = mode === 'light' || mode == null ? '深色' : '浅色';
  token.value = sessionStorage.getItem('token');
});

// Handle menu item updates
const handleUpdateValue = (key: string, item: MenuOption) => {
  console.log('[onUpdate] :key=' + JSON.stringify(key) +' item = '+ JSON.stringify(item));
};

</script>

<template>
  <div class="header">
    <n-space justify="space-between">
      <div>
        <span style="float: left;">
          <img src="../assets/seldom-platform.gif" style="height: 40px" />
        </span>
        <span style="float: right;">
          <n-tag type="success"> 配置中心 </n-tag>
        </span>
      </div>
      <n-menu
        :options="menuOptions"
        @update:value="handleUpdateValue"
        mode="horizontal"/>
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
