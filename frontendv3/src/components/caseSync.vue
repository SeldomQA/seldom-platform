<template>
  <div class="case-sync-modal">
    <n-space vertical>
      <n-steps :current="(current as number)" :status="currentStatus">
        <n-step
          title="拉取代码"
          description="All through the day, I me mine I me mine, I me mine"
        />
        <n-step
          title="同步用例"
          description="When I find myself in times of trouble Mother Mary comes to me"
        />
        <n-step
          title="查找结果"
          description="Here come old flat top He come grooving up slowly"
        />
        <n-step
          title="Something"
          description="Something in the way she moves Attracts me like no other lover"
        />
      </n-steps>
      <n-radio-group v-model:value="currentStatus" size="medium" name="basic">
        <n-radio-button value="error"> Error </n-radio-button>
        <n-radio-button value="process"> Process </n-radio-button>
        <n-radio-button value="wait"> Wait </n-radio-button>
        <n-radio-button value="finish"> Finish </n-radio-button>
      </n-radio-group>

      <n-button v-if="datas.syncCode == 1" n-button type="primary">
        开始
      </n-button>
      <n-button v-else type="warning"> 重试 </n-button>

      <n-space justify="space-between">
        <n-list id="caseSyncList">
          <n-list-item>
            <n-thing title="新增用例" description="同步后新增加的用例">
              Biu<br />
              Biu<br />
              Biu<br />
            </n-thing>
          </n-list-item>
        </n-list>
        <n-list id="caseSyncList">
          <n-list-item>
            <n-thing title="删除用例" description="同步后需要删除的用例">
              Biu<br />
              Biu<br />
              Biu<br />
            </n-thing>
          </n-list-item>
        </n-list>
      </n-space>
    </n-space>
  </div>
</template>

<!-- <script setup lang="ts">
import { reactive, ref, onMounted, h } from "vue";
import {
  FormInst,
  useMessage,
  StepsProps,
  NTree,
  TransferRenderSourceList,
} from "naive-ui";
import TeamApi from "~/request/team";

const props = defineProps({
  teamId: Number,
});

const message = useMessage();

const currentRef = ref<number | null>(1);
const currentStatus = ref<StepsProps["status"]>("process");
const current = currentRef;

const next = () => {
  if (currentRef.value === null) currentRef.value = 1;
  else if (currentRef.value >= 4) currentRef.value = null;
  else currentRef.value++;
};

const prev = () => {
  if (currentRef.value === 0) currentRef.value = null;
  else if (currentRef.value === null) currentRef.value = 4;
  else currentRef.value--;
};

function createLabel(level: number): string {
  if (level === 4) return "道生一";
  if (level === 3) return "一生二";
  if (level === 2) return "二生三";
  if (level === 1) return "三生万物";
  return "";
}

type Option = {
  label: string;
  value: string;
  children?: Option[];
};

const options = [
  {
    lalel: "dsds",
    value: "dsda",
    children: [
      {
        label: "34",
        value: "34",
      },
    ],
  },
];

const valueRef = ref<Array<string | number>>([]);
const renderSourceList: TransferRenderSourceList = function ({
  onCheck,
  pattern,
}) {
  return h(NTree, {
    style: "margin: 0 4px;",
    keyField: "value",
    checkable: true,
    selectable: false,
    blockLine: true,
    checkOnClick: true,
    data: options,
    pattern,
    checkedKeys: valueRef.value,
    onUpdateCheckedKeys: (checkedKeys: Array<string | number>) => {
      onCheck(checkedKeys);
    },
  });
};

const value = valueRef;

onMounted(() => { });
</script> -->

<script lang="ts">
import ProjectApi from "~/request/project";
import { defineComponent, ref, h, onMounted, reactive } from "vue";
import { repeat } from "seemly";
import { StepsProps, useMessage } from "naive-ui";

export default defineComponent({
  setup() {
    const datas = reactive({
      syncStatus: 0,
      syncCode: 1,
    });

    const message = useMessage();

    const currentRef = ref<number | null>(1);

    onMounted(() => {});

    // 同步用例
    const syncCode = async () => {
      const resp = await ProjectApi.syncCode(this.pid);
      if (resp.success === true) {
        datas.syncStatus = 1;
      } else {
        message.error(resp.error.message);
      }
    };
    
    const syncCase = async () => {
      const resp = await ProjectApi.syncCase(this.pid);
      if (resp.success === true) {
        datas.syncStatus = 1;
      } else {
        message.error(resp.error.message);
      }
    };

    const syncResult = async () => {
      const resp = await ProjectApi.syncResult(this.pid);
      if (resp.success === true) {
        datas.syncStatus = 1;
      } else {
        message.error(resp.error.message);
      }
    };

    const syncRunning = async () => {};

    return {
      datas,
      currentStatus: ref<StepsProps["status"]>("process"),
      current: currentRef,
      next() {
        if (currentRef.value === null) currentRef.value = 1;
        else if (currentRef.value >= 4) currentRef.value = null;
        else currentRef.value++;
      },
      prev() {
        if (currentRef.value === 0) currentRef.value = null;
        else if (currentRef.value === null) currentRef.value = 4;
        else currentRef.value--;
      },
    };
  },
});
</script>

<style scoped>
#caseSyncList {
  width: 500px;
}
</style>
