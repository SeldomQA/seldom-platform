<script setup lang="ts">
import { reactive, onMounted } from "vue"
import { useMessage } from 'naive-ui'
import { SettingsOutline } from '@vicons/ionicons5'
import ProjectApi from '~/request/project'
import ProjectDialog from "~/components/projectDialog.vue";

const message = useMessage()

const datas = reactive({
    loading: false,
    showDailog: false,
    projectId: 0,
    tableData: [],
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
})

const initProjects = async () => {
    datas.loading = true
    const resp = await ProjectApi.getProjects()
    if (resp.success === true) {
        datas.tableData = resp.data
        console.log('tadfasd', datas.tableData)
    } else {
        message.error(resp.error.message)
    }
    datas.loading = false
}

// 显示创建窗口
const showCreate = () => {
    datas.projectId = 0
    datas.showDailog = true
}

// 显示编辑窗口
const showEdit = (pid: number) => {
    datas.projectId = pid
    datas.showDailog = true
}
// 子组件的回调
const cancelProject = () => {
    datas.showDailog = false
    datas.projectId = 0
    initProjects()
}
const options = [
    {
        label: '编辑',
        key: "edit"
    },
    {
        label: '删除',
        key: 'delete'
    },
]

const handleSelect = (key: string | number, pid: number) => {
    console.log(key)
    switch (key) {
        case "edit":
            showEdit(pid)
            break;
        case "delete":

            break;
        default:
            break;
    }
    message.info(String(key))
}


onMounted(() => {
    initProjects()
})
</script>

<template>
    <div class="body">
        <div class="pageheader">
            <n-space justify="space-between">
                <span>项目管理</span>
                <n-breadcrumb separator=">">
                    <n-breadcrumb-item>首页</n-breadcrumb-item>
                    <n-breadcrumb-item>项目管理</n-breadcrumb-item>
                </n-breadcrumb>
            </n-space>
        </div>
        <div class="main" style="background:white">
            <div class="filter-line">
                <n-button cy-data="create-project" @click="showCreate()">创建</n-button>
            </div>
            <div class="flex">
                <div v-for="(item, index) in datas.tableData" :key="index">
                    <n-card :title="item.name" size="small">
                        <template #header-extra>
                            <n-dropdown trigger="hover" :options="options"
                                @select="(key) => handleSelect(key, item.id)">
                                <n-icon>
                                    <SettingsOutline />
                                </n-icon>
                            </n-dropdown>
                        </template>
                        <n-empty description="no cover">
                        </n-empty>
                        <template #footer>
                            {{ item.address }}
                        </template>

                    </n-card>
                </div>
            </div>
        </div>
        <n-modal v-model:show="datas.showDailog" :pid="datas.projectId" style="min-width: 600px">
            <n-card style="width: 600px" v-if="datas.projectId == 0" title="创建项目" :bordered="false" size="huge"
                role="dialog" aria-modal="true">
                <ProjectDialog />
            </n-card>
            <n-card style="width: 600px" v-else title="编辑项目" :bordered="false" size="huge" role="dialog"
                aria-modal="true">
                <ProjectDialog />
            </n-card>
        </n-modal>


    </div>
</template>

<style>
.n-card {
    max-width: 300px;
}
</style>