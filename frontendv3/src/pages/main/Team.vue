<script lang="ts">
import TeamApi from "~/request/Team";
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
import teamForm from "@/teamForm.vue";

type Song = {
  id: number;
  name: string;
  email: string;
  update_time: string;
};

const createColumns = ({
  play,
}: {
  play: (row: Song, action: string) => void;
}): DataTableColumns<Song> => {
  return [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "团队名称",
      key: "name",
    },
    {
      title: "团队邮箱",
      key: "email",
    },
    {
      title: "更新时间",
      key: "update_time",
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

export default defineComponent({
  setup() {
    const message = useMessage();

    const datas = reactive({
      loading: true,
      teamData: [],
      modalType: 1,
      showDailog: false,
      teamId: 0,
    });

    const initTeamList = async () => {
      datas.loading = true;
      const resp = await TeamApi.getTeamAll();
      if (resp.success === true) {
        message.success("获取团队信息成功");
        datas.teamData = resp.result;
      } else {
        message.error(resp.error.message);
      }
      datas.loading = false;
    };

    // 对话框
    const form = ref();

    // 显示创建窗口
    const showCreate = () => {
      datas.modalType = 1;
      datas.teamId = 0;
      datas.showDailog = true;
    };

    // 显示编辑窗口
    const showUpdate = (id: number) => {
      datas.modalType = 0;
      datas.teamId = id;
      datas.showDailog = true;
    };

    const deleteTeam = async (id: number) => {
      const resp = await TeamApi.deleteTeam(id.toString());
      if (resp.success === true) {
        message.success("删除成功！");
        initTeamList();
      } else {
        message.error("删除失败");
      }
    };

    const onNegativeClick = () => {
      message.success("Cancel");
      datas.showDailog = false;
    };

    const onPositiveClick = () => {
      // console.log(form.value.model);
      if (datas.modalType == 1) {
        TeamApi.createTeam(form.value.model).then((resp) => {
          if (resp.success === true) {
            message.success("创建成功！");
            initTeamList();
          } else {
            message.error("创建失败！");
          }
        });
      } else {
        TeamApi.updateTeam(datas.teamId.toString(), form.value.model).then(
          (resp) => {
            if (resp.success === true) {
              message.success("更新成功！");
              initTeamList();
            } else {
              message.error("更新失败！");
            }
          }
        );
      }
      datas.showDailog = false;
    };

    onMounted(() => {
      initTeamList();
    });

    return {
      datas,
      form,
      showUpdate,
      deleteTeam,
      showCreate,
      onNegativeClick,
      onPositiveClick,
      columns: createColumns({
        play(row: Song, action: string) {
          message.info(`Play ${row.name} action ${action}`);
          datas.teamId = row.id;
          switch (action) {
            case "edit":
              datas.modalType = 2;
              showUpdate(row.id);
              break;
            case "delete":
              deleteTeam(row.id);
              break;
            default:
              break;
          }
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
      <n-space justify="space-between" class="breadcrumb-navigation">
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
        :data="datas.teamData"
        :pagination="pagination"
        :bordered="false"
      />
    </n-card>

    <n-modal
      v-model:show="datas.showDailog"
      style="min-width: 600px"
      preset="dialog"
      positive-text="确认"
      negative-text="取消"
      @positive-click="onPositiveClick"
      @negative-click="onNegativeClick"
      :title="datas.modalType ? '新建团队' : '编辑团队'"
    >
      <teamForm ref="form" :teamId="datas.teamId" />
    </n-modal>
  </div>
</template>
