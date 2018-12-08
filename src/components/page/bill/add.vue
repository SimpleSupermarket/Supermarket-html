<template>
    <div class="add">
        <el-form :model="formData" :rules="rules"
                 ref="form" label-width="100px"
                 style="width: 33%">
            <el-form-item label="商品">
                <el-select v-model="formData.goodsId" placeholder="请选择商品"
                           filterable clearable remote :remote-method="getGoodsList">
                    <el-option
                            v-for="(goods,index) in goodsList"
                            :value="goods.id" :key="index"
                            :label="goods.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品数量" prop="goodsCount">
                <el-input v-model="formData.goodsCount"></el-input>
            </el-form-item>
            <el-form-item label="订单金额" prop="totalPrice">
                <el-input v-model="formData.totalPrice"></el-input>
            </el-form-item>
            <el-form-item label="是否付款" prop="isPayment">
                <el-radio-group v-model="formData.isPayment">
                    <el-radio-button label="2">已付款</el-radio-button>
                    <el-radio-button label="1">未付款</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">保存</el-button>
                <!--  <el-button @click="resetForm('ruleForm')">重置</el-button>-->
                <el-button type="primary" @click="$router.back()">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "bill_add",
        data() {
            return {
                id: 0,
                rules: {
                    billName: [
                        {required: true, message: '订单号不能为空'}
                    ]
                },
                formData: {},
                goodsList: []
            }
        },
        created() {
        },
        activated() {

            if (this.$route.path.indexOf("/update") > 1) {
                this.id = this.$route.query.id;
                this.init();
            } else {
                this.id = 0;
            }

        },
        methods: {
            submitForm() {
                if (this.id == 0) {
                    this.$axios.post("/bill", this.formData).then(res => {
                        if (res.data) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.$router.back();
                        } else {
                            this.$message({
                                message: '添加失败',
                                type: 'error'
                            });
                        }
                    });
                } else {
                    this.$axios.patch("/bill", this.formData).then(res => {
                        if (res.data) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$router.back();
                        } else {
                            this.$message({
                                message: '修改失败',
                                type: 'error'
                            });
                        }
                    });
                }
            },
            init() {
                //TODO初始化
                if (this.id != 0) {
                    this.$axios.get("/bill", {params: {id: this.id}}).then(res => {
                        this.formData = res.data;
                        this.$axios.get("/goods", {params: {id: res.data.goodsId}}).then(res => {
                            this.goodsList = [res.data];
                        });
                    });
                }
            },
            getGoodsList(goodsName) {
                this.$axios.get("/goods/list", {params: {search: {goodsName: goodsName}}}).then(res => {
                    this.goodsList = res.data.data;
                });
            }
        }
    }
</script>

<style scoped>
    .add {
        border: 1px solid #9ac70f;
        padding: 20px;
        margin: 20px;
    }
</style>



