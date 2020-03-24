<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
  >
    <el-form
      ref="userForm"
      label-width="150px"
      :model="userData"
      :rules="rules"
      class="deviceVersionForm"
    >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <span>{{ userData.username }}</span>
      </el-form-item>
      <el-form-item
        label="新密码"
        prop="password"
      >
        <el-input
          v-model="userData.password"
          type="password"
          placeholder="请输入新密码"
        />
      </el-form-item>
      <el-form-item
        label="手机号"
        prop="mobile"
      >
        <el-input
          v-model="userData.mobile"
          placeholder="请输入手机号"
        />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogVisible = false">
        取 消
      </el-button>
      <el-button
        type="primary"
        :loading="subLoading"
        @click="onSubmit"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui'
import { updateUser } from '../../../api/users'
@Component({
  name: 'UserCreate',
  components: {
  }
})
export default class extends Vue {
  @Prop({ default: false }) private show!: boolean
  @Prop({ default: {} }) private updateUser!:any
  private title = '编辑用户'
  private subLoading = false
  private dialogVisible = this.show
  private userData = {
    username: '',
    password: '',
    mobile: ''
  }
  private rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    mobile: [
      { required: true, message: '请输入手机号', trigger: 'blur' }
    ]
  }
  @Watch('dialogVisible')
  private onDialogVisibleChange() {
    this.$emit('update:show', this.dialogVisible)
  }

  @Watch('show')
  private onShowChange() {
    this.dialogVisible = this.show
  }
  @Watch('updateUser', { immediate: true, deep: true })
  private onUpdateUserChange() {
    this.userData.username = this.updateUser.username
    this.userData.mobile = this.updateUser.mobile
  }
  private onSubmit() {
    const form = this.$refs.userForm as ElForm
    form.validate(async(valid: boolean) => {
      if (valid) {
        this.subLoading = true
        try {
          const result = await updateUser(this.userData)
          form.resetFields()
          this.$message.success('更新成功')
          this.subLoading = false
          this.dialogVisible = false
          this.$emit('success')
        } catch (error) {
          this.subLoading = false
        }
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  .deviceVersionForm{
    .el-input{
      width: 360px;
    }
    .el-select{
      width: 360px;
    }
    .el-textarea{
      width: 360px;
    }
  }
</style>
