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
        <el-input
          v-model="userData.username"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="userData.password"
          type="password"
          placeholder="请输入密码"
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
import { createUser } from '../../../api/users'
@Component({
  name: 'UserCreate',
  components: {
  }
})
export default class extends Vue {
  @Prop({ default: false }) private show!: boolean
  private title = '新增用户'
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
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
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
  private onSubmit() {
    const form = this.$refs.userForm as ElForm
    form.validate(async(valid: boolean) => {
      if (valid) {
        this.subLoading = true
        try {
          const result = await createUser(this.userData)
          form.resetFields()
          this.$message.success('添加成功')
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
