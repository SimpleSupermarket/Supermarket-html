<template>
    <div class="add">
        <el-form :model="formData" :rules="rules"
                 ref="form" label-width="100px"
                 style="width: 33%">
            <el-form-item label="供应商名称" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contact">
                <el-input v-model="formData.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
                <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item label="联系地址" prop="address">
                <el-input v-model="formData.address"></el-input>
            </el-form-item>
            <el-form-item label="传真" prop="fax">
                <el-input v-model="formData.fax"></el-input>
            </el-form-item>
            <el-form-item label="描述"  prop="desc">
                <el-input type="textarea" v-model="formData.desc"></el-input>
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
                    providerId: [
                        {required: true, message: '供应商编号不能为空'}
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