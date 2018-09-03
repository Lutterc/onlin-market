<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <el-input v-model.trim="name" placeholder="请输入用户名"></el-input>
                        <br>
                        <br>
                        <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
                        <br>
                        <br>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit"  @click="login"  value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'login',
    data: function () {
        return {
            //    需要的数据
            name: "",
            password: ""
        }
    },
    // 事件的方法
    methods:{
         login(){//登录的方法
            // 设置进度条的颜色 尺寸
      this.$Loading.config({
        color: "yellow",
        failedColor: "hotpink",
        height: 10
      });
      // 显示进度条
      this.$Loading.start();
        //  点击登录调用方法直接发送请求--同时传入参数,看是否是登录状态
           this.$axios.post('/site/account/login',{
               user_name: this.name,
               password: this.password
           }).then(response=>{
                    // console.log(response);
                    // 但是这个时候axios是不能带着cookie值得,也就是说虽然登录成功但是重新点击结算并不能继续跳转到下单页面
                    // 需要用到跨域解决不能携带证书的问题axios.defaults.withCredentials = true
         if (response.data.status == 0) {
            // 修改Vuex中的数据
            // 提交载荷
            this.$store.commit("changeLoginStatus", true);
            // 跳转回你来时的页面
             this.$router.push(this.$store.state.fromPath);
          }
             //   关闭进度条
            this.$Loading.finish();
           })
         }
    }
}
</script>
<style>
</style>

