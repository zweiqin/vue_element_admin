// import request_cong from '@/utils/request_ai.js'
import request_cong from './request_php.js'


//栋数列表查询
export function get_building_list(data) {
  return request_cong.get('/building/getlist', data)
}

//根据小区编号查询所有栋数列表信息 building/{community_code}
export function get_all_building(data) {
  return request_cong.get('/building/getlist', data)
}

//栋数新增
export function add_building(data) {
  return request_cong.post('/building/addbuilding', data)
}

//栋数修改
export function edit_building(data) {
  return request_cong.put('/building/editbuilding', data)
}

//栋数删除
export function del_building(data) {
  // console.log(data);
  return request_cong.delete('/building/deletebuilding?code=' + data.code + '&mer_id=' + data.mer_id)
}

//房产列表查询
export function get_house_list(data) {
  return request_cong.get('/house/getlist', data)
}

//房产列表查询
export function get_all_house(data) {
  return request_cong.get('/house/gethousebybuilding', data)
}

//房产新增/修改
export function add_house(data) {
  return request_cong.post('/house/addhouse', data)
}

export function edit_house(data) {
  return request_cong.put('/house/edithouse', data)
}

//删除 house/ {id}
export function del_house(data) {
  return request_cong.delete('/house/deletehouse', data)
}

