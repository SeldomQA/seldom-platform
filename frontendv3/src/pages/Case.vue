<script lang="ts">
import ProjectApi from '~/request/project'
import CaseApi from '~/request/case'
import { reactive, onMounted, h, defineComponent, ref } from 'vue'
import { NButton, useMessage, TreeOption, SelectOption } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import baseUrl from "~/config/base-url";

type Song = {
  no: number
  title: string
  length: string
}

const createColumns = ({
  play
}: {
  play: (row: Song, action: String) => void
}): DataTableColumns<Song> => {
  return [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: '测试类',
      key: 'class_name'
    },
    {
      title: '测试类描述',
      key: 'class_doc'
    },
    {
      title: '测试方法',
      key: 'case_name'
    },
    {
      title: '测试方法描述',
      key: 'case_doc'
    },
    {
      title: '报告',
      key: 'report',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            // tertiary: true,
            text: true,
            size: 'small',
            onClick: () => play(row, "report")
          },
          { default: () => row.report }
        )
      }
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => play(row, "run")
          },
          { default: () => '执行' }
        )
      }
    }
  ]
}

const caseData: Song[] = []


export default defineComponent({
  setup() {
    const datas = reactive({
      loading: true,
      projectId: '',
      fileData: [],
      caseData: [],
      caseNumber: 0,
      defaultProps: {
        children: 'children',
        label: 'label'
      },

    })

    const message = useMessage()

    const model = ref({
      projectOptions: []
    })

    // 获取项目列表
    const initProjectList = async () => {
      datas.loading = true
      const resp = await ProjectApi.getProjects()
      if (resp.success === true) {
        // datas.tableData = resp.data
        for (let i = 0; i < resp.data.length; i++) {
          model.value.projectOptions.push({
            value: resp.data[i].id,
            label: resp.data[i].name
          })
        }
      } else {
        message.error(resp.error.message)
      }
      datas.loading = false
    }

    // 初始化项目文件列表
    const initProjectFile = async () => {
      const resp = await ProjectApi.getProjectTree(datas.projectId)
      if (resp.success === true) {
        datas.fileData = resp.data.files
        datas.caseNumber = resp.data.case_number
        console.log(datas.fileData);
      } else {
        message.error(resp.error.message)
      }
    }

    // 点击项目文件
    const handleNodeClick = (data) => {
      // 如果是文件返回 类&方法
      if (data.label.match('.py')) {
        ProjectApi.getProjectCases(datas.projectId, data.full_name).then(resp => {
          if (resp.success === true) {
            message.success('获取用例成功')
            console.log(resp.data)
            datas.caseData = resp.data
            // datas.initProject()
          } else {
            message.error(resp.error.message)
          }
        })
      } else {
        // 如果目录返回下一级 目录&文件
        if (data.children.length > 0) {
          // 下一级不为空，直接返回
          return
        }
        ProjectApi.getProjectSubdirectory(datas.projectId, data.full_name).then(resp => {
          if (resp.success === true) {
            message.success('获取用例成功')
            console.log(resp.data)
            data.children = resp.data
            // datas.caseData = resp.data
            // datas.initProject()
          } else {
            message.error(resp.error.message)
          }
        })
      }
    }

    // 同步项目用例
    const syncProject = async () => {
      if (datas.projectId === '') {
        message.error('请选择项目')
        return
      }
      const resp = await ProjectApi.syncProjectCase(datas.projectId)
      if (resp.success === true) {
        initProjectFile()
        message.success('同步成功')
      } else {
        message.error(resp.error.message)
      }
    }

    const changeProject = (value: string, option: SelectOption) => {
      datas.projectId = value
      initProjectFile()
    }

    // 运行用例
    const runCase = async (row) => {
      const resp = await CaseApi.runningCase(row.id)
      if (resp.success === true) {
        // datas.fileData = resp.data
        message.success('开始执行')
      } else {
        message.error('运行失败')
      }
      // initProjectFile()
    }

    // 打开报告
    const openReport = (row) => {
      window.open(baseUrl + '/reports/' + row.report)
    }

    onMounted(() => {
      initProjectList()
    })

    return {
      datas, model,
      caseData,
      columns: createColumns({
        play(row: Song, action: String) {
          switch (action) {
            case "run":
              runCase(row)
              break
            case "report":
              openReport(row)
              break
          }

        }
      }),
      pagination: false as const,
      changeProject, syncProject, handleNodeClick,
      nodeProps: ({ option }: { option: TreeOption }) => {
        return {
          onClick() {
            handleNodeClick(option)
          }
        }
      },
      defaultExpandedKeys: ref(['40', '41']),
    }
  }
})

</script>

<template>
  <div class="body">
    <div class="pageheader">
      <n-space justify="space-between">
        <span>用例管理</span>
        <n-breadcrumb separator=">">
          <n-breadcrumb-item href="/" >首页</n-breadcrumb-item>
          <n-breadcrumb-item>用例管理</n-breadcrumb-item>
        </n-breadcrumb>
      </n-space>
    </div>
    <n-card class="main-card">
      <div>
        <n-space justify="space-between">
          <n-form inline :model="model" label-placement="left">
            <n-form-item label="项目">
              <n-select style="width:200px" :options="model.projectOptions" placeholder="选择项目"
                @update:value="changeProject">
              </n-select>
            </n-form-item>
            <n-form-item>
              <n-button type="primary" @click="syncProject" size="small">同步</n-button>
            </n-form-item>
          </n-form>
          <n-form-item label="用例" label-placement="left">
            <n-tag type="info" style="margin-right:12px">{{ datas.caseNumber }}</n-tag> 条
          </n-form-item>
        </n-space>
      </div>
      <h1>用例列表</h1>
      <div>
        <n-grid x-gap="16" :cols="6">
          <n-gi>
            <n-tree class="filetree" block-line expand-on-click :data="datas.fileData"
              :default-expanded-keys="defaultExpandedKeys" key-field='label' :node-props="nodeProps" />
          </n-gi>
          <n-gi span="5">
            <n-data-table :columns="columns" :data="datas.caseData" :pagination="pagination" :bordered="false" />
          </n-gi>
        </n-grid>
      </div>
    </n-card>
  </div>
</template>

<style>
.filetree {
  border: solid 1px var(--n-border-color);
}
</style>