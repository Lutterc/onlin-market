<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-show="message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 商品列表需要自己写的 -->
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="gray">
                                        </el-switch>
                                    </td>
                                    <td><img :src="item.img_url" alt="" style="width:50px;height:50px"></td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <!-- 动态创建的 需要:绑定才可以继续累加和累减 -->
                                    <td>
                                        <el-input-number size="mini" :min="1" v-model="item.buycount" @change="numChange($event,item.id)"></el-input-number>
                                    </td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td>
                                        <el-button type="danger" @click="deleteGoods(item.id)" icon="el-icon-delete" circle></el-button>
                                    </td>
                                </tr>

                                <tr>

                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                                <button class="button" >继续购物</button>
                            </router-link>
                            <button class="submit" @click="checkAndSubmit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    // 控制台中vue中组件的名字
    name: 'cart',
    data: function () {
        return {
            message: [] //表示页面商品的总数据
        }
    },
    created() {
        // 要显示购物车界面中的产品  接口文档中最后需要传入相应的产品的id--
        // 因为id是存在main.js中的$store.state.cartDate里面.所以需要遍历里面的内容拿到对应的id
        // 将$store.state.cartDate的值暂时存起来，可以方便使用
        let cartDate = this.$store.state.cartDate;
        //先给一个空的id们值
        let ids = ""
        // 遍历cartDate--对象用for in遍历  数组用foreach遍历
        for (const key in cartDate) { //这个对象里面的键就是id值是数量.所以只需要拿到key即可
            ids += key;//拿到每一个id--但是数组需要用,隔开
            ids += ","
        }
        //但是到这里会有一个问题就是最后一个字符串是,  需要删掉---用数组截取的方法
        ids = ids.slice(0, -1)//表示从第0个到倒数第二个字符
       // console.log(ids)

        this.$axios
            .get(`/site/comment/getshopcargoods/${ids}`).then(response => {
               // console.log(response);//打印出来的没有购买的数量,因为需要用户自己输入.
                //所以需要将返回的每个id对应的值重新赋值给购买的数量
                //   遍历每条得到的数据
                response.data.message.forEach(v => {
                    // 获取 Vuex中的 id对应的值
                    v.buycount = cartDate[v.id];
                    v.selected = false
                });
                //  再将值赋给当前的message
                this.message = response.data.message

            })
    },
    computed: {  //计算属性的方法
        // 计算总金额
        totalPrice() {
            // 先声明一个totalPrice
            let totalPrice = 0
            // 然后遍历数据--状态为选中的商品时将金额和数量乘在一起
            this.message.forEach(v => { //这里v就是每条数据
                //当状态为ture是--选中购买的状态
                if (v.selected) {
                    totalPrice += v.sell_price * v.buycount;
                }

            })
            // 将得到的最后的金额返回出去
            return totalPrice
        },
        totalCount() {
            let totalCount = 0
            // 然后遍历数据--状态为选中的商品时将金额和数量乘在一起
            this.message.forEach(v => { //这里v就是每条数据
                //当状态为ture是--选中购买的状态
                if (v.selected) {
                    totalCount += parseInt(v.buycount);
                }

            })
            // 将得到的最后的金额返回出去
            return totalCount
        },
    },
    methods: {
        numChange(num, id) {
            //   调用仓库的方法--提交载荷
            this.$store.commit('updateGoodsNum', {
                goodId: id,
                goodNum: num //id和值都等于点击修改数量的时候当前的id和修改后的数量
            })
        },
        deleteGoods(id) {
            //   同样的调用仓库的方法--提交载荷
            this.$store.commit('deleteGoods', id)//删除只需要id就可以了
            //   因为有多条数据.不知道删除的哪个 所以需要遍历所有的数据 然后根据id的是否相同然后删除
            this.message.forEach((v, i) => {
                if (v.id == id) {//当id等于传过来的id时就是删除这个
                    this.message.splice(i, 1)
                }
            })

        },
        checkAndSubmit(){
            
        if(this.totalCount==0){
            // 到这里表示没有选中商品
            this.$Message.error('快去买iPhone XS ,mac,ipadAir')
            // 直接结束
            return
        }
        //  到这里说明有东西.可以跳转到下单页面.但是需要带着id跳转过去
        // 声明一个存id的变量
        let ids=''
        // 遍历每条数据,找到勾选的商品拿到其对应的id放在ids中
        this.message.forEach(v=>{
            if(v.selected){
                ids+=v.id
                ids+=","
            }
        })
        // 数组中最后一个,需要去掉
        ids=ids.slice(0,-1)
        // 然后在用代码跳转路由跳转到order页面
        this.$router.push(`/order/${ids}`)

        // 判断是否有商品 --这里判断部分直接用导航守卫来代替--因为很多界面都需要用到这样的话就太麻烦了写在main.js中  只需要执行跳转即可

        // // 判断是否登录-根据接口返回的数据  因为这里有两个跳转的不能用routerlinkto写死
        // //  要用链程式导航-代码跳转路由
        // this.$axios
        //           .get('site/account/islogin')
        //           .then(response=>{
        //             //   打印response
        //             // console.log(response)
        //             if(response.data.code=="nologin"){
        //                 // 到这里表示没有登录
        //                 // 去登录页面
        //                this.$router.push('/login')
        //             }else{
        //                 // 这里登录去结算
        //                this.$router.push('/order')
        //             }
        //           })
        

        }
    }
}
</script>
<style>
</style>

