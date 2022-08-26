<script lang="ts">
import ProjectApi from "~/request/project";
import CaseApi from "~/request/case";
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
import TaskApi from "~/request/task";

type Song = {
  no: number;
  title: string;
  length: string;
};

const createColumns = ({
  play,
}: {
  play: (row: Song, action: String) => void;
}): DataTableColumns<Song> => {
  return [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "任务名称",
      key: "name",
    },
    {
      title: "环境",
      key: "env",
    },
    {
      title: "定时任务(Cron)",
      key: "status",
    },
    {
      title: "状态",
      key: "status",
      render(row) {
        if (row.status === 0) {
          return "未执行";
        } else if (row.status === 1) {
          return "执行中";
        } else if (row.status === 2) {
          return "已执行";
        } else {
          return "未知";
        }
      },
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
                  type: "primary",
                  strong: true,
                  secondary: true,
                  onClick: () => play(row, "run"),
                },
                { default: () => "运行" }
              ),
              h(
                NButton,
                {
                  type: "info",
                  strong: true,
                  secondary: true,
                  onClick: () => play(row, "set"),
                },
                { default: () => "定时" }
              ),
              h(
                NButton,
                {
                  type: "warning",
                  strong: true,
                  secondary: true,
                  onClick: () => play(row, "edit"),
                },
                { default: () => "编辑" }
              ),
              h(
                NButton,
                {
                  type: "error",
                  strong: true,
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

const caseData: Song[] = [];

type ModalDatas = {
  type?: number | null;
  taskId?: number | null;
  title: string;
  sourceDatas: { label: string; value: string }[];
  targetDatas: { value: string }[];
};

export default defineComponent({
  setup() {
    const datas = reactive({
      loading: true,
      projectId: "",
      fileData: [],
      caseData: [],
      taskData: [],
      caseNumber: 0,
    });

    const modalDatas: ModalDatas = reactive({
      title: "",
      sourceDatas: [],
      targetDatas: [],
    });

    const message = useMessage();

    const model = ref({
      projectOptions: [],
      envOptions: [],
    });

    // 格式化tree数据
    const treeDataFormat = (datas) => {
      return datas.map((_, index) => {
        const label = _.label;
        const full_name = _.full_name;
        const children = _.children;
        const isLeaf = _.is_leaf ? true : false;
        const prefix = () =>
          h(NIcon, null, {
            default: () => h(isLeaf ? LogoPython : FolderOpenOutline),
          });

        return {
          label,
          full_name,
          children,
          isLeaf,
          prefix,
        };
      });
    };

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

    // 初始化项目文件列表
    const initProjectFile = async () => {
      const resp = await ProjectApi.getProjectTree(datas.projectId);
      if (resp.success === true) {
        datas.fileData = treeDataFormat(resp.result.files);
        datas.caseNumber = resp.result.case_number;
        // console.log(datas.fileData);
      } else {
        message.error(resp.error.message);
      }
    };

    // 点击项目文件
    const handleNodeClick = (data) => {
      // 如果是文件返回 类&方法
      if (data.label.match(".py")) {
        ProjectApi.getProjectCases(datas.projectId, data.full_name).then(
          (resp) => {
            if (resp.success === true) {
              message.success("获取用例成功");
              // console.log(resp.result);
              datas.caseData = resp.result;
              modalDatas.sourceDatas = resp.result.map((_, index) => ({
                label: _.case_name,
                value: _.id,
              }));
            } else {
              message.error(resp.error.message);
            }
          }
        );
      } else {
        // 如果目录返回下一级 目录&文件
        if (data.children.length > 0) {
          // 下一级不为空，直接返回
          return;
        }
        ProjectApi.getProjectSubdirectory(datas.projectId, data.full_name).then(
          (resp) => {
            if (resp.success === true) {
              message.success("获取用例成功");
              data.children = treeDataFormat(resp.result);
            } else {
              message.error(resp.error.message);
            }
          }
        );
      }
    };

    const changeProject = (value: string, option: SelectOption) => {
      datas.projectId = value;
      initProjectFile();
      initTaskList();
    };

    const changeEnv = (value: string, option: SelectOption) => {
      formValue.value.env = value;
    };

    const initTaskList = async () => {
      datas.loading = true;
      const resp = await TaskApi.getTasks();
      if (resp.success === true) {
        datas.taskData = resp.result;
      } else {
        message.error(resp.error.message);
      }
      datas.loading = false;
    };

    const initEnvsList = async () => {
      datas.loading = true;
      const resp = await ProjectApi.getEnvs();
      if (resp.success === true) {
        for (let i = 0; i < resp.result.length; i++) {
          model.value.envOptions.push({
            value: resp.result[i].id,
            label: resp.result[i].name,
          });
        }
      } else {
        message.error(resp.error.message);
      }
      datas.loading = false;
    };

    // 新增编辑任务modal
    const showModal = ref(false);
    const openModal = (type: number) => {
      if (datas.projectId == "") {
        message.warning("请选择项目");
      } else {
        switch (type) {
          case 1:
            modalDatas.title = "新增任务";
            modalDatas.type = 1;

            break;
          case 2:
            modalDatas.title = "编辑任务";
            modalDatas.type = 2;
            break;
        }
        showModal.value = true;
      }
    };

    const segmented = {
      content: "soft",
      footer: "soft",
    };

    const formRef = ref<FormInst | null>(null);

    const formValue = ref<{ name: string; env: string; email: string }>({
      name: null,
      env: null,
      email: null,
    });

    const options = [{}];

    const handleSave = (e: MouseEvent) => {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          console.log(modalDatas.targetDatas);
          let payload = {
            taskId: modalDatas.taskId,
            project: datas.projectId,
            name: formValue.value.name,
            env: formValue.value.env,
            email: formValue.value.email,
            cases: modalDatas.targetDatas,
          };
          if (modalDatas.type === 1) {
            TaskApi.createTask(payload).then((resp) => {
              if (resp.success === true) {
                message.success("创建成功！");
                showModal.value = false;
              } else {
                message.error("创建失败！");
              }
            });
          } else {
            TaskApi.updateTask(modalDatas.taskId, payload).then((resp) => {
              if (resp.success === true) {
                message.success("更新成功！");
                showModal.value = false;
              } else {
                message.error("更新失败！");
              }
            });
          }
        } else {
          message.error("必填项校验不通过");
          console.log(errors);
        }
      });
    };

    onMounted(() => {
      initProjectList();
      initEnvsList();
    });

    return {
      datas,
      model,
      caseData,
      treeDataFormat,
      columns: createColumns({
        play(row: Song, action: String) {
          switch (action) {
            case "run":
              openReport(row);
              break;
            case "set":
              openReport(row);
              break;
            case "edit":
              openReport(row);
              break;
            case "delete":
              openReport(row);
              break;
          }
        },
      }),
      pagination: false as const,
      changeProject,
      changeEnv,
      handleNodeClick,
      nodeProps: ({ option }: { option: TreeOption }) => {
        return {
          onClick() {
            handleNodeClick(option);
          },
        };
      },
      defaultExpandedKeys: ref(["40", "41"]),
      // modal
      modalDatas,
      segmented,
      showModal,
      openModal,

      formRef,
      formValue,
      rules: {
        name: {
          required: true,
          message: "请输入任务名称",
          trigger: ["input"],
        },
        env: {
          type: "number",
          required: true,
          trigger: ["blur", "change"],
          message: "请选择运行环境",
        },
        email: {
          required: true,
          message: "请输入邮箱地址",
          trigger: ["input"],
        },
      },
      handleSave,
    };
  },
});
</script>

