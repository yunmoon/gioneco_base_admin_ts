import { DEVICE_TYPES, DEVICE_STATUS } from '@/constants'

// Set utils function parseTime to filter
export { parseTime } from '@/utils'

// Filter for article status
export const articleStatusFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    published: 'success',
    draft: 'info',
    deleted: 'danger'
  }
  return statusMap[status]
}

// Filter to uppercase the first character
export const uppercaseFirstChar = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const deviceTypeFilter = (type:number) => {
  let typeMap: {[key:number]: string} = {
  }
  for (const type of DEVICE_TYPES) {
    typeMap[type.value] = type.name
  }
  return typeMap[type]
}

export const deviceStatusFilter = (type:number) => {
  const statusMap: {[key:number]: string} = {
  }
  for (const statu of DEVICE_STATUS) {
    statusMap[statu.value] = statu.name
  }
  return statusMap[type]
}
