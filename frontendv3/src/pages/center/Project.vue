<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useMessage, useDialog } from "naive-ui";
import { SettingsOutline } from "@vicons/ionicons5";
import ProjectApi from "~/request/project";
import ProjectForm from "@/ProjectForm.vue";
import baseUrl from "~/config/base-url";

const message = useMessage();
const dialog = useDialog();

const datas = reactive({
  loading: false,
  showDailog: false,
  projectId: 0,
  projectData: [],
  url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
});

// 初始化项目列表
const initProjects = async () => {
  datas.loading = true;
  const resp = await ProjectApi.getProjects();
  if (resp.success === true) {
    datas.projectData = resp.result;
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
const deleteProject = (pid: number) => {
  dialog.warning({
    title: '警告',
    content: '你确定删除项目吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      ProjectApi.deleteProject(pid.toString()).then((resp: any) => {
        if (resp.success === true) {
          message.success("删除成功！");
          initProjects();
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

const handleSelect = (key: string, pid: number) => {
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
        <span>项目配置</span>
        <n-breadcrumb separator=">">
          <n-breadcrumb-item>配置中心</n-breadcrumb-item>
          <n-breadcrumb-item>项目配置</n-breadcrumb-item>
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
          <div v-for="(item, index) in datas.projectData" :key="index">
            <n-card
              :title="item['name']"
              class="card-style"
              content-style="padding: 24px; height:50%;"
              hoverable
            >
              <template #header-extra>
                <n-dropdown
                  trigger="hover"
                  :options="options"
                  @select="(key) => handleSelect(key, item['id'])"
                >
                  <n-icon>
                    <SettingsOutline />
                  </n-icon>
                </n-dropdown>
              </template>
              <div v-if="item['path_name'] == ''">
                <n-empty description="no cover"> </n-empty>
              </div>
              <div v-else style="height: 100%; width: 100%">
                <img
                  :src="baseUrl + '/static/images/' + item['path_name']"
                  style="height: 100%; width: 100%"
                />
              </div>
              <n-descriptions label-placement="left" column="1">
                <n-descriptions-item>
                  <template #label> 测试目录 </template>
                  {{ item['case_dir'] }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label> 文件数量 </template>
                  {{ item['test_num'] }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label> 状态 </template>
                  <n-tag v-if="item['is_clone'] == 0" type="info" size="small" >未克隆</n-tag>
                  <n-tag v-else type="success" size="small">已克隆</n-tag>
                </n-descriptions-item>
              </n-descriptions>
              <template #action>
                <div>
                  {{ item['address'] }}
                </div>
              </template>
            </n-card>
          </div>
        </n-space>
      </div>
    </n-card>
    <n-modal v-model:show="datas.showDailog">
      <n-card
        style="width: 600px"
        :title="datas.projectId == 0 ? '新建项目' : '编辑项目'"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <ProjectForm :pid="datas.projectId" @cancel="cancelProject" />
      </n-card>
    </n-modal>
  </div>
</template>

<style>
.filter-line {
  padding-bottom: 24px;
}

.card-group {
  text-align: left;
}

.card-style {
  width: 300px;
  margin-right: 20px;
}

</style>
