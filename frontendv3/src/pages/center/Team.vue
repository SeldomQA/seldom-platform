<script setup lang="ts">
import { reactive, onMounted, h} from "vue";
import {
  NButton,
  useMessage,
  NSpace,
} from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { useDialog} from "naive-ui";
import TeamApi from "~/request/team";
import TeamForm from "@/TeamForm.vue";


type RowData  = {
  id: number;
  name: string;
  email: string;
  update_time: string;
};

const createColumns = ({
  teamList
}: {
  teamList: (row: RowData , action: string) => void;
}): DataTableColumns<RowData> => {
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
      title: "邮箱",
      key: "email",
    },
    {
      title: "创建时间",
      key: "create_time",
    },
    {
      title: "更新时间",
      key: "update_time",
    },
    {
      title: "操作",
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
                  size: "small",
                  onClick: () => teamList(row, "edit"),
                },
                { default: () => "编辑" }
              ),
              h(
                NButton,
                {
                  type: "error",
                  secondary: true,
                  size: "small",
                  onClick: () => teamList(row, "delete"),
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

const columns = createColumns({
  teamList(row: RowData, action: string) {
    datas.teamId = row.id;
    switch (action) {
      case "edit":
        datas.modalType = 0;
        showUpdate(row.id);
        break;
      case "delete":
        deleteTeam(row.id);
        break;
      default:
        break;
    }
  },
});

const pagination = false as const

const message = useMessage();
const dialog = useDialog();

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
    datas.teamData = resp.result;
  } else {
    message.error(resp.error.message);
  }
  datas.loading = false;
};


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


// 删除环境
const deleteTeam = (id: number) => {
  dialog.warning({
    title: '警告',
    content: '你确定删除团队吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      TeamApi.deleteTeam(id.toString()).then((resp: any) => {
        if (resp.success === true) {
          message.success("删除成功！");
          initTeamList();
        } else {
          message.error(resp.error.message);
        }
      })
    },
    onNegativeClick: () => {
      console.log('取消删除');
    }
  })
};

// 关闭弹窗回调
const cancelDialog = () => {
  datas.showDailog = false;
  initTeamList();
};

onMounted(() => {
  initTeamList();
});
</script>

<template>
  <div class="body">
    <div class="pageheader">
      <n-space justify="space-between" class="breadcrumb-navigation">
        <span>团队配置</span>
        <n-breadcrumb separator=">">
          <n-breadcrumb-item>配置中心</n-breadcrumb-item>
          <n-breadcrumb-item>团队配置</n-breadcrumb-item>
        </n-breadcrumb>
      </n-space>
    </div>

    <n-card class="main-card">
      <div class="filter-line">
        <n-button type="primary" @click="showCreate">创建</n-button>
      </div>
      <n-data-table
        :columns="columns"
        :data="datas.teamData"
        :pagination="pagination"
        :bordered="false"
      />
    </n-card>

    <!-- 创建&编辑弹窗 -->
    <n-modal v-model:show="datas.showDailog">
      <n-card
        :title="datas.modalType ? '新建团队' : '编辑团队'"
        style="width: 600px"
        role="dialog"
      >
        <TeamForm ref="form" :teamId="datas.teamId" @cancel="cancelDialog"/>
      </n-card>
    </n-modal>
  </div>
</template>

<style scoped>
.filter-line {
  padding-bottom: 20px;
}
</style>