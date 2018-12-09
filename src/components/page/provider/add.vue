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
            <el-form-item label="描述" prop="desc">
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
                id: 0,
                rules: {
                    providerId: [
                        {required: true, message: '请输入供应商名称'},
                        {min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur'}
                    ],
                    contact: [
                        {required: true, message: '请输入联系人姓名'},
                        {min: 1, max: 25, message: '长度在 1 到 5 个字符', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入联系人电话'},
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
                    address:[
                        {required: true, message: '请输入地址'},
                    ],
                },
                formData: {}
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
                    this.$axios.post("/provider", this.formData).then(res => {
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
                    this.$axios.patch("/provider", this.formData).then(res => {
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
                    this.$axios.get("/provider", {params: {id: this.id}}).then(res => {
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