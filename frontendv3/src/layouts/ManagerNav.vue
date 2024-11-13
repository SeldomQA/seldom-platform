<script lang="ts">
import { h, defineComponent, ref, onMounted, reactive, inject } from "vue";
import type { Component } from "vue";
import { useStore } from 'vuex';
import { NIcon, useMessage, SelectOption } from "naive-ui";
import {
  DocumentText as DocuIcon,
  LogOutOutline as LogoutIcon,
  PersonCircle as PersonIcon,
} from "@vicons/ionicons5";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
import type { MenuOption } from "naive-ui";
import {
  HomeOutline,
  FolderOpenOutline,
  CalendarOutline,
} from "@vicons/ionicons5";
import UserApi from "~/request/user";
import ProjectApi from "~/request/project";


const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "center-Project",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "配置中心" }
      ),
    key: "go-back-center",
    icon: renderIcon(HomeOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "manager-Case",
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
            name: "manager-Task",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "任务管理" }
      ),
    key: "go-back-task",
    icon: renderIcon(CalendarOutline),
  },
];

type TprojectOptions = {
  value: string;
  label: string;
};
type modelRef = {
  projectOptions: TprojectOptions[];
  envOptions: [];
};

export default defineComponent({
  emits: ["changeThemeSignal"],
  setup(props, ctx) {
    const router = useRouter();
    const message = useMessage();
    const datas = reactive({
      loading: false,
      projectValue: null,
    });
    const mainhtml = document.getElementsByTagName("html");
    const btnLabel = ref("深色");
    const localStorage = window.localStorage;

    const model = ref<modelRef>({
      projectOptions: [],
      envOptions: [],
    });

    // 获取项目列表
    const initProjectList = async () => {
      datas.loading = true;
      const resp = await ProjectApi.getProjects();
      if (resp.success === true) {
        // datas.tableData = resp.result
        for (let i = 0; i < resp.result.length; i++) {
          model.value.projectOptions.push({
            value: resp.result[i].id,
            label: resp.result[i].name,
          });
        }
      } else {
        message.error(resp.error.message);
      }
      datas.loading = false;
    };

    // 刷新组件
    const reload = inject("reload");

    const changeProject = (value: string, option: SelectOption) => {
      sessionStorage.projectId = value;
      sessionStorage.projectName = option.label;
      reload;
    };

    const changeTheme = () => {
      if (btnLabel.value == "深色") {
        btnLabel.value = "浅色";
        localStorage.setItem("themeMode", "dark");
      } else {
        btnLabel.value = "深色";
        localStorage.setItem("themeMode", "light");
      }
      ctx.emit("changeThemeSignal");
      mainhtml[0].classList.toggle("dark");
    };

    const handleSelect = (key: string | number) => {
      switch (key) {
        case "logout":
          UserApi.logout({ token: token.value }).then((resp: any) => {
            if (resp.success === true) {
              sessionStorage.clear();
              router.push("/login");
            } else {
              message.error(resp.error.message);
            }
          });
          break;
        case "help_documentation":
          window.open("https://github.com/SeldomQA/seldom-platform", "_blank");
          break;
        default:
          break;
      }
    };
    const token = ref<string | null>("");

    onMounted(() => {
      //深浅主题
      const mode = localStorage.getItem("themeMode");
      if (mode == "light" || mode == null) {
        btnLabel.value = "深色";
      } else {
        btnLabel.value = "浅色";
      }
      token.value = sessionStorage.getItem("token");

      // 初始化选择项目列表
      initProjectList();
      // 设置当前项目
      const store = useStore();
      const currentProject = store.state.currentProject;
      datas.projectValue = currentProject.name;
    });

    return {
      menuOptions,
      handleUpdateValue(key: string, item: MenuOption) {
        console.log("[onUpdate:value]: " + JSON.stringify(key));
        console.log("[onUpdate:value]: " + JSON.stringify(item));
      },
      datas,
      btnLabel,
      changeTheme,
      options: [
        {
          label: "操作手册",
          key: "help_documentation",
          icon: renderIcon(DocuIcon),
        },
        {
          label: "退出登录",
          key: "logout",
          icon: renderIcon(LogoutIcon),
        },
      ],
      token,
      handleSelect,
      PersonIcon,
      model,
      changeProject,
      reload,
      
    };
  },
});
</script>

<template>
  <div class="header">
    <n-space justify="space-between">
      <img src="../assets/seldom-platform.gif" style="height: 40px" />
      <n-menu
        :options="menuOptions"
        @update:value="handleUpdateValue"
        mode="horizontal"/>
      <n-form inline :model="model" label-placement="left">
        <n-form-item label="项目">
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
      <n-space>
        <n-button @click="changeTheme">
          <template #default>
            {{ btnLabel }}
          </template>
        </n-button>
        <n-dropdown :options="options" @select="handleSelect">
          <n-button>
            <template #icon>
              <n-icon :component="PersonIcon">
            </n-icon>
            </template>
          </n-button>
          </n-dropdown>
        </n-space>
    </n-space>
  </div>
</template>

<style scoped>
</style>
