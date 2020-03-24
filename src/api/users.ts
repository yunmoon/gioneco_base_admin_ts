import request from '@/utils/request'

export const getUsers = (params: any) =>
  request({
    url: '/monitor/manager/user-list',
    method: 'get',
    params
  })

export const getUserInfo = () =>
  request({
    url: '/monitor/user/info',
    method: 'get'
  })

export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'get'
  })

export const updateUser = (data: any) =>
  request({
    url: `/monitor/manager/user-update`,
    method: 'put',
    data
  })

export const deleteUser = (data:any) =>
  request({
    url: `/monitor/manager/user-delete`,
    method: 'delete',
    data
  })

export const login = (data: any) =>
  request({
    url: '/monitor/user/login',
    method: 'post',
    data
  })

export const createUser = (data: any) =>
  request({
    url: '/monitor/manager/user-create',
    method: 'post',
    data
  })
