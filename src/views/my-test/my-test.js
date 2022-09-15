/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const MyTest = {
  path: '/my-test',
  component: Layout,
  // redirect: '/my-test/test',
  name: 'my-test',
  meta: {
    title: 'my-test',
    icon: 'money'
  },
  children: [
    {
      path: 'test',
      component: () => import('@/views/my-test/test/index'),
      name: 'test',
      meta: { title: 'test', icon: 'language', affix: true }
    },
    {
      path: 'test2',
      component: () => import('@/views/my-test/test2/index'),
      name: 'test2',
      meta: { title: 'test2', icon: 'language', noCache: true }
    },
    {
      path: 'examination',
      component: () => import('@/views/my-test/examination'),
      name: 'Examination',
      meta: { title: 'Examination', icon: 'people', noCache: true }
    },
    {
      path: 'custom-event',
      component: () => import('@/views/my-test/custom-event/Father.vue'),
      name: 'custom-event',
      meta: { title: 'custom-event', icon: 'people', noCache: true }
    },
    {
      path: 'to-excel',
      component: () => import('@/views/my-test/to-excel/to-excel'),
      name: 'toExcel',
      meta: { title: 'toExcel', icon: 'people', noCache: true }
    },
    {
      path: 'excel-encapsulate',
      component: () => import('@/views/my-test/excel-encapsulate'),
      name: 'excel-encapsulate',
      meta: { title: 'excel方法的封装', icon: 'people', noCache: true }
    },
    {
      path: 'column-for-cycle',
      component: () => import('@/views/my-test/column-for-cycle'),
      name: 'column-for-cycle',
      meta: { title: 'column标签的for循环', icon: 'people', noCache: true }
    }
    // {
    //   path: '/admin/power',
    //   component: () => import('@/views/admin/power'),
    //   name: '员工权限',
    //   meta: { title: '员工权限' }
    // },
    // {
    //   path: '/admin/info',
    //   component: () => import('@/views/admin/info'),
    //   name: '员工信息',
    //   meta: { title: '员工信息' }
    // },
  ]
}

export default MyTest
