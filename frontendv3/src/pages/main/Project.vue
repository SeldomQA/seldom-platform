<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useMessage } from "naive-ui";
import {
  SettingsOutline,
  DocumentTextOutline,
  GitMergeOutline,
} from "@vicons/ionicons5";
import ProjectApi from "~/request/project";
import ProjectDialog from "@/projectDialog.vue";
import baseUrl from "~/config/base-url";

const message = useMessage();

const datas = reactive({
  loading: false,
  showDailog: false,
  projectId: 0,
  tableData: [],
  url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
});

const initProjects = async () => {
  datas.loading = true;
  const resp = await ProjectApi.getProjects();
  if (resp.success === true) {
    datas.tableData = resp.result;
  } else {
    message.error(resp.error.message);
  }
  datas.loading = false;
};

// 显示创建窗口
const showCreate = () => {
  datas.projectId = 0;
  datas.showDailog = true;
};
// 显示编辑窗口
const showEdit = (pid: number) => {
  datas.projectId = pid;
  datas.showDailog = true;
};
// 子组件的回调
const cancelProject = () => {
  datas.showDailog = false;
  datas.projectId = 0;
  initProjects();
};
// 删除一条项目信息
const deleteProject = async (pid: number) => {
  const resp = await ProjectApi.deleteProject(pid);
  if (resp.success === true) {
    message.success("删除成功！");
    initProjects();
  } else {
    message.error("删除失败");
  }
};

// 克隆拉取项目信息
const cloneProject = async (pid: number) => {
  const resp = await ProjectApi.syncCode(pid.toString());
  if (resp.success === true) {
    message.success("克隆&拉取成功！");
    initProjects();
  } else {
    message.error("克隆&拉取失败");
  }
};

const options = [
  {
    label: "克隆&拉取",
    key: "clone",
  },
  {
    label: "编辑",
    key: "edit",
  },
  {
    label: "删除",
    key: "delete",
  },
];

const handleSelect = (key: string | number, pid: number) => {
  switch (key) {
    case "clone":
      cloneProject(pid);
      break;
    case "edit":
      showEdit(pid);
      break;
    case "delete":
      deleteProject(pid);
      break;
    default:
      break;
  }
};

onMounted(() => {
  initProjects();
});
</script>

<template>
  <div class="body">
    <div class="pageheader">
      <n-space justify="space-between" class="breadcrumb-navigation">
        <span>项目管理</span>
        <n-breadcrumb separator=">">
          <n-breadcrumb-item>首页</n-breadcrumb-item>
          <n-breadcrumb-item>配置管理</n-breadcrumb-item>
          <n-breadcrumb-item>项目管理</n-breadcrumb-item>
        </n-breadcrumb>
      </n-space>
    </div>
    <n-card class="main-card">
      <div class="filter-line">
        <n-space>
          <n-button
            cy-data="create-project"
            type="primary"
            @click="showCreate()"
            >创建</n-button
          >
        </n-space>
      </div>
      <div class="card-group">
        <n-space>
          <div v-for="(item, index) in datas.tableData" :key="index">
            <n-card
              :title="item.name"
              style="width: 350px"
              content-style="padding: 24;height:50%"
            >
              <template #header-extra>
                <n-dropdown
                  trigger="hover"
                  :options="options"
                  @select="(key) => handleSelect(key, item.id)"
                >
                  <n-icon>
                    <SettingsOutline />
                  </n-icon>
                </n-dropdown>
              </template>
              <div v-if="item.path_name == ''">
                <n-empty description="no cover"> </n-empty>
              </div>
              <div v-else style="height: 100%; width;: 100%">
                <img
                  :src="baseUrl + '/static/images/' + item.path_name"
                  style="height: 100%; width: 100%"
                />
              </div>
              <template #footer style="text-aligin: left">
                <p>测试目录: {{ item.case_dir }}</p>
                <p>文件数量: {{ item.test_num }}</p>
                <p>
                  状态:
                  <n-tag type="info" v-if="item.is_clone == 0">未克隆</n-tag>
                  <n-tag type="success" v-else>已克隆</n-tag>
                </p>
              </template>
              <template #action>
                <div>
                  {{ item.address }}
                </div>
              </template>
            </n-card>
          </div>
        </n-space>
      </div>
    </n-card>
    <n-modal v-model:show="datas.showDailog" style="min-width: 600px">
      <n-card
        style="width: 600px"
        v-if="datas.projectId == 0"
        title="创建项目"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <ProjectDialog :pid="datas.projectId" @cancel="cancelProject" />
      </n-card>
      <n-card
        style="width: 600px"
        v-else
        title="编辑项目"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <ProjectDialog :pid="datas.projectId" @cancel="cancelProject" />
      </n-card>
    </n-modal>
  </div>
</template>

<style>
.filter-line {
  padding-bottom: 24px;
}

.main {
  padding: 20px;
}

.card-group {
  text-align: left;
}
</style>
