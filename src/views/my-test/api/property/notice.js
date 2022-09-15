// import request_cong from '@/utils/request_ai.js'
import request_cong from './request_php.js'

//获取通告列表
export function get_notice_list(data) {
  return request_cong.get('/notice/information/getlist', data)
}

//发布通告
export function add_notice(data) {
  return request_cong.post('/notice/information/addnotice', data)
}

