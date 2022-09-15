import request_php from './request_php.js'

//小区查询
export function get_community_list(data) {
  return request_php.get('/community/getlist', data)
}

//小区新增
export function add_community(data) {
  return request_php.post('/community/addcommunity', data)
}

//小区编辑(包括状态修改)
export function edit_community(data) {
  return request_php.put('/community/editcommunity', data)
}

// {
//   "status": 200,
//   "msg": "success",
//   "data": "45"
// }
