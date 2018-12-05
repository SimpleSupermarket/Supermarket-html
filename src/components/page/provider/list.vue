<template>
    <div>
        <div class="search">
            <span>供应商名称：</span>
            <input type="text" placeholder="请输入供应商的名称"/>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="primary" class="add"
                       @click="$router.push('/provider/add')">添加供应商
            </el-button>
        </div>
        <table class="providerTable" cellpadding="0" cellspacing="0" ref="smbms_table">
            <tbody>
            <tr class="firstTr">
                <th width="10%">供应商编码</th>
                <th width="20%">供应商名称</th>
                <th width="10%">联系人</th>
                <th width="10%">联系电话</th>
                <th width="10%">传真</th>
                <th width="10%">创建时间</th>
                <th width="30%">操作</th>
            </tr>
            <template v-for="(provider,index) in list">
                <tr>
                    <td>{{provider.code}}</td>
                    <td>{{provider.name}}</td>
                    <td>{{provider.contact}}</td>
                    <td>{{provider.phone}}</td>
                    <td>{{provider.fax}}</td>
                    <td>{{provider.creationdate}}</td>
                    <td>
                        <a href="javascript:void(0);" @click="updata(provider.id)"><img
                                src="/static/img/xiugai.png" alt="修改" title="修改"></a>
                        <a href="javascript:void(0);" @click="del(provider.id,index)">
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
        name: "provider",
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
                this.$axios.get("/provider/list", this.condition).then(res => {
                    this.list = res.data.data;
                    loadingTableData.close();
                })
            },
            updata(id) {
                this.$router.push({
                    path: '/provider/update',
                    query: {
                        id: id
                    }
                })
            },
            del(id, index) {
                this.$confirm('此操作将永久删除该供应商, 是否继续?', '提示', {
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
