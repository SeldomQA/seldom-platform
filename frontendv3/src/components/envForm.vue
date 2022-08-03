<template>
  <n-form ref="formRef" :model="model" :style="{ maxWidth: '640px' }">
    <n-form-item
      label="base-url"
      path="name"
      :rule="{
        required: true,
        message: 'please input base-url',
        trigger: ['input', 'blur'],
      }"
    >
      <n-input v-model:value="model.name" clearable />
    </n-form-item>
    <div>选填参数</div>
    <n-dynamic-input
      v-model:value="model.dynamicInputValue"
      item-style="margin-bottom: 0;"
      :on-create="onCreate"
      #="{ index, value }"
    >
      <div style="display: flex">
        <!--
          通常，path 的变化会导致 form-item 验证内容或规则的改变，所以 naive-ui 会清理掉
          表项已有的验证信息。但是这个例子是个特殊情况，我们明确的知道，path 的改变不会导致
          form-item 验证内容和规则的变化，所以就 ignore-path-change
        -->
        <n-form-item
          ignore-path-change
          :show-label="false"
          :path="`dynamicInputValue[${index}].name`"
          :rule="dynamicInputRule"
        >
          <n-input
            v-model:value="model.dynamicInputValue[index].name"
            placeholder="Name"
            @keydown.enter.prevent
          />
          <!--
            由于在 input 元素里按回车会导致 form 里面的 button 被点击，所以阻止了默认行为
          -->
        </n-form-item>
        <div style="height: 34px; line-height: 34px; margin: 0 8px">:</div>
        <n-form-item
          ignore-path-change
          :show-label="false"
          :path="`dynamicInputValue[${index}].value`"
          :rule="dynamicInputRule"
        >
          <n-input
            v-model:value="model.dynamicInputValue[index].value"
            placeholder="Value"
            @keydown.enter.prevent
          />
        </n-form-item>
      </div>
    </n-dynamic-input>
  </n-form>
  <pre>{{ JSON.stringify(model.dynamicInputValue, null, 2) }}</pre>
  <pre>{{ JSON.stringify(model.name) }}</pre>
</template>

<script lang="ts">
import { FormInst } from "naive-ui";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  setup() {
    const formRef = ref<FormInst | null>(null);

    const dynamicForm = reactive({
      name: "",
      hobbies: [{ hobby: "" }],
    });

    const removeItem = (index: number) => {
      dynamicForm.hobbies.splice(index, 1);
    };

    const addItem = () => {
      dynamicForm.hobbies.push({ hobby: "" });
    };

    const handleValidateClick = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          console.log("验证通过");
        } else {
          console.log(errors);
        }
      });
    };

    return {
      formRef,
      dynamicForm,
      addItem,
      removeItem,
      handleValidateClick,
      dynamicInputRule: {
        trigger: "input",
        validator(rule: unknown, value: string) {
          if (value.length >= 5) return new Error("最多输入四个字符");
          return true;
        },
      },
      model: ref({
        name: "",
        dynamicInputValue: [{ value: "username", name: "admin" }],
      }),
      onCreate() {
        return {
          name: "",
          value: "",
        };
      },
    };
  },
});
</script>
