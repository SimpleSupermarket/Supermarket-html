<template>
    <div >
        <div class="providerAdd">
            <form action="#">
                <!--div的class 为error是验证错误，ok是验证成功-->
                <div class="">
                    <label for="oldPassword">旧密码：</label>
                    <input type="password" name="oldPassword" id="oldPassword" required="">
                    <span>*请输入原密码</span>
                </div>
                <div>
                    <label for="newPassword">新密码：</label>
                    <input type="password" name="newPassword" id="newPassword" required="">
                    <span>*请输入新密码</span>
                </div>
                <div>
                    <label for="reNewPassword">确认新密码：</label>
                    <input type="password" name="reNewPassword" id="reNewPassword" required="">
                    <span>*请输入新确认密码，保证和新密码一致</span>
                </div>
                <div class="providerAddBtn">
                    <!--<a href="#">保存</a>-->
                    <input type="button" value="保存" onclick="submit()">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "repassword",
        methods:{
            submit(){
                this.$message({
                    message: '修改失败,密码不可修改',
                    type: 'error'
                });
                this.$router.back();
            }
        }
    }
</script>

<style scoped>

</style>
