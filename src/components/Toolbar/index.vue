<template>
  <div class="tool-bar">
    <el-button
      v-for="btn in tools"
      :key="btn.event"
      :type="btn.type||'default'"
      :icon="btn.icon"
      @click="toolbarHandle(btn)"
    >
      {{ btn.label }}
    </el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Tool } from '@/api/types'
@Component({
  name: 'Toolbar',
  components: {
  }
})
export default class extends Vue {
  @Prop({ default: [] }) private tools!: Tool[]

  private toolbarHandle(btn:Tool) {
    this.$emit('click', btn.event)
  }
}
</script>
<style lang="scss" scoped>
  .tool-bar{
    margin-bottom: 10px;
  }
</style>
