import request from '@/utils/request'
export async function downloadFile(url:string, params:any, fileName:string) {
  const response = await request.get<any, Blob>(url, {
    params,
    responseType: 'blob'
  })
  const linkUrl = window.URL.createObjectURL(new Blob([response]))
  const link = document.createElement('a')
  link.href = linkUrl
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  link.remove()
}
