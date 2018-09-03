<template>
<div class="center">
            <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="goodsinfo routeanimate">
                            <div class="section">
                                <div class="location">
                                    <span>当前位置：</span>
                                    <router-link to="/index"> 首页&gt;</router-link>
                                    <a href="javascript:;">支付中心</a>
                                </div>
                            </div>
                            <div class="section">
                                <div class="wrapper">
                                    <div class="bg-wrap">
                                        <div class="nav-tit pay">
                                            <a href="javascript:;" class="selected">支付中心</a>
                                        </div>
                                        <div class="msg-tips">
                                            <div class="icon">
                                                <i class="iconfont icon-check"></i>
                                            </div>
                                          <div class="info">
                                            <strong>订单已支付成功！</strong><span><span style='color:yellowgreen;font-size:30px'>{{time}}</span>秒后去订单详情页</span>
                                            <p>您可以点击这里进入
                                                <router-link to="/vipCenter" style="font-size:30px">会员中心</router-link>
                                                查看订单状态！</p>
                                            <p>如有其它问题，请立即与我们客服人员联系。</p>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
</template>
<script>
export default {
    name:"PaySuccess",
    data:function(){
        return{
            time:5 //给一个跳转的时间  调后跳转到个人中心的页面
        }
    }  ,
    // 因为要写在页面加载完全 用生命周期函数中的mounted
    mounted(){
        let interId=setInterval(()=>{
              this.time--;
            //   当时间等于0的时候
            if(this.time==0){
                   //   清除定时器
            clearInterval(interId)
            // 跳转到个人中心的页面
            this.$router.push('/VipCenter')
            // this.$router.push('/orderDetail/'+this.$route.params.id)
            // 路径的跳转在router中
            // id是存在route中   这个记住记住记住就行
            }          
        },1000)
    }
}
</script>
<style>

</style>


