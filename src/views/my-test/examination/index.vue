<template>
  <div class="notice">
    <el-card>
      <my-component>自定义组件里面的内容</my-component>
    </el-card>

    <el-card>
      {{ noticeForm.title_like.title_like_like }}
    </el-card>
    <el-card>
      {{ arrayForm.title_like.title_like_like[0] }}
    </el-card>
    <el-card>
      <el-button size="small" type="danger" @click="changeTitle()">改变noticeForm.title_like</el-button>
      <el-button size="small" type="danger" @click="changeATitle()">arrayForm.title_like</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'examination',
  data() {
    return {
      noticeForm: {
        title_like: {
          title_like_like: 'avvjaovhn'
        },
      },
      arrayForm: {
        title_like: {
          title_like_like: ['jdfxfxcm']
        },
      },
      // tableData: {
      //   data: [],
      //   total: 0,
      // },
      // formLabelWidth: '120px',
      // labelPosition: 'right',
      // //详情对话框
      // detailVisible: false,
      // detail: {},
      // //新增日报
      // addVisible: false,
      // addForm: {
      //   member_id_list: [],
      //   title: '',
      //   content: '',
      //   mer_id: 1,
      // },
      // addRules: {
      //   title: [
      //     {
      //       required: true,
      //       message: '日报标题不能为空',
      //       change: 'blue',
      //     },
      //   ],
      //   content: [
      //     {
      //       required: true,
      //       message: '日报内容不能为空',
      //       change: 'blue',
      //     },
      //   ],
      // },
      // memberVisible: false,
      // community_list: [],
      // build_list: [],
      // build_disabled: false,
      // memberForm: {
      //   community_code: '',
      //   building_code: '',
      //   mer_id: 1,
      // },
      // height: 500,
    }
  },
  mounted() {
    // console.log(compute(996).add(997))
  },
  methods: {
    //获取日报列表
    // get_notice_list(num) {
    //   this.noticeForm.page = num || this.noticeForm.page
    //   const param = this.noticeForm
    //   get_notice_list(param)
    //     .then(res => {
    //       // console.log(res);
    //       this.tableData.data = res.data[0].items
    //       this.tableData.total = res.data[0].total
    //     })
    //     .catch(res => {})
    // },
    changeTitle() {
      this.noticeForm.title_like.title_like_like = '改变了'
      console.log(this)
    },
    changeATitle() {
      // this.arrayForm.title_like.title_like_like[0] = '改变了'
      this.arrayForm.title_like.title_like_like = ['改变了']
      console.log(this)
    }
  },
}
</script>

<style lang="scss">
::deep [type='reset'],
[type='submit'],
button,
html [type='button'] {
  -webkit-appearance: none !important;
}
//限制el-tooltop宽度
.el-tooltip__popper {
  max-width: 600px;
}
.notice {
  padding: 1em;
  .notice-title {
    font-size: 18px;
  }
  .notice-content {
    margin-top: 1.5em;
    font-size: 14px;
  }
}
</style>
