<template>
    <div>
        <div class="publicHeader">
            <h1>超市账单管理系统</h1>
            <div class="publicHeaderR">
                <p><span>{{hello}}，</span><span style="color: #fff21b"> {{username}}</span> , 欢迎你！</p>
                <el-button class="btnn" @click="logout">退出</el-button>
            </div>
        </div>
        <section class="publicTime">
            <span>{{timeStr}}</span>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: localStorage.getItem('ms_username'),
                timeStr: '',
                hello:'哈啰',
            }
        },
        created() {
            setInterval(this.time, 1000);
        },
        methods: {
            logout() {
                //TODO退出登录
                localStorage.removeItem('ms_username');
                this.$router.push("/login");
            },
            time() {
                let time = new Date();
                let str = "";
                let year = time.getFullYear();
                let mon = time.getMonth() + 1;
                let day = time.getDate();
                let h = time.getHours();
                let m = time.getMinutes();
                let s = time.getSeconds();
                let week = time.getDay();
                switch (week) {
                    case 0:
                        week = "日";
                        break;
                    case 1:
                        week = "一";
                        break;
                    case 2:
                        week = "二";
                        break;
                    case 3:
                        week = "三";
                        break;
                    case 4:
                        week = "四";
                        break;
                    case 5:
                        week = "五";
                        break;
                    case 6:
                        week = "六";
                        break;
                }
                str = year + "年" + this.totwo(mon) + "月" +
                    this.totwo(day) + "日" + "  " + this.totwo(h) + ":" + this.totwo(m) + ":" +
                    this.totwo(s) + "  " + "星期" + week;
                this.timeStr = str;
                this.setHello(h);
            },
            setHello(h){
                if(h<5){
                    this.hello = "凌晨好";
                    return;
                }
                if(h < 11){
                    this.hello = "早上好";
                    return;
                }
                if(h < 14){
                    this.hello = "中午好";
                    return;
                }
                if(h < 19){
                    this.hello = "下午好";
                    return;
                }
                if(h < 24){
                    this.hello = "晚上好";
                    return;
                }
            },
            totwo(n) {
                if (n <= 9) {
                    return n = "0" + n;
                }
                else {
                    return n = "" + n;
                }
            }
        }
    }
</script>

<style scoped>
    .btnn {
        border: 1px solid #679e43;
        background: linear-gradient(to bottom, #baf076, #a2d866, #9cd055, #8dc838, #8bc93a);
        border-radius: 4px;
        font-weight: bold;
        color: #fff;
    }
</style>
