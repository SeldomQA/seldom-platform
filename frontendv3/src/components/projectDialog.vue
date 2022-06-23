<template>
  <div class="project-dialog">
    <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto"
      require-mark-placement="right-hanging"  :style="{
        maxWidth: '640px'
      }">
      <n-form-item label="名称" path="inputNameValue">
        <n-input v-model:value="form.name" placeholder="请输入名称" />
      </n-form-item>
      <n-form-item label="关联项目" path="inputProValue">
        <n-input v-model:value="form.address" placeholder="请输入关联项目" />
      </n-form-item>
      <n-form-item>
        <n-alert title="关联项目：使用seldom开发的自动化项目路径" type="success"></n-alert>
      </n-form-item>
      <div class="dialog-footer">
        <n-button cy-data="cancel-project" @click="cancelProject()">取消</n-button>
        <n-button cy-data="save-project" type="primary" @click="onSubmit('form')">保存</n-button>
      </div>
    </n-form>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref,onMounted } from "vue"
import { useMessage } from 'naive-ui'
import ProjectApi from '~/request/project'

const props = defineProps({
  pid: String
})

const emit = defineEmits(["cancel"])

const message = useMessage()

const form = reactive({
  name: '',
  address: ''
})

const rules = {
  inputNameValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入名称'
  },
  inputProValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入关联项目'
  },
}

const model = ref({
  inputValue: null,
  textareaValue: null,
  selectValue: null,
  multipleSelectValue: null,
  datetimeValue: null,
  nestedValue: {
    path1: null,
    path2: null
  },
  switchValue: false,
  checkboxGroupValue: null,
  radioGroupValue: null,
  radioButtonGroupValue: null,
  inputNumberValue: null,
  timePickerValue: null,
  sliderValue: 0,
  transferValue: null
})

// 获取一条项目信息
const getProject = async () => {
  const resp = await ProjectApi.getProject(props.pid)
  if (resp.success === true) {
    form = resp.data
  } else {
    message.error(resp.error.message);
  }
}
// 关闭dialog
const cancelProject = () => {
  emit('cancel', {})
}
// 创建项目按钮
const onSubmit = (formName) => {
  console.log('pid', props.pid)
  datas.$refs[formName].validate(valid => {
    if (valid) {
      if (props.pid === 0) {
        ProjectApi.createProject(form).then(resp => {
          if (resp.success === true) {
            message.success('创建成功！')
            cancelProject()
          } else {
            message.error('创建失败！');
          }
        })
      } else {
        ProjectApi.updateProject(props.pid, form).then(resp => {
          if (resp.success === true) {
            message.success('更新成功！')
            cancelProject()
          } else {
            message.error('更新失败！');
          }
        })
      }
    } else {
      return false;
    }
  });
}

onMounted(() => {
    //   if (props.pid === 0) {
    //   this.showTitle = '创建项目'
    // } else {
    //   this.showTitle = '编辑项目'
    //   this.getProject()
    // }
    // 强
})

// export default {

//   data() {
//     return {
//       showStatus: true,
//       showTitle: '',

//       rules: {
//         name: [
//           { required: true, message: '请输入项目名称', trigger: 'blur' }
//         ],
//         address: [
//           { required: true, message: '请输入项目地址', trigger: 'blur' }
//         ]
//       },
//       inResize: true
//     }
//   },
//   created() {
//     if (props.pid === 0) {
//       datas.showTitle = '创建项目'
//     } else {
//       datas.showTitle = '编辑项目'
//       datas.getProject()
//     }
//     // 强制刷新
//     datas.inResize = false;
//     datas.$nextTick(() => {
//       datas.inResize = true;
//     });
//   },
//   mounted() {
//     //   datas.initProject()
//   },
//   methods: {

//   }
// }
</script>

<style scoped>
.dialog-footer {
  float: right;
}
</style>
