<template>
    <div class="add">
        <el-form :model="formData" :rules="rules"
                 ref="form" label-width="100px"
                 style="width: 33%">
            <el-form-item label="登录名" prop="code">
                <el-input v-model="formData.code"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
                <el-input v-model="formData.password" type="password"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户性别">
                <el-radio-group v-model="formData.gender">
                    <el-radio-button label="2"
                                     value="2">男</el-radio-button>
                    <el-radio-button label="1"
                                     value="1">女</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
                <el-date-picker v-model="formData.birthday"></el-date-picker>
            </el-form-item>
            <el-form-item label="用户电话" prop="phone">
                <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item label="用户地址" prop="address">
                <el-input v-model="formData.address"></el-input>
            </el-form-item>
            <el-form-item label="用户类别" prop="roleId">
                <el-radio-group v-model="formData.roleId">
                    <el-radio-button v-for="(role,index) in roles" :value="role.id" :label="role.id"
                                     :key="index">{{role.name}}</el-radio-button>
                </el-radio-group>
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
        name: "goods_add",
        data() {
            return {
                id: 0,
                rules: {
                    code: [
                        {required: true, message: '请输入用户登录名'},
                        {
                            validator: (rule, value, callback) => {
                                if (value == null || value ==undefined || value.length < 3 ) {
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
                    ], gender: [
                        {required: true, message: '请选择性别'}
                    ], birthday: [
                        {required: true, message: '选择生日'}
                    ], phone: [
                        {
                            validator: (rule, value, callback) => {
                                console.log(value)
                                console.log((/^1[34578]d{9}$/).test(value))
                                if ( (/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/).test(value)) {
                                    callback();
                                } else if ( (/^0\d{2,3}-?\d{7,8}$/).test(value)) {
                                    callback();
                                } else {
                                    callback(new Error("电话号格式错误"));
                                }
                            },
                            trigger: 'blur'
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
                this.id = this.$route.query.id ;
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
                if (this.id && this.id != 0) {
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