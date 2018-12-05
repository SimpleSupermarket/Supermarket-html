<template>
    <div>
        <div class="search">
            <span>商品名称：</span>
            <input type="text" placeholder="请输入商品的名称"/>
            <span>供应商：</span>
            <select name="tigong">
                <option value="">--请选择--</option>
                <option value="">北京市粮油总公司</option>
                <option value="">邯郸市五得利面粉厂</option>
            </select>

            <span>是否付款：</span>
            <select name="fukuan">
                <option value="">--请选择--</option>
                <option value="">已付款</option>
                <option value="">未付款</option>
            </select>

            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="primary" class="add"
                       @click="$router.push('/bill/add')">添加商品
            </el-button>
        </div>

        <table class="providerTable" cellpadding="0" cellspacing="0" ref="smbms_table">
            <tr class="firstTr">
                <th width="10%">账单编码</th>
                <th width="20%">商品名称</th>
                <th width="10%">商品数量</th>
                <th width="10%">账单金额</th>
                <th width="10%">是否付款</th>
                <th width="10%">创建时间</th>
                <th width="30%">操作</th>
            </tr>
            <template v-for="(bill,index) in list">
                <tr>
                    <td>{{bill.code}}</td>
                    <td>{{bill.goodsName}}</td>
                    <td>{{bill.goodsCount}}</td>
                    <td>{{bill.totalPrice}}</td>
                    <td>{{bill.isPayment}}</td>
                    <td>{{bill.creationDate}}</td>
                    <td>
                        <a href="javascript:void(0);" @click="updata(bill.id)"><img
                                src="/static/img/xiugai.png" alt="修改" title="修改"></a>
                        <a href="javascript:void(0);" @click="del(bill.id,index)">
                            <img src="/static/img/schu.png"
                                 alt="删除" title="删除"></a>
                    </td>
                </tr>
            </template>
        </table>
        <div style="float: right">
            <el-pagination
                    background
                    :page-size="condition.pageSize"
                    :page-count="condition.sumPage"
                    :current-page="condition.currPage"
                    layout="prev, pager, next"
                    :total="condition.count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {Loading} from 'element-ui';

    export default {
        name: "bill",
        data() {
            return {
                list: [],
                condition: {
                    pageSize: 0, //每页大小
                    sumPage: 0,  //总页数
                    currPage: 0, //当前页
                    count: 0    //总记录数
                }
            }
        },
        activated() {
            this.search();
        },
        methods: {
            search() {
                let table = this.$refs['smbms_table'];
                let loadingTableData = Loading.service({target: table});
                this.$axios.get("/bill/list", this.condition).then(res => {
                    this.list = res.data.data;
                    loadingTableData.close();
                })
            },
            updata(id) {
                this.$router.push({
                    path: '/bill/update',
                    query: {
                        id: id
                    }
                })
            },
            del(id, index) {
                this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