<template>
  <div class="body">
    <div class="pageheader">
      <n-space justify="space-between">
        <span>任务管理</span>
        <n-breadcrumb separator=">">
          <n-breadcrumb-item href="/">首页</n-breadcrumb-item>
          <n-breadcrumb-item>任务管理</n-breadcrumb-item>
        </n-breadcrumb>
      </n-space>
    </div>
    <n-card class="main-card">
      <div>
        <n-space justify="space-between">
          <n-form inline :model="model" label-placement="left">
            <n-form-item label="项目">
              <n-select
                style="width: 200px"
                :options="model.projectOptions"
                placeholder="选择项目"
                @update:value="changeProject"
              >
              </n-select>
            </n-form-item>
            <n-form-item label="用例" label-placement="left">
              <n-tag type="info" style="margin-right: 12px">{{
                datas.caseNumber
              }}</n-tag>
              条
            </n-form-item>
          </n-form>
          <n-button type="primary" @click="openModal(1)" size="small"
            >创建</n-button
          >
        </n-space>
      </div>
      <h1>任务列表</h1>
      <n-data-table
        :columns="columns"
        :data="datas.taskData"
        :pagination="pagination"
        :bordered="false"
      />
    </n-card>

    <n-modal
      v-model:show="showModal"
      class="custom-card"
      preset="card"
      style="width: 80%"
      :title="modalDatas.title"
      size="huge"
      :bordered="false"
      :segmented="segmented"
    >
      <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
        label-placement="left"
        inline
        :label-width="80"
        size="medium"
        show-require-mark
      >
        <n-form-item label="任务名称" path="name">
          <n-input
            v-model:value="formValue.name"
            placeholder="请输入任务名称"
          />
        </n-form-item>
        <n-form-item label="运行环境" path="env">
          <n-select
            v-model:value="formValue.env"
            style="width: 200px"
            :options="model.envOptions"
            placeholder="请选择运行环境"
          >
          </n-select>
        </n-form-item>
        <n-form-item label="告警邮箱" path="email">
          <n-input
            v-model:value="formValue.email"
            placeholder="请输入邮箱地址"
          />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" @click="handleSave"> 保存 </n-button>
        </n-form-item>
      </n-form>
      <n-divider title-placement="left"> 选择用例 </n-divider>
      <div>
        <n-grid x-gap="16" :cols="6">
          <n-gi>
            <n-tree
              class="filetree"
              block-line
              expand-on-click
              :data="datas.fileData"
              :default-expanded-keys="defaultExpandedKeys"
              key-field="label"
              :node-props="nodeProps"
            />
          </n-gi>
          <n-gi span="5">
            <n-transfer
              ref="transfer"
              virtual-scroll
              :options="modalDatas.sourceDatas"
              v-model:value="modalDatas.targetDatas"
              source-filterable
              target-filterable
            />
          </n-gi>
        </n-grid>
      </div>
    </n-modal>
  </div>
</template>

<script></script>

<style></style>
