<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  emits: ["changeThemeSignal"],
  setup(props, ctx) {
    const mainhtml = document.getElementsByTagName("html");
    const btnLabel = ref("深色");
    const localStorage = window.localStorage;
    const changeTheme = () => {
      if (btnLabel.value == "深色") {
        btnLabel.value = "浅色";
        localStorage.setItem("themeMode", "dark");
      } else {
        btnLabel.value = "深色";
        localStorage.setItem("themeMode", "light");
      }
      ctx.emit("changeThemeSignal");
      mainhtml[0].classList.toggle("dark");
    };
    onMounted(() => {
      const mode = localStorage.getItem("themeMode");
      if (mode == "light" || mode == null) {
        btnLabel.value = "深色";
      } else {
        btnLabel.value = "浅色";
      }
    });
    return {
      btnLabel,
      changeTheme,
    };
  },
});
</script>

<template>
  <div class="header">
    <n-space justify="end">
      <n-button @click="changeTheme">
        <template #default>
          {{ btnLabel }}
        </template>
      </n-button>
    </n-space>
  </div>
</template>

<style>
.header {
}
</style>
