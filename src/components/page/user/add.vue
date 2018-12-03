<template>
    <div class="add">
        <el-form :model="formData" :rules="rules"
                 ref="form" label-width="100px"
                 style="width: 33%">
            <el-form-item label="用户名" prop="code"  >
                <el-input v-model="formData.userId"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.userName"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
                <el-input v-model="formData.password" ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
                <el-input v-model="formData.rePassword"></el-input>
            </el-form-item>
            <el-form-item label="用户性别">
                <el-select v-model="formData.gender" placeholder="供应商编号">
                    <el-option label="男"
                               value="2" key="man"></el-option>
                    <el-option label="女"
                               value="1" key="woman"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
                <el-input v-model="formData.birthday"></el-input>
            </el-form-item>
            <el-form-item label="用户电话" prop="phone">
                <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item label="用户地址" prop="address">
                <el-input v-model="formData.address"></el-input>
            </el-form-item>
            <el-form-item label="用户类别" prop="roleId">
                <el-radio-group v-model="formData.roleId">
                    <el-radio-button v-for="(role,index) in roles" :value="role.id" :label="role.name" :key="index"></el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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