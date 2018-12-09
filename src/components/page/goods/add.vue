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
            <el-form-item label="供应商" prop="providerId">
                <el-select v-model="formData.providerId" placeholder="请选择供应商"
                           filterable clearable remote :remote-method="getProviderList">
                    <el-option
                            v-for="(provider,index) in providerList"
                            :value="provider.id" :key="index"
                            :label="provider.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="库存" prop="stock">
                <el-input v-model="formData.stock"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">保存</el-button>
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
                    name: [
                        {required: true, message: '请填写商品名称'}
                    ],
                    price: [
                        {required: true, message: '请填写商品价格'},
                        {
                            validator: (rule, value, callback) => {
                                if (value != "" && (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) == false) {
                                    callback(new Error("请填写有效价格"));
                                } else {
                                    callback();
                                }
                            },
                            trigger: 'change'
                        }
                    ],
                    unit: [
                        {required: true, message: '请指定单位'},
                        {min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur'}
                    ],
                    providerId: [
                        {required: true, message: '请选择供应商'},
                    ],
                    stock: [
                        {required: true, message: '请输入剩余库存'},
                        {
                            validator: (rule, value, callback) => {
                                if (value != "" && (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) == false) {
                                    callback(new Error("请填写大于0的数字"));
                                } else {
                                    callback();
                                }
                            },
                            trigger: 'change'
                        }
                    ]
                },
                formData: {},
                providerList: []
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
                    this.$axios.post("/goods", this.formData).then(res => {
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
                    this.$axios.patch("/goods", this.formData).then(res => {
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
                    this.$axios.get("/goods", {params: {id: this.id}}).then(res => {
                        this.formData = res.data;
                        this.$axios.get("/provider", {params: {id: res.data.providerId}}).then(res => {
                            this.providerList = [res.data];
                        });
                    });
                }
            },
            getProviderList(providerName) {
                this.$axios.get("/provider/list", {params: {search: {provider: providerName}}}).then(res => {
                    this.providerList = res.data.data;
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