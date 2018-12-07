<template>
    <div class="add">
        <el-form :model="formData" :rules="rules"
                 ref="form" label-width="100px"
                 style="width: 33%">
            <el-form-item label="商品">
                <el-select v-model="formData.goodsId" placeholder="请选择商品"
                           filterable  clearable remote :remote-method="getGoodsList">
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
                    <el-radio-button value="2" label="已付款"></el-radio-button>
                    <el-radio-button value="1" label="未付款"></el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
                id:0,
                rules: {
                    billName: [
                        {required: true, message: '订单号不能为空'}
                    ]
                },
                formData: {},
                providerList: [{
                    name: '阿里',
                    id: 1
                }, {
                    name: '腾讯',
                    id: 2
                }]
            }
        },
        created(){
        },
        activated() {
            if(this.$route.path.indexOf("/update")>1){
                this.$route.query.id = this.id;
            }else{
                this.id = 0;
            }
            this.init();
        },
        methods: {
            init(){
                //TODO初始化
                if(this.id != 0){
                    this.$axios.get("").then(res=>{
                        this.formData = res.data;
                    });
                }
            },
            getGoodsList(goodsName){
                this.$axios.get("/goods/list", {params: {search:{goodsName:goodsName}}}).then(res => {
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



