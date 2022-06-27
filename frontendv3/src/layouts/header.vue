<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    emits: ['changeThemeSignal'],
    setup(props, ctx) {
        const btnLabel = ref("深色")

        const changeTheme = () => {
            if (btnLabel.value == "深色") {
                btnLabel.value = "浅色"
            } else {
                btnLabel.value = "深色"
            }
            ctx.emit('changeThemeSignal')
        }
        return {
            btnLabel, changeTheme,
        }
    }
})
</script>

<template>
    <div class="header">
        <n-space>
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
    display: left;
}
</style>