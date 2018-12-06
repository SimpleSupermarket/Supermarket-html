<template>
    <div>
        <div class="search">
            <span>商品名称：</span>
            <input type="text" placeholder="请输入商品的名称" v-model="condition.search.goodsName">
            <el-button type="primary" icon="el-icon-search" @click="search(1)">查询</el-button>
            <el-button type="primary" class="add"
                       @click="$router.push('/goods/add')">添加商品
            </el-button>
        </div>

        <table class="providerTable" cellpadding="0" cellspacing="0" ref="smbms_table">
            <tbody>
            <tr class="firstTr">
                <th width="16%">商品编码</th>
                <th width="13%">商品名称</th>
                <th width="10%">价格</th>
                <th width="19%">供应商</th>
                <th width="10%">库存</th>
                <th width="17%">创建时间</th>
                <th width="15%">操作</th>
            </tr>
            <template v-for="(goods,index) in list">
                <tr>
                    <td>{{goods.code}}</td>
                    <td>{{goods.name}}</td>
                    <td>{{goods.price}}</td>
                    <td>{{goods.provider.name}}</td>
                    <td>{{goods.stock}} {{goods.unit}}</td>
                    <td>{{goods.creationdate}}</td>
                    <td>
                        <a href="javascript:void(0);" @click="updata(goods.id)"><img
                                src="/static/img/xiugai.png" alt="修改" title="修改"></a>
                        <a href="javascript:void(0);" @click="del(goods.id,index)">
                            <img src="/static/img/schu.png"
                                 alt="删除" title="删除"></a>
                    </td>
                </tr>
            </template>
            </tbody>
        </table>
        <div style="float: right">
            <el-pagination
                    background
                    @current-change="search"
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
    import { Loading } from 'element-ui';

    export default {
        name: "goods",
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
                this.$axios.get("/goods/list", {params:this.condition}).then(res => {
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
                    path: '/goods/update',
                    query: {
                        id: id
                    }
                })
            },
            del(id, index) {
                this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
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
