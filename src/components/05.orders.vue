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
                                <li class="active">
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
                    <div class="cart-box">
                        <!-- status-icon 让输入框的后面 有提示图标 -->
                        <el-form status-icon :model="orderForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <!-- 上面的一堆 个人信息输入 -->
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名" prop="accept_name">
                                        <el-input v-model="orderForm.accept_name" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区" prop="">
                                        <v-distpicker @selected="selected" :province="orderForm.area.province.value" :city="orderForm.area.city.value" :area="orderForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input v-model="orderForm.address" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input v-model="orderForm.mobile" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话">
                                        <el-input v-model="orderForm.phone" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" prop="email">
                                        <el-input v-model="orderForm.email" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="post_code">
                                        <el-input v-model="orderForm.post_code" style="width:500px"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <!-- 单选框 -->
                                        <el-radio v-model="orderForm.payment_id" label="6">在线支付</el-radio>
                                        <span style="color:#666">手续费:0.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <!-- 单选框 -->
                                        <el-radio @change="expressChange(20)" v-model="orderForm.express_id" label="1">顺丰快递(20元)</el-radio>
                                        <el-radio @change="expressChange(10)" v-model="orderForm.express_id" label="2">圆通快递(10元)</el-radio>
                                        <el-radio @change="expressChange(8)" v-model="orderForm.express_id" label="3">韵达快递(8元)</el-radio>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in message" :key="item.id">
                                            <td width="68">
                                                <!-- 动态添加的需要在to之前加一个: -->
                                                <router-link :to="'/detail/'+item.id">
                                                    <img :src="item.img_url" class="img">
                                                </router-link>

                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.totalamount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <el-form-item label="订单备注(100字符以内)" prop="message">
                                                <el-input type="textarea" resize="none" :rows="4" v-model="orderForm.message" style="width:500px"></el-input>
                                            </el-form-item>
                                     
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{orderForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <!-- 运费 -->
                                            <label id="expressFee" class="price">{{orderForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderForm.goodsAmount+orderForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link to="/cart">返回购物车</router-link>
                                            <a id="btnSubmit" class="btn submit" @click="sureOrder">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
// 导入省市区联动的安装包
import VDistpicker from 'v-distpicker'
export default {
    // 省市区联动需要的固定操作
    components: { VDistpicker },
    name: 'order',
    //   在周期函数中判断登录的状态-这里是防止可以直接输入地址即使没有登录也可以跳转
    // 并且不能让用户看见界面的内容--所以需要在beforeCreat函数中设置即可
    // 但是这个有一个缺点就是直接输地址的时候 会先进到订单页面,然后再跳出index页面
    // 因为需要在很多界面都用这个判断.所以在最外层的组件中去判断会更适合
    // beforeCreat(){
    //     this.$axios
    //     .get('site/account/islogin')
    //     .then(response=>{
    //         // console.log(response);   
    //         if(response.data.code=='nologin'){
    //             // 到这里是没有登录-打到登录页面
    //             this.$router.push('/login');

    //         }    

    //     })
    // }
    data: function () {
        // 自定义验证的规则 手机号验证
        var checkMobile = (rule, value, callback) => {
            setTimeout(() => {
                // 定义正则规则
                let exec = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                if (exec.test(value) == true) {
                    // 正确的时候干的事情
                    callback();
                } else {
                    callback(new Error("你的手机号不对"));
                }
            }, 500);
        };
        // 邮箱
        var checkEmail = (rule, value, callback) => {
            // 如果value 不为空 格式验证
            // console.log(value);
            if (value.trim().length != 0) {
                // 验证
                // 邮箱的正则
                let exec = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                if (exec.test(value.trim()) == true) {
                    callback();
                } else {
                    callback(new Error("请输入正确邮箱"));
                }
            } else {
                callback();
            }
        };
        // 邮编
        var checkPostCode = (rule, value, callback) => {
            if (value.trim().length != 0) {
                // 验证
                // 邮箱的正则
                let exec = /^[1-9]\d{5}(?!\d)$/;
                if (exec.test(value.trim()) == true) {
                    callback();
                } else {
                    callback(new Error("请输入正确邮编"));
                }
            } else {
                callback();
            }
        };
        return {
            // 需要用到的数据
            orderForm: {
                goodsAmount: 0, // 总金额
                expressMoment: 20, // 快递费
                accept_name: "zyc", // 收货人姓名,
                area: {
                    province: { code: "440000", value: "广东省" },
                    city: { code: "440300", value: "深圳市" },
                    area: { code: "440306", value: "宝安区" }
                }, // 省市区
                address: "中粮商务公园1", // 详细地址
                mobile: "18888881234", // 手机号
                email: "tangSir@qq.com", // 邮箱
                post_code: "518300", // 邮编,
                payment_id: "6", // 支付方式
                express_id: "1", // 快递
                message: "快点发货",
                goodsids: "", //购买的商品id,
                cargoodsobj: {}, // 购买的商品 id 跟件数的关系
                phone: "1008611" // 联系电话
            },
            //   声明一个返回商品的数据
            message: [],
            rules: {
                //   需要跟字段相对应
                accept_name: [
                    // required 是否必须  message 提示消息 trigger 触发的方式
                    { required: true, message: "请输入收货人姓名", trigger: "blur" },
                    // min 最短 max 最长 少数民族
                    {
                        min: 1,
                        max: 20,
                        message: "长度在 1 到 20 个字符",
                        trigger: "change"
                    }
                ],
                // 地址的验证规则
                address: [
                    {
                        required: true,
                        message: "请输入地址,没有我送给谁呀",
                        trigger: "blur"
                    }
                ],
                // 手机号验证
                mobile: [{ validator: checkMobile, trigger: "blur" }],
                // 邮箱验证
                email: [{ validator: checkEmail, trigger: "blur" }],
                // 邮编验证
                post_code: [{ validator: checkPostCode, trigger: "blur" }]
            }
        }
    },
    methods: {
        // selected(value) {
        //      console.log(value);
        //     // this.orderForm.area = value;
        // },
        expressChange(price) {
            // 但选中不同的邮费的时候可以改变不同的价格
            this.orderForm.expressMoment = price;
        },
        selected(value) {  
            // console.log(value);
            this.orderForm.area = value;
        },
        sureOrder() {
            // 当点击确认提交按钮的时候要跳转
            //    直接调用接口        
            this.$axios
                .post("site/validate/order/setorder", this.orderForm)
                .then(response => {
                    // 打印  
                    // console.log(response);
                    // 拿到相应的id
                    let orderid = response.data.message.orderid;
                    // 带着id跳转到订单页面
                    this.$router.push('/payOrder/' + orderid);
                    //    然后需要删除掉购物车中的数据
                    this.message.forEach(v => {
                        // 删除仓库Vuex中的id数据--用里面删除的id
                        this.$store.commit('deleteGoods', v.id);
                    })

                })
        }
    },
    // 当页面刚刚跳转的时候就需要调用接口来渲染数据.
    // 所以写在声明周期函数中
    created() {
        // 先获取到带过来的id--就是选择购买的商品id
        // id存在route.params中
        // console.log(this.$route.params);
        this.orderForm.goodsids = this.$route.params.ids;
        // 然后请求数据
        this.$axios
            .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
            .then(response => {
                // console.log(response);
                // 赋值数据
                this.message = response.data.message;
                // 准备 商品id对象
                let cargoodsobj = {};

                //  先定义一个所有商品的总金额
                let total = 0
                // 遍历返回的数据 将数量和单价结合得到总金额total  然后在赋值给totalamount
                response.data.message.forEach(v => {
                    // 修改数量
                    v.buycount = this.$store.state.cartDate[v.id];
                    // 遍历得到每个商品的总金额
                    v.totalamount = v.buycount * v.sell_price;
                    //   然后将每个商品的总金额加起来就是商品的总金额
                    total += v.totalamount
                    // 增加键值对
                    cargoodsobj[v.id] = v.buycount;
                })
                // 赋值到数据中
                this.orderForm.goodsAmount = total;
                // 添加到 orderForm中即可
                this.orderForm.cargoodsobj = cargoodsobj;
                // console.log(this.orderForm);
            })

    },
    computed: {  //计算属性
        //计算购买的数量totalCount
        //   遍历返回数据中的数量
        totalCount() {
            let totalCount = 0;
            this.message.forEach(v => {
                totalCount += v.buycount;
            });
            return totalCount;
        }

    }
}
</script>
<style>
</style>


