<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for=" itemSon in item.subcates" :key="itemSon.id">
                                                {{itemSon.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">手机数码</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html">手机通讯</a>
                                                <a href="/goods/43.html">摄影摄像</a>
                                                <a href="/goods/43.html">存储设备</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel height="341px">
                            <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                <a href="#">
                                    <img :src="item.img_url" alt="">
                                </a>

                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for=" (item,index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | filterDate}}</span>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in categoryList" :key="item.catetitle">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="itemSon in item.level2catelist" :key="itemSon.subcateid">{{itemSon.subcatetitle}}</a>

                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="itemSon in item.datas" :key="itemSon.artID">
                                      <!-- 这里是动态生成的to前面要加一个冒号 -->
                            <router-link :to="'/detail/'+itemSon.artID">
                                <div class="img-box">
                                    <!-- <img :src="itemSon.img_url"> -->
                                    <img v-lazy="itemSon.img_url" alt="">
                                </div>
                                <div class="info">
                                    <h3>{{itemSon.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemSon.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemSon.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemSon.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>

                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
// 导入 axios
import axios from "axios";

//将这里面的内容暴露出去
export default {
    name: "index", //这里
    data: function() {
        return {
            //    定义渲染在页面上的数据
            catelist: [], // 分类数据
            sliderlist: [], // 轮播图数据
            toplist: [], // 热卖排行
            categoryList: []
        };
    },
    //   这个是周期函数 也叫钩子函数还有一个在是创建钩子函数之前的讲beforecreate(){}
    created() {
        // 在这个文件里面发送请求并返回
        axios
            .get("http://47.106.148.205:8899/site/goods/gettopdata/goods")
            .then(response => {
                // console.log(response);
                this.catelist = response.data.message.catelist;
                this.sliderlist = response.data.message.sliderlist;
                this.toplist = response.data.message.toplist;
            });
        axios
            .get("http://47.106.148.205:8899/site/goods/getgoodsgroup")
            .then(response => {
                // console.log(response);
                this.categoryList = response.data.message;
            });
    },
 
};
</script>

<style>
img {
    height: 100%;
    width: 100%;
}
/* 显示标题 */
/* #biaoti {
        position: absolute;
        bottom: 0;
        left: 0;
    } */
</style>

