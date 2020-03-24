<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="listQuery"
      class="search-from"
    >
      <el-form-item label="用户名">
        <el-input
          v-model="listQuery.username"
          clearable
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSearchSubmit"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card">
      <toolbar
        :tools="tools"
        @click="toolbarHandle"
      />
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          fixed
          align="center"
          prop="username"
          label="用户名"
        />
        <el-table-column
          fixed
          align="center"
          prop="mobile"
          label="手机号"
        />
        <el-table-column
          fixed
          align="center"
          label="是否超级管理员"
        >
          <template slot-scope="scope">
            {{ scope.row.isSuper?'是':'否' }}
          </template>
        </el-table-column>
        <el-table-column
          fixed
          align="center"
          prop="createdAt"
          label="创建时间"
        />
        <el-table-column
          label="操作"
          align="center"
          width="300"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pageSize"
        @pagination="getList"
      />
    </el-card>
    <add-user
      :show.sync="showAddUserDialog"
      @success="userAddSuccessHandle"
    />
    <edit-user
      :show.sync="showEditUserDialog"
      :update-user="editUser"
      @success="userAddSuccessHandle"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Toolbar from '@/components/Toolbar/index.vue'
import { getUsers, deleteUser } from '@/api/users'
import { Tool } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import AddUser from './components/add.vue'
import EditUser from './components/edit.vue'
@Component({
  name: 'UserList',
  components: {
    Pagination,
    Toolbar,
    AddUser,
    EditUser
  }
})
export default class extends Vue {
  private listLoading = false
  private showAddUserDialog = false
  private showEditUserDialog = false
  private editUser = {}
  private list:any[] = []
  private total = 0;
  private listQuery = {
    page: 1,
    pageSize: 10,
    username: ''
  }
  private tools: Tool[] = [
    {
      label: '新增',
      event: 'add',
      type: 'primary',
      icon: 'el-icon-plus'
    }
  ]
  created() {
    this.getList()
  }
  private async getList() {
    this.listLoading = true
    try {
      const result = await getUsers(this.listQuery)
      this.list = result.data.rows
      this.total = result.data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }
  private onSearchSubmit() {
    this.getList()
  }
  private async toolbarHandle(event:string) {
    switch (event) {
      case 'add':
        this.showAddUserDialog = true
        break
    }
  }
  private async handleEdit(item:any) {
    this.showEditUserDialog = true
    this.editUser = item
  }
  private async handleDelete(item:any) {
    const result = await this.$confirm('是否删除当前选中的数据？', '提示')
    if (result) {
      try {
        await deleteUser({ id: item.id })
        this.$message.success('删除成功')
        this.getList()
      } catch (error) {
        console.error(error)
      }
    }
  }
  private userAddSuccessHandle() {
    this.getList()
  }
}
</script>
