<template>
  <div class="dialog">
    <el-dialog :title=showTitle :visible.sync="showStatus" @close="cancelDialog()" width="450px">
      <div style="text-align: center;">
        <el-form :model="timedForm" :inline="true" label-width="150px">
        <!--
          year (int|str) – 4-digit year
          month (int|str) – month (1-12)
          day (int|str) – day of month (1-31)
          day_of_week (int|str) – number or name of weekday (0-6 or mon,tue,wed,thu,fri,sat,sun)
          hour (int|str) – hour (0-23)
          minute (int|str) – minute (0-59)
          second (int|str) – second (0-59)
         -->
          <!-- <el-form-item label="定时任务(Cron)">
            <el-col class="line" :span="1">秒:</el-col>
             <el-col :span="3">
              <el-form-item>
                <el-input v-model="timedForm.second"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">分:</el-col>
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="timedForm.minute"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">时:</el-col>
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="timedForm.hour"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">周:</el-col>
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="timedForm.day_of_week"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">天:</el-col>
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="timedForm.day"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">月:</el-col>
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="timedForm.month"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item> -->
          <el-form-item label="循环定时">
            <el-select v-model="optionsNum" placeholder="请选择">
              <el-option
                v-for="item in timeOptions"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- <el-a>https://tooltt.com/crontab-parse/</el-a> -->
           <!-- <img src="../../assets/crontab.png" style="width: 600px;"/> -->
            <!-- <el-descriptions class="margin-top" title="说明:" :column="1" border>
              <el-descriptions-item label="秒">second (0-59)</el-descriptions-item>
              <el-descriptions-item label="分">minute (0-59)</el-descriptions-item>
              <el-descriptions-item label="时">hour (0-59)</el-descriptions-item>
              <el-descriptions-item label="周">number or name of weekday (0-6 or mon,tue,wed,thu,fri,sat,sun)</el-descriptions-item>
              <el-descriptions-item label="天">day of month (1-31)</el-descriptions-item>
              <el-descriptions-item label="月">month (1-12)</el-descriptions-item>
            </el-descriptions> -->
          </el-form-item>
        </el-form>
        <div style="margin-top:10px">
          <el-button cy-data="save-task" type="primary" @click="createTimedTask()" size="small">保存</el-button>
          <el-button cy-data="save-task" type="danger" @click="deleteTimedTask()" size="small">删除</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TaskApi from '../../request/task'

export default {
  props: ['tid', 'ttmied'],
  data() {
    return {
      showStatus: true,
      showTitle: '定时任务',
      timedForm: {
        minute: '*',
        hour: '*',
        day_of_week: '*',
        day: '*',
        month: '*'
      },
      optionsNum: '',
      caseData: [],
      timeOptions: [
        {
          id: 0,
          label: '1分钟',
          value: {
            minute: '*/1',
            hour: '*',
            day_of_week: '*',
            day: '*',
            month: '*'
          }
        },
        {
          id: 1,
          label: '5分钟',
          value: {
            minute: '*/5',
            hour: '*',
            day_of_week: '*',
            day: '*',
            month: '*'
          }
        },
        {
          id: 2,
          label: '10分钟',
          value: {
            minute: '*/10',
            hour: '*',
            day_of_week: '*',
            day: '*',
            month: '*'
          }
        },
        {
          id: 3,
          label: '15分钟',
          value: {
            minute: '*/15',
            hour: '*',
            day_of_week: '*',
            day: '*',
            month: '*'
          }
        },
        {
          id: 4,
          label: '30分钟',
          value: {
            minute: '*/30',
            hour: '*',
            day_of_week: '*',
            day: '*',
            month: '*'
          }
        },
        {
          id: 5,
          label: '60分钟',
          value: {
            minute: '0',
            hour: '*/1',
            day_of_week: '*',
            day: '*',
            month: '*'
          }
        },
        {
          id: 6,
          label: '120分钟',
          value: {
            minute: '0',
            hour: '*/2',
            day_of_week: '*',
            day: '*',
            month: '*'
          }
        }
      ]
    }
  },
  created() {
    // 强制刷新
    this.timedForm = this.ttmied
    this.getOptionsNum()
  },
  mounted() {
    // 初始化方法
  },
  methods: {
    getOptionsNum() {
      for (const i in this.timeOptions) {
        if (this.timedForm.minute === this.timeOptions[i].value.minute && this.timedForm.hour === this.timeOptions[i].value.hour) {
          this.optionsNum = Number(i)
        }
      }
    },
    // 初始化任务详情
    async initTaskDetails() {
      const resp = await TaskApi.getTaskDetails(this.tid)
      if (resp.success === true) {
        this.taskform = resp.result
        this.caseData = resp.result.case_list
      } else {
        this.$message.error(resp.error.message)
      }
    },
    // 添加定时任务
    async createTimedTask() {
      this.timedForm = this.timeOptions[this.optionsNum].value
      const resp = await TaskApi.addTimed(this.tid, this.timedForm)
      if (resp.success === true) {
        this.$message.success('添加成功！')
        this.cancelDialog()
      } else {
        this.$message.error('添加失败！')
      }
    },
    async deleteTimedTask() {
      const resp = await TaskApi.deleteTimed(this.tid)
      if (resp.success === true) {
        this.$message.success('删除成功！')
        this.cancelDialog()
      } else {
        this.$message.error('删除失败！')
      }
    },
    // 关闭dialog
    cancelDialog() {
      this.$emit('cancel', {})
    }
  }
}
</script>

<style scoped>

</style>

<style>
.el-transfer-panel {
  height: 500px !important;
}
.el-transfer-panel__list {
  height: 500px !important;
}
.el-transfer-panel {
    width: 320px !important;
}
</style>
