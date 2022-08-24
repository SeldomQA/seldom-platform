<script lang="ts">
import ProjectApi from "~/request/project";
import CaseApi from "~/request/case";
import { reactive, onMounted, h, defineComponent, ref } from "vue";
import { NButton, NIcon, useMessage, TreeOption, SelectOption } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import baseUrl from "~/config/base-url";
import { FolderOpenOutline, LogoPython } from "@vicons/ionicons5";

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
      key: "class_name",
    },
    {
      title: "环境",
      key: "class_doc",
    },
    {
      title: "定时任务(Cron)",
      key: "case_name",
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
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => play(row, "run"),
          },
          { default: () => "执行" }
        );
      },
    },
  ];
};

const caseData: Song[] = [];

export default defineComponent({
  setup() {
    const datas = reactive({
      loading: true,
      projectId: "",
      fileData: [],
      caseData: [],
      caseNumber: 0,
      defaultProps: {
        children: "children",
        label: "label",
      },
    });

    const message = useMessage();

    const model = ref({
      projectOptions: [],
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
        console.log(datas.fileData);
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
              console.log(resp.result);
              datas.caseData = resp.result;
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
              // console.log(resp.result);
              data.children = treeDataFormat(resp.result);
              // datas.caseData = resp.result
              // datas.initProject()
            } else {
              message.error(resp.error.message);
            }
          }
        );
      }
    };

    // 同步项目用例
    const syncProject = async () => {
      if (datas.projectId === "") {
        message.error("请选择项目");
        return;
      }
      const resp = await ProjectApi.syncProjectCase(datas.projectId);
      if (resp.success === true) {
        initProjectFile();
        message.success("同步成功");
      } else {
        message.error(resp.error.message);
      }
    };

    const changeProject = (value: string, option: SelectOption) => {
      datas.projectId = value;
      initProjectFile();
    };

    // 运行用例
    const runCase = async (row) => {
      const resp = await CaseApi.runningCase(row.id);
      if (resp.success === true) {
        // datas.fileData = resp.result
        message.success("开始执行");
      } else {
        message.error("运行失败");
      }
      // initProjectFile()
    };

    // 打开报告
    const openReport = (row) => {
      window.open(baseUrl + "/reports/" + row.report);
    };

    // 新增编辑任务modal
    const bodyStyle = {
      width: "600px",
    };

    const segmented = {
      content: "soft",
      footer: "soft",
    };

    const showModal = ref(false);

    const options = [{}];

    onMounted(() => {
      initProjectList();
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
              runCase(row);
              break;
            case "report":
              openReport(row);
              break;
          }
        },
      }),
      pagination: false as const,
      changeProject,
      syncProject,
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
      segmented,
      showModal,
      formValue: ref({
        user: {
          name: "",
          age: "",
        },
        phone: "",
      }),
      rules: {
        user: {
          name: {
            required: true,
            message: "请输入任务名称",
            trigger: "blur",
          },
          age: {
            required: true,
            message: "请选择运行环境",
            trigger: ["input", "blur"],
          },
        },
        phone: {
          required: true,
          message: "请输入邮箱地址",
          trigger: ["input"],
        },
      },
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
          <n-button type="primary" @click="showModal = true" size="small"
            >创建</n-button
          >
        </n-space>
      </div>
      <h1>用例列表</h1>
      <n-data-table
        :columns="columns"
        :data="datas.caseData"
        :pagination="pagination"
        :bordered="false"
      />
    </n-card>

    <n-modal
      v-model:show="showModal"
      class="custom-card"
      preset="card"
      style="width: 80%"
      title="卡片预设"
      size="huge"
      :bordered="false"
      :segmented="segmented"
    >
      <n-form
        ref="formRef"
        label-placement="left"
        inline
        :label-width="80"
        :model="formValue"
        :rules="rules"
        :size="size"
        show-require-mark
      >
        <n-form-item label="任务名称" path="name">
          <n-input
            v-model:value="formValue.user.name"
            placeholder="请输入任务名称"
          />
        </n-form-item>
        <n-form-item label="运行环境" path="env">
          <n-input
            v-model:value="formValue.user.age"
            placeholder="请选择运行环境"
          />
        </n-form-item>
        <n-form-item label="告警邮箱" path="email">
          <n-input
            v-model:value="formValue.phone"
            placeholder="请输入邮箱地址"
          />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" @click="handleValidateClick">
            保存
          </n-button>
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
              :options="options"
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
