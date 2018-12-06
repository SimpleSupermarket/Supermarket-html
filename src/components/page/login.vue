<template>
    <div class="login-wrap">
        <div class="ms-title">超市管理系统</div>
        <div class="ms-login">
            <el-form :model="form" :rules="rules" ref="form" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="form.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;color: red">{{messagee}}</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                messagee: '',
                form:{
                    username:'admin',
                    password:'1234567',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },

        methods:{
            submitForm(){
                let that = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let params = new URLSearchParams();
                        params.append('username', that.form.username);
                        params.append('password', that.form.password);
                        this.$axios.post("/login", params).then((res) => {
                            if (res.data) {
                                localStorage.setItem('ms_username', this.form.username);
                                this.$router.push('/');
                            } else {
                                that.messagee = "请检查用户名或密码"
                            }
                        }).catch((e) => {
                            that.messagee = "请检查用户名或密码"
                            console.log("登录异常")
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }

    }
</script>

<style scoped>
    .login-wrap {/*
        position: relative;*/
       /* width: 100%;*/
        height: 100%;
        width: 100%;
        margin: 0 0;
        background-attachment: fixed;
        background-repeat: repeat;
        background: url(/static/img/login_bg.jpg) 0 0 fixed ;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;

    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 160px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;

    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }
</style>
