<template>
	<!--通告管理  -->
	<div class="notice">
		<el-card>
			<div slot="header" class="clearfix">
				<!-- s搜索区 -->
				<div class="container">
					<el-form inline size="small" :label-position="labelPosition">
						<el-form-item label="所属小区">
							<el-select v-model="tableShow" multiple placeholder="请选择" class="selWidth" @change="showTableArr()">
								<el-option v-for="item in table" :key="item.label" :disabled="item.disabled" :label="item.label" :value="item" />
							</el-select>
						</el-form-item>

						<el-form-item label="通告标题：" style="display: inline-block">
							<el-input v-model="noticeForm.title_like" placeholder="通告标题" clearable />
						</el-form-item>

						<el-button type="primary" label="default" size="small" @click="get_notice_list(noticeForm.page)">查询</el-button>
					</el-form>
				</div>
				<!-- e搜索区 -->

				<el-button type="primary" label="default" size="small" @click="addVisible = true">新增通告</el-button>
			</div>

			<!-- s表格 -->
			<el-table ref="excelExport" :data="tableData.data" style="width: 100%" size="small" highlight-current-row>
				<!--        用于数组形式-->
				<!--        <el-table-column v-for="item in tableShow" :prop="item.value" :label="item.label">-->
				<!--          <template v-slot="scope">-->
				<!--            <div v-if="!item.index">{{ scope.row[item.value] }}</div>-->
				<!--            <div v-else>-->
				<!--              {{ getValue(item,scope.row) }}-->
				<!--            </div>-->
				<!--          </template>-->
				<!--        </el-table-column>-->

				<!--            用于对象形式-->
				<el-table-column v-for="(column, index) in tableShow" :key="index" :prop="column.value" :label="column.label">
					<template v-slot="scope">
						<div v-if="!column.index">{{ scope.row[column.value] }}</div>
						<div v-else>
							{{ table[column.value].index[scope.row[column.value]] }}
						</div>
					</template>
				</el-table-column>

				<!--        <el-table-column prop="id" label="ID" width="50" />-->

				<!--        <el-table-column prop="title" label="通告标题" min-width="100" :show-overflow-tooltip='true' />-->

				<!--        <el-table-column prop="content" label="通告内容" min-width="100" :show-overflow-tooltip='true' />-->

				<!--        <el-table-column prop="create_time" label="发布时间" width="135" />-->

				<el-table-column label="操作" width="50" fixed="right" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" class="mr10" @click="open_detail(scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div class="fr">
				<el-pagination
					:page-sizes="[10, 20, 40, 60, 80]"
					:page-size="noticeForm.limit"
					:current-page="noticeForm.page"
					layout="total, sizes, prev, pager, next, jumper"
					:total="tableData.total"
					@size-change="handle_size_change"
					@current-change="page_change"
				/>
			</div>
			<!-- e表格 -->

			<!-- s通告详情对话框 -->
			<el-dialog title="通告详情" :visible.sync="detailVisible" width="50%">
				<div class="notice-title">{{ detail.title }}</div>
				<div class="notice-content">{{ detail.content }}</div>
				<span slot="footer" class="dialog-footer">
					<el-button size="mini" type="primary" @click="detailVisible = false">关 闭</el-button>
				</span>
			</el-dialog>
			<!-- e通告详情对话框 -->

			<!-- s新增通告对话框 -->
			<el-dialog title="新增通告" :visible.sync="addVisible" width="50%">
				<el-form ref="addForm" :model="addForm" :rules="addRules">
					<el-form-item label="通告标题" :label-width="formLabelWidth" prop="title">
						<el-input v-model="addForm.title" autocomplete="off" placeholder="请输入通告标题" />
					</el-form-item>

					<el-form-item label="通告内容" :label-width="formLabelWidth" prop="content">
						<el-input v-model="addForm.content" autocomplete="off" placeholder="请输入通告内容" type="textarea" :rows="15" />
					</el-form-item>

					<el-form-item label="通告对象" :label-width="formLabelWidth">
						<el-button size="small" type="primary" @click="memberVisible = true">点击选择</el-button>
						<el-tag v-if="addForm.member_id_list.length == 0" style="margin-left: 1em" type="info">暂未选择</el-tag>
						<el-tag v-else style="margin-left: 1em" type="success">已选择</el-tag>
					</el-form-item>
				</el-form>

				<span slot="footer" class="dialog-footer">
					<el-button size="small" type="primary" @click="add_notice('addForm')">确 认</el-button>
				</span>
			</el-dialog>
			<!-- e新增通告对话框 -->

			<el-dialog title="选择通告对象" :visible.sync="memberVisible" width="70%">
				<el-form ref="memberForm" :model="memberForm">
					<el-form-item label="所属小区" prop="community_code">
						<el-select v-model="memberForm.community_code" clearable placeholder="请选择" class="selWidth" @change="change_building('memberForm')">
							<el-option v-for="(item, index) in community_list" :key="index" :label="item.name" :value="item.code" />
						</el-select>
					</el-form-item>

					<el-form-item label="所属栋数" prop="building_code">
						<el-select v-model="memberForm.building_code" :disabled="build_disabled" clearable placeholder="请选择" class="selWidth" @change="get_all_house()">
							<el-option v-for="(item, index) in build_list" :key="index" :label="item.name" :value="item.code" />
						</el-select>
					</el-form-item>
				</el-form>

				<ux-grid
					ref="plxTable"
					:height="height"
					:checkbox-config="{ checkMethod: selectable, highlight: true }"
					show-header-overflow="ellipsis"
					@selection-change="selectionChange"
					@table-body-scroll="scroll"
				>
					<ux-table-column type="checkbox" width="50" />

					<ux-table-column title="小区名称" field="community_code__name" min-width="100" />

					<ux-table-column title="栋数" field="building_code__name" min-width="100" />

					<ux-table-column title="房产号" field="name" min-width="100" />

					<ux-table-column title="业主姓名" field="m_id__username" min-width="100" />

					<ux-table-column title="业主联系方式" field="m_id__mobile" min-width="100" />
				</ux-grid>

				<span slot="footer" class="dialog-footer">
					<el-button size="small" type="primary" @click="memberVisible = false">确 认</el-button>
				</span>
			</el-dialog>
		</el-card>

		<el-card>
			<!--			<el-button size="small" type="danger" @click="exportExcel(tableData)">用js-xlsx导出Excel</el-button>-->
			<!--			<el-button size="small" type="danger" @click="exportXlsxPopulate(tableData)">用xlsx-populate导出Excel</el-button>-->
			<el-button size="small" type="danger" @click="exportGlobalExcel(tableData)">用前端全局方法自动导出Excel</el-button>
			<el-button size="small" type="warning" @click="generateExcel()">后端生成excel</el-button>
			<el-button size="small" type="warning" @click="postMsg()"> 推送</el-button>
		</el-card>

		<!--    <el-button v-for="item in table">{{ item.label }}</el-button>-->
	</div>
</template>

<script>
// import { get_notice_list, add_notice, generate_excel, PostMsg } from '@/api/property/notice'
// import { get_all_house, get_all_building } from '@/api/property/property'
// import { get_community_list } from '@/api/property/community'
import { get_notice_list, add_notice, generate_excel, PostMsg } from '../api/property/notice'
import { get_all_house, get_all_building } from '../api/property/property'
import { get_community_list } from '../api/property/community'
// import localStorage from '@/utils/localStorage'
// import XlsxPopulate from 'xlsx-populate'
// import XLSX from 'xlsx'
import exportXlsxPopulate from './export-table'
export default {
	name: 'notice',
	data() {
		return {
			// 表格显示的形式(数组形式)
			tableShow: [
				{
					value: 'id',
					label: 'ID', // 自写的
					disabled: true,
					index: ['运维', '开发', '运维', '开发', '运维', '开发', 'hhh', '开发']
				},
				{
					value: 'title',
					label: '通告标题',
					disabled: true
				}
			],

			// 表格显示的形式(对象形式)
			// ableShow: {
			// 	id: {
			// 		value: 'id',
			// 		label: 'ID',
			// 		disabled: true,
			// 		index: ['运维', '开发', '运维', '开发', '运维', '开发', 'hhh', '开发']
			// 	},
			// 	title: {
			// 		value: 'title',
			// 		label: '通告标题',
			// 		disabled: true
			// 	}
			// },

			// 表格配置对象形式
			table: {
				id: {
					value: 'id',
					label: 'ID',
					disabled: true,
					index: {
						6: '运维',
						9: '开发'
					}
				},
				title: {
					value: 'title',
					label: '通告标题',
					disabled: true
				},
				content: {
					value: 'content',
					label: '通告内容',
					default: false
				},
				create_time: {
					value: 'create_time',
					label: '发布时间',
					default: false
				}
			},

			// 表格配置config数组形式
			// table:[
			//   {
			//     value: 'id',
			//     label: 'ID',
			//     disabled: true,
			//     index: {
			//      '6': "运维",
			//       1: "开发"
			//     }
			//   },
			//   {
			//     value: 'title',
			//     label: '通告标题',
			//     disabled: true,
			//   },
			//   {
			//     value: 'content',
			//     label: '通告内容',
			//     disabled: false,
			//   },
			//   {
			//     value: 'create_time',
			//     label: '发布时间',
			//     disabled: false,
			//   }
			// ],

			noticeForm: {
				title_like: '',
				page: 1,
				limit: 20,
				mer_id: 1
			},
			tableData: {
				data: [],
				total: 0
			},
			formLabelWidth: '120px',
			labelPosition: 'right',

			// 详情对话框
			detailVisible: false,
			detail: {},

			// 新增通告
			addVisible: false,
			addForm: {
				member_id_list: [],
				title: '',
				content: '',
				mer_id: 1
			},
			addRules: {
				title: [
					{
						required: true,
						message: '通告标题不能为空',
						change: 'blue'
					}
				],
				content: [
					{
						required: true,
						message: '通告内容不能为空',
						change: 'blue'
					}
				]
				// member_id_list: [{ required: true, message: '通知对象不能为空', change: 'blue' }],
			},

			// 添加通告人员对话框
			memberVisible: false,
			community_list: [],
			build_list: [],
			build_disabled: false,
			memberForm: {
				community_code: '',
				building_code: '',
				mer_id: 1
			},
			// houses: [],

			height: 500
			// columns: [],
		}
	},
	mounted() {
		// this.get_all_house();
		// this.height = 500 // 动态设置高度
		this.get_community_list()
		this.get_notice_list()
	},
	methods: {
		postMsg() {
			const params = {
				badge: '+2',
				channel: {
					xm: {},
					vivo: {},
					oppo: {},
					hw: {}
				},
				push_clientid: [ 'b219bf86afa92970fc5b0ce8c74da15a' ],
				platform: 'ALL',
				force_notification: true,
				request_id: 'm7HIZ80hrMpFHuE8',
				sound: '',
				content: '4545455111145dddd',
				payload: {
					user_id: 'b219bf86afa92970fc5b0ce8c74da15a',
					content: 'fefeffefe'
				},
				content_available: '0',
				appId: '__UNI__D9D2A53',
				options: '',
				title: '56489ffff'
			}
			PostMsg(params)
				.then((res) => {
					console.warn(res)
				})
				.catch((err) => {
					console.error(err)
				})
		},
		// 根据当前表格行的item与键值（用于数组形式）
		getValue(item, row) {
			const key = item.value
			// console.warn(row[key])
			let result = ''
			this.table.forEach((column) => {
				if (column.value === key) {
					console.log(column.index[row[key]])
					result = column.index[row[key]]
				}
			})
			return result
		},

		showTableArr() {
			console.log(this.tableShow)
		},
		generateExcel() {
			generate_excel()
				.then((res) => {
					// console.log(res.data.items)
					window.open(res.data.items, '_blank')
					// this.$message({
					//   type: 'success',
					//   message: '导出成功',
					// })
				})
				.catch((err) => {
					// window.open(err.data,'_blank')
					this.$message({
						type: 'error',
						message: '导出失败'
					})
				})
		},

		// 用前端全局方法自动导出excel
		exportGlobalExcel(tableData) {
			exportXlsxPopulate(tableData, '日报信息记录表', this)
		},

		// 获取通告列表
		get_notice_list(num) {
			this.noticeForm.page = num || this.noticeForm.page
			const param = this.noticeForm
			get_notice_list(param)
				.then((res) => {
					console.log(res)
					this.tableData.data = res.data[0].items
					this.tableData.total = res.data[0].total
				})
				.catch((res) => {})
		},

		// 分页
		page_change(page) {
			this.noticeForm.page = page
			this.get_notice_list('')
		},

		handle_size_change(val) {
			this.noticeForm.limit = val
			this.get_notice_list('')
		},

		// 查看通告详情
		open_detail(e) {
			this.detailVisible = true
			this.detail = e
		},

		// 获取小区信息
		get_community_list() {
			get_community_list({
				name_like: '',
				limit: '',
				status: 1,
				mer_id: 1
			})
				.then((res) => {
					// console.log(res);
					this.community_list = res.data[0].items
				})
				.catch((err) => {
					this.$message.error(err.data.data)
				})
		},

		// 更换小区
		async change_building(data) {
			this.memberForm.building_code = ''
			if (this.memberForm.community_code !== '' && this.memberForm.community_code) {
				await this.get_building_list(data)
				this.get_all_house(data)
				this.build_disabled = false
			} else {
				this.build_disabled = true
			}
		},

		// 获取栋数
		async get_building_list(data) {
			await get_all_building(this[data])
				.then((res) => {
					// console.log(res)
					this.build_list = res.data[0].items
					// this.memberForm.building_code = res.data[0].items.code
					// this.memberForm.building_code = 'BD1000000000001'
					// this.memberForm.community_code = res.data[0].items[0].community_code
				})
				.catch((err) => {
					this.$message.error(err.data)
				})
		},

		// 获取某小区所有人员
		get_all_house() {
			get_all_house(this.memberForm)
				.then((res) => {
					// console.log(res)
					this.$refs.plxTable.reloadData(res.data)
				})
				.catch((err) => {
					this.$message.error(err.data)
				})
		},

		// 添加通告
		add_notice(formName) {
			this.$refs[formName].validate((valid) => {
				// 若必填项不为空
				if (valid) {
					if (this.addForm.member_id_list.length === 0) {
						this.$message.error('请先选择通告对象')
						return
					}
					add_notice(this.addForm)
						.then((res) => {
							this.addVisible = false
							this.$message.success('添加成功！')
							this.$refs.addForm.resetFields()
							this.addForm.member_id_list = []
							this.$refs.memberForm.resetFields()
							this.$refs.plxTable.reloadData([])

							this.get_notice_list()
						})
						.catch((err) => {
							this.$message.error(err.data.data)
						})
				} else {
					return false
				}
			})
		},

		// 滚动时赋值顶部坐标
		scroll({ scrollTop, scrollLeft }) {
			this.scrollTop = scrollTop
		},

		selectable({ row }) {
			return row.id !== 2
		},

		// 选中的行
		selectionChange(row) {
			console.log(row)
			// 修复bug： 当选中的行数量大于1时，取消选中的行，会出现重复的选中的行
			this.addForm.member_id_list = []
			if (row.length !== 0) {
				row.forEach((item) => {
					this.addForm.member_id_list.push(item.m_id)
				})
			} else {
				this.addForm.member_id_list = []
			}
		}
	}
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
