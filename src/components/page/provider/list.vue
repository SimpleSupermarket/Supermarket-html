<template>
    <div>
        <div class="search">
            <span>供应商名称：</span>
            <input type="text" placeholder="请输入供应商的名称"/>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="primary" class="add"
                       @click="$router.push('/provider/add')">添加商品
            </el-button>
        </div>
        <table class="providerTable" cellpadding="0" cellspacing="0">
            <tbody><tr class="firstTr">
                <th width="10%">供应商编码</th>
                <th width="20%">供应商名称</th>
                <th width="10%">联系人</th>
                <th width="10%">联系电话</th>
                <th width="10%">传真</th>
                <th width="10%">创建时间</th>
                <th width="30%">操作</th>
            </tr>
       <template  v-for="(provider,index) in list">
            <tr>
                <td>PRO-CODE—001</td>
                <td>测试供应商001</td>
                <td>韩露</td>
                <td>15918230478</td>
                <td>15918230478</td>
                <td>2015-11-12</td>
                <td>
                    <a href="javascript:void(0);" @click="updata(provider.id)"><img
                            src="/static/img/xiugai.png" alt="修改" title="修改"></a>
                    <a href="javascript:void(0);" @click="del(provider.id,index)">
                        <img src="/static/img/schu.png"
                             alt="删除" title="删除"></a>
                </td>
            </tr>
       </template>
            </tbody></table>

    </div>
</template>

<script>
    export default {
        name: "provider",
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
