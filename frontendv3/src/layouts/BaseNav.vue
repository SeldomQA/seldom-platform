<script setup lang="ts">
import { ref, onMounted, h } from 'vue';
import { useRouter } from 'vue-router';
import type { MenuOption } from "naive-ui";
import { useMessage, NIcon } from 'naive-ui';
import {
  LogoGithub as GitHubIcon,
  LogOutOutline as LogoutIcon,
  PersonCircle as PersonIcon,
} from '@vicons/ionicons5';
import UserApi from '~/request/user';

const emit = defineEmits<{
  (e: 'changeThemeSignal'): void;
}>();

const props = defineProps<{
  menuOptions: MenuOption[],
  tag: {
    type: string,
    text: string
  }
}>();

const router = useRouter();
const message = useMessage();
const mainhtml = document.getElementsByTagName('html');
const btnLabel = ref('深色');
const localStorage = window.localStorage;
const token = ref<string | null>('');

const personOptions = [
  {
    label: 'GitHub',
    key: 'help_documentation',
    icon: () => h(NIcon, null, { default: () => h(GitHubIcon) }),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h(NIcon, null, { default: () => h(LogoutIcon) }),
  },
];

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

const handleUpdateValue = (key: string, item: MenuOption) => {
  console.log('[onUpdate] :key=' + JSON.stringify(key) +' item = '+ JSON.stringify(item));
};

onMounted(() => {
  const mode = localStorage.getItem('themeMode');
  btnLabel.value = mode === 'light' || mode == null ? '深色' : '浅色';
  token.value = sessionStorage.getItem('token');
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
          <n-menu :options="menuOptions" @update:value="handleUpdateValue" mode="horizontal"/>
        </span>
        <span style="float: right; height: 50px;">
          <n-divider vertical style="height: 30px;"/>
        </span>
        <span style="float: right;">
          <n-tag round size="small" :type="tag.type">{{ tag.text }}</n-tag>
        </span>
      </div>
      <slot name="project-select"></slot>
      
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