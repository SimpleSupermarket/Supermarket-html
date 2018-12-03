<template>
    <div class="add">
        <el-form :model="formData" :rules="rules"
                 ref="form" label-width="100px"
                 style="width: 33%">
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="单价" prop="price">
                <el-input v-model="formData.price"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
                <el-input v-model="formData.unit"></el-input>
            </el-form-item>
            <el-form-item label="供应商">
                <el-select v-model="formData.providerId" placeholder="供应商">
                    <el-option v-for="(provider,index) in providerList" :label="provider.name"
                               :value="provider.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="库存" prop="gstock">
                <el-input v-model="formData.gstock"></el-input>
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
        name: "goods_add",
        data() {
            return {
                id:0,
                rules: {
                    name: [
                        {required: true, message: '商品编号不能为空'}
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