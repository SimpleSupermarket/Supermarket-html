<template>
    <div>
        <div class="search">
            <span>商品名称：</span>
            <input type="text" placeholder="请输入商品的名称" v-model="condition.search.goodsName"/>
            <span>供应商：</span>
            <select name="tigong" v-model="condition.search.provider">
                <option value="">--请选择--</option>
                <option value="">北京市粮油总公司</option>
                <option value="">邯郸市五得利面粉厂</option>
            </select>

            <span>是否付款：</span>
            <select name="fukuan" v-model="condition.search.isPayment" >
                <option value="">--请选择--</option>
                <option value="2">已付款</option>
                <option value="1">未付款</option>
            </select>

            <el-button type="primary" icon="el-icon-search" @click="search(1)">查询</el-button>
            <el-button type="primary" class="add"
                       @click="$router.push('/bill/add')">添加商品
            </el-button>
        </div>

        <table class="providerTable" cellpadding="0" cellspacing="0" ref="smbms_table">
            <tr class="firstTr">
                <th width="15%">账单编码</th>
                <th width="15%">商品名称</th>
                <th width="10%">商品数量</th>
                <th width="10%">账单金额</th>
                <th width="10%">是否付款</th>
                <th width="10%">创建时间</th>
                <th width="10%">创建者</th>
                <th width="20%">操作</th>
            </tr>
            <template v-for="(bill,index) in list">
                <tr>
                    <td>{{bill.code}}</td>
                    <td>{{bill.goods.name}}</td>
                    <td>{{bill.goodscount}}</td>
                    <td>{{bill.totalprice}}</td>
                    <td>{{bill.ispayment}}</td>
                    <td>{{bill.createdby.name}}</td>
                    <td>{{bill.creationdate}}</td>
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
                    @current-change="search"
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
                    count: 0,    //总记录数
                    search: {}
                }
            }
        },
        activated() {
            this.search();
        },
        methods: {
            search(page) {
                if(page){
                    this.condition.currPage = page;
                }
                let table = this.$refs['smbms_table'];
                let loadingTableData = Loading.service({target: table});
                this.$axios.get("/bill/list", {params:this.condition}).then(res => {
                    if(res.data) {
                        this.list = res.data.data;
                        this.condition.pageSize = res.data.pageSize;
                        this.condition.count = res.data.count;
                        this.condition.sumPage = res.data.sumPage;
                        this.condition.currPage = res.data.currPage;
                    }
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
