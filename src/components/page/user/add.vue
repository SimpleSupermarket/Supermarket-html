<template>
    <div class="add">
        <el-form :model="formData" :rules="rules"
                 ref="form" label-width="100px"
                 style="width: 33%">
            <el-form-item label="用户编码" prop="userId"  >
                <el-input v-model="formData.userId"></el-input>
            </el-form-item>
            <el-form-item label="用户名称" prop="userName">
                <el-input v-model="formData.userName"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="userpassword">
                <el-input v-model="formData.userpassword" ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="userRemi">
                <el-input v-model="formData.userRemi"></el-input>
            </el-form-item>
            <el-form-item label="用户性别">
                <el-select v-model="formData.providerId" placeholder="供应商编号">
                    <el-option label="男"
                               value="man" key="man"></el-option>
                    <el-option label="女"
                               value="woman" key="woman"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="data">
                <el-input v-model="formData.data"></el-input>
            </el-form-item>
            <el-form-item label="用户电话" prop="userphone">
                <el-input v-model="formData.userphone"></el-input>
            </el-form-item>
            <el-form-item label="用户地址" prop="userAddress">
                <el-input v-model="formData.userAddress"></el-input>
            </el-form-item>
            <el-form-item label="用户类别" prop="userlei">
                <el-radio-group v-model="formData.userlei">
                    <el-radio-button value="1" label="管理员"></el-radio-button>
                    <el-radio-button value="2" label="经理"></el-radio-button>
                    <el-radio-button value="3" label="普通用户"></el-radio-button>
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
        name: "goods_add",
        data() {
            return {
                id:0,
                rules: {
                    userId: [
                        {required: true, message: '用户编码不能为空'}
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