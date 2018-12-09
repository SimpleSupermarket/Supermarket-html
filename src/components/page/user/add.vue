<template>
    <div class="add">
        <el-form :model="formData" :rules="rules"
                 ref="form" label-width="100px"
                 style="width: 33%">
            <el-form-item label="用户名登录名" prop="code">
                <el-input v-model="formData.code"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
                <el-input v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
                <el-input v-model="formData.rePassword"></el-input>
            </el-form-item>
            <el-form-item label="用户性别">
                <el-radio-group v-model="formData.gender">
                    <el-radio-button label="男"
                                     value="2"></el-radio-button>
                    <el-radio-button label="女"
                                     value="1"></el-radio-button>
                </el-radio-group>
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
                    <el-radio-button v-for="(role,index) in roles" :value="role.id" :label="role.name"
                                     :key="index"></el-radio-button>
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
                id: 0,
                rules: {
                    code: [
                        {required: true, message: '请输入用户登录名'},
                        {
                            validator: (rule, value, callback) => {
                                if (value == null || value ==undefined || value.length < 5) {
                                    callback(new Error("用户名无效，请重新输入"));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ], name: [
                        {required: true, message: '请输入姓名'},
                        {min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur'}
                    ], password: [
                        {required: true, message: '密码不可为空'},
                        {min: 5, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
                    ], rePassword: [
                        {
                            validator: (rule, value, callback) => {
                                if (value != this.formData.password) {
                                    callback(new Error("两次输入密码不一致"));
                                } else {
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ], gender: [
                        {required: true, message: '请选择性别'}
                    ], birthday: [
                        {required: true, message: '选择生日'}
                    ], phone: [
                        {required: true, message: '请输入电话号码'},
                        {
                            validator: (rule, value, callback) => {
                                if (value != "" && (/^1[34578]d{9}$/).test(value) == true) {
                                    callback();
                                } else if (value != "" && (/^8d{7}$/).test(value) == true) {
                                    callback();
                                } else {
                                    callback(new Error("电话号格式错误"));
                                }
                            },
                            trigger: 'change'
                        }
                    ],
                    roleId: [
                        {required: true, message: '请选择用户类型'}
                    ],
                },
                formData: {},
                roles:[]
            }
        },
        created() {
        },
        activated() {
            if (this.$route.path.indexOf("/update") > 1) {
                this.$route.query.id = this.id;
            } else {
                this.id = 0;
            }
            this.init();
        },
        methods: {
            submitForm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submissionServer();
                    } else {
                        return false;
                    }
                });
            },
            submissionServer() {
                if (this.id == 0) {
                    this.$axios.post("/user", this.formData).then(res => {
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
                    this.$axios.patch("/user", this.formData).then(res => {
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
                this.getGoodsList();
                //TODO初始化
                if (this.id != 0) {
                    this.$axios.get("/user", {params: {id: this.id}}).then(res => {
                        this.formData = res.data;
                    });
                }
            },
            getGoodsList(goodsName) {
                this.$axios.get("/role/list").then(res => {
                    this.roles = res.data.data;
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