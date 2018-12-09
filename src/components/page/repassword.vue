<template>
        <div class="add">
            <el-form :model="password" :rules="rules"
                     ref="form" label-width="150px"
                     style="width: 33%">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input v-model="password.oldPassword" type="password"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="password.newPassword" type="password"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="reNewPassword">
                    <el-input v-model="password.reNewPassword" type="password"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">保存</el-button>
                    <el-button type="primary" @click="$router.back()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
</template>

<script>
    export default {
        name: "repassword",
        data(){
            return{
                password: {
                    oldPassword: "",
                    newPassword: "",
                    reNewPassword: "",
                },
                rules:{
                    oldPassword:[ {required: true, message: '请输入原始密码'}],
                    newPassword: [
                        {required: true, message: '密码不可为空'},
                        {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
                    ],
                    reNewPassword: [
                        {
                            validator: (rule, value, callback) => {
                                if (value != this.password.newPassword) {
                                    callback(new Error("两次输入密码不一致"));
                                } else {
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        methods:{
            submitForm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.changepassword();
                    } else {
                        return false;
                    }
                });
            },
            changepassword(){
                this.$axios.post("/user/repassword",this.password).then(res =>{
                    if(res.data) {
                        this.$message({
                            message: '密码修改成功',
                            type: 'success'
                        });
                        this.$router.back();
                    }else{
                        this.$message({
                            message: '修改失败,密码不可修改',
                            type: 'error'
                        });
                    }

                })

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
