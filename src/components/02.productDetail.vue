<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions"></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" size="mini" @change="handleChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=false" :class="{selected:!showDiscuss}">商品介绍</a>
                                            <!-- 等于这个写法:class="{selected:showDiscuss==false}"  -->
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=true" :class="{selected:showDiscuss}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>

                            <div class="tab-content entry" style="display: block;" v-show="!showDiscuss" v-html="goodsinfo.content">
                                {{goodsinfo.content}}
                            </div>
                            <div class="tab-content" style="display: block;" v-show="showDiscuss">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea style="resize:none" v-model.trim="commentInfo" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="submitCommit" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | filterDate}}
                                                        <!-- <Rate v-model="value" /> -->
                                                    </span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :total="totalCount" show-elevator show-sizer placement="top" :page-size-opts="[5, 6,10, 13, 26]" @on-change="pageChange" @on-page-size-change="pageSizeChange" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time | filterDate }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- iview的返回顶部 -->
        <BackTop></BackTop>
          <!-- 移动的小图片 -->
        <img v-if="imglist.length!=0" class="moveImg" :src="imglist[0].original_path" alt="">
    </div>
</template>
<script>
// 导入jq
import $ from "jquery";
export default {
    name: "detail",
    data: function () {
        return {
            productId: undefined, // id
            goodsinfo: {}, // 商品信息
            hotgoodslist: [], // 热卖列表
            imglist: [], // 图片列表
            buyCount: 0, //起始数量
            showDiscuss: false,
            // 放大镜
            zoomerOptions: {
                zoomFactor: 3, // scale for zoomer
                pane: "container-round", // three type of pane ['pane', 'container-round', 'container']
                hoverDelay: 300, // how long after the zoomer take effect
                namespace: "zoomer", // add a namespace for zoomer component, useful when on page have mutiple zoomer
                move_by_click: false, // move image by click thumb image or by mouseover
                scroll_items: 5, // thumbs for scroll
                choosed_thumb_border_color: "#bbdefb", // choosed thumb border color
                move_button_style: "chevron" // default chevron , can be set to angle-double
            },
            images: {
                normal_size: []
            },
            // 页码
            pageNum: 1,
            // 页容量
            pageSize: 10,
            //获取到的评论内容
            comments: "",
            //总的条数
            totalCount: 0,
            // 输入评论框的内容
            commentInfo: "",
        };
    },
    methods: {
        handleChange() { },
        getProudctDetail() {
            //   console.log(this.$route.params.id);
            // 保存id   这个是动态路由匹配中的方法将id存在$route.params中
            this.productId = this.$route.params.id;
             this.$axios
                .get(
                    `site/goods/getgoodsinfo/${
                    this.productId
                    }`
                )
                .then(response => {
                    // console.log(response);
                    this.goodsinfo = response.data.message.goodsinfo;
                    this.hotgoodslist = response.data.message.hotgoodslist;
                    this.imglist = response.data.message.imglist;
                    // 处理放大镜的
                    let temArr = [];
                    // 循环
                    this.imglist.forEach((v, i) => {
                        temArr.push({
                            id: v.id,
                            url: v.original_path
                        });
                    });
                    this.images.normal_size = temArr;
                });
        },
        // 写一个获取评论的方法.因为当页容量和挑转页面的时候需要改变
        getComments() {
            this.productId = this.$route.params.id;
           this.$axios
                .get(
                    `site/comment/getbypage/goods/${
                    this.productId
                    }?pageIndex=${this.pageNum}&pageSize=${this.pageSize}`
                )
                .then(response => {
                    // 评论的内容
                    this.comments = response.data.message;
                    // 评论的总条数
                    this.totalCount = response.data.totalcount;
                });
        },
        // 页码改变的方法
        pageChange(page) {
            //传入点击的页面然后传入进去 获得相应的内容
            this.pageNum = page;
            //重新获取数据即可
            this.getComments();
        },
        // 页容量改变的方法
        pageSizeChange(size) {
            // console.log(size);
            this.pageSize = size;
            // 如果就是第一页 重新获取数据
            if (this.pageNum == 1) {
                this.getComments();
            }
        },
        // 提交评论的操作
        submitCommit() {
            // 非空判断
            if (this.commentInfo == "") {
                // 直接弹框
                // this.error();
                this.$Message.error(
                "没写东西"
            );
                return;
            }
            // 调用接口 this.$this.$axios
           this.$axios
                .post(`site/validate/comment/post/goods/${this.productId}`,
                    {
                        commenttxt: this.commentInfo
                    }
                )
                .then(response => {
                    // 提示用户成功啦
                    this.$Message.success(response.data.message);
                    // 发表成功之后 局部刷新 调用函数
                    this.getComments();
                    // 清空评论
                    this.commentInfo = "";
                    // console.log(response);
                });
        },
          // 加入购物车的逻辑
    // 使用jq来实现
    cartAdd() {
          //   当选择购买数量是0的时候
      if (this.buyCount == 0) {
        this.$Message.error("没选数量");
        return;
      }
      // 获取加入购物车位置
      let cartOffset = $('.add').offset();
    //   console.log(cartOffset);
      // 获取购物车位置
      let targetOffset = $('.icon-cart').offset();
    //   console.log(targetOffset);
      // 使用动画的方式 移动图片
      // 移动到按钮位置 显示出来 动画移动到目标位置
      $(".moveImg").show().css(cartOffset).animate(targetOffset,function(){
          $(this).hide();
    
      });
    this.$store.commit('addGoods', {//   参数1:传入对象方法的名称
        goodId: this.productId,  //最上面的data中已经声明了
        goodNum: this.buyCount
    })
      
    },
    },
    //   在生命周期函数中发送请求
    created() {
        this.getProudctDetail();
        this.getComments();
    },
    watch: {
        $route(val, oldVal) {
            //    先给一个空 清空图片然后在重新生成
            this.images.normal_size = [];
            this.getProudctDetail();
        }
    }
};
</script>
<style lang="less">
.tab-content img {
    width: 100%;
    display: block;
}
._magnifier img {
    width: 300px;
    height: 250px;
}
/* 放大镜相关样式 */
.pic-box {
    width: 390px;
    .control-box .thumb-list {
        display: flex;
        justify-content: center;
        img {
            width: 80px;
            height: 80px;
            margin: 2px;
        }
    }
    .control {
        //   text-align:center;
        display: flex;
        // 主轴
        justify-content: center;
        // 纵轴 副轴 侧轴
        align-items: center;
    }
}
// 移动图片的样式
.moveImg {
  position: absolute;
  width: 50px;
    height:50px ;
  display: none;
  // top:0;
  // left:0;
}
.moveImg.move{
    transition: all 1s;
    transform: rotate(720deg);
}
</style>
