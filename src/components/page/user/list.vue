<template>
    <div>

        <div class="search">
            <span>用户名：</span>
            <input type="text" placeholder="请输入用户名">
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="primary" class="add"
                       @click="$router.push('/user/add')">添加商品
            </el-button>
        </div>
        <!--用户-->
        <table class="providerTable" cellpadding="0" cellspacing="0">
            <tbody>
            <tr class="firstTr">
                <th width="10%">用户编码</th>
                <th width="20%">用户名称</th>
                <th width="10%">性别</th>
                <th width="10%">年龄</th>
                <th width="10%">电话</th>
                <th width="10%">用户类型</th>
                <th width="30%">操作</th>
            </tr>
            <template  v-for="(user,index) in list">
            <tr>
                <td>hanlu</td>
                <td>韩露</td>
                <td>女</td>
                <td>20</td>
                <td>15918230478</td>
                <td>经理</td>
                <td>
                    <a href="javascript:void(0);" @click="updata(user.id)"><img
                            src="/static/img/xiugai.png" alt="修改" title="修改"></a>
                    <a href="javascript:void(0);" @click="del(user.id,index)">
                        <img src="/static/img/schu.png"
                             alt="删除" title="删除"></a>
                </td>
            </tr>
            </template>
            </tbody>
        </table>

    </div>
</template>

<script>
    export default {
        name: "user",
        data() {
            return {
                list: [
                    {
                        id: 1,
                    }, {
                        id: 2,
                    }
                ]
            }
        },
        methods: {
            updata(id) {
                this.$router.push({
                    path: '/user/update',
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
