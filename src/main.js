// 这里存放了   1.各种导包的操作,
// 2.配置路由以及路由的各种规则
// 3.实例化一个Vuex的仓库
// 4.增加一个导航路由/类似中间件的作用,就是当所有页面进行跳转的时候都会经过这里 
import Vue from 'vue'
import App from './App.vue'
// 导入路由 是下面实例化的对应
import VueRouter from 'vue-router'
// 导入首页的组件
//     这个组件的名称和西面的component的属性值对应    
import Index from './components/01.index.vue';
// 导入详情页的组件
import Detail from './components/02.productDetail.vue';
//导入购物车的组件
import Cart from './components/03.shoppingCart.vue';
//导入登录的组件
import Login from './components/04.login.vue';
//导入订单的组件
import Order from './components/05.orders.vue';
//导入订单详情的组件
import PayOrder from './components/06.payOrder.vue';
//导入支付成功的组件
import PaySuccess from './components/07.PaySuccess.vue';
//导入个人中心的组件
import VipCenter from './components/08.vipCenter.vue';
//导入订单列表详情的组件
import OrderList from './components/09.OrderList.vue';
//导入订单列表详情的组件
import OrderDetail from './components/10.orderDetail.vue';
// 轮播图的导入包
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 这个是使用轮播图需要用的方法,同下
Vue.use(ElementUI);
// iview组件
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
// 懒加载的组件
import VueLazyload from 'vue-lazyload'

// 全局导入axios
import axios from 'axios';
// 配置全局基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
axios.defaults.withCredentials = true //设置还可以携带cookie的值
// 增加到Vue的原型中
Vue.prototype.$axios = axios;
//VueXde 导入
import Vuex from 'vuex'

Vue.use(Vuex) //----VueX 就是是实例化的一个仓库,
//实例化一个仓库--在vue实例化中传入进去(挂载)  其中下面的提交载荷也是属于Vuex中的方法
const store = new Vuex.Store({
  state: {
    // count: 998
    // 这里是将添加的数据保存起来的地方,先给空
    cartDate: JSON.parse(window.localStorage.getItem('goodkey')) || {},
    // 在仓库中给出是否登录的状态
    isLogin: false,
    // 来时的地址
    fromPath: '', //先定义一个空 然后传值

  },
  // 暴露修改的方法 
  mutations: { //将所有状态的变化写在这里面 --用store.commit访问到里面的每个方法属性
    addGoods(state, goodInfo) { //第二个参数是传入的值 是一个对象,用goodInfo接收
      // 格式{goodId:商品id,goodNum:数量}
      //  先要判断购物车的id是不是存在,不存在就写入进去,如果存在就直接累加.
      // 根据有没有值去判断
      if (state.cartDate[goodInfo.goodId] == undefined) {
        // 这里会有一个bug 就是数据明明修改了 然后页面不会同步刷新,需要用到一个Vue.set方法
        Vue.set(state.cartDate, goodInfo.goodId, goodInfo.goodNum) //参数1:传入的对象 2:键 3:值
      } else {
        // 如果存在的话就直接累加进去
        state.cartDate[goodInfo.goodId] += goodInfo.goodNum
      }
    },
    updateGoodsNum(state, goodInfo) { //修改好数量的方法--跟上面的用法类似
      // good里面有两个参数id和数量
      //  直接将值替换
      state.cartDate[goodInfo.goodId] = goodInfo.goodNum
    },
    deleteGoods(state, goodId) {
      // delete 删除对象中的属性
      // delete state.cartDate[goodId];
      // 但是会和增加一样 不会同步更新页面的内容需要用到Vuex中的方法
      // delete 删除的属性不会触发视图更新
      // 需要调用Vue.delete方法才可以
      Vue.delete(state.cartDate, goodId);
    },
    changeLoginStatus(state, isLogin) { //切换登录状态的方法
      state.isLogin = isLogin; //将传过来的值赋值给登录的状态
    },
    // 在路由中增加一个保存来之前的地址--在导航路由中获取这个这个方法
    saveFromPath(state, fromPath) {
      state.fromPath = fromPath;
    }
  },
  // getters vuex中的计算属性
  getters: {
    goodsCount: state => {
      //  声明一个购物车数量的num值
      let num = 0
      // 遍历传入的对象
      for (const key in state.cartDate) {
        // console.log(key);先打印看key的数据内容
        num += state.cartDate[key]
      }
      // 最后在将返回num出去
      return num
    }
  },

})
//当关闭浏览器(刷新)的时候将数据存起来
window.onbeforeunload = function () {
  window.localStorage.setItem('goodkey', JSON.stringify(store.state.cartDate))
}

// 导入放大镜
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

// 配置文件-懒加载的效果
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: require('./assets/img/IMG_4103.gif'),
  attempt: 1
})
Vue.use(VueRouter);

// 注册全局过滤器
// 依赖于 moment.js
import moment from 'moment'; //日期的组件
// 注册--管道符
Vue.filter('filterDate', function (val,formatStr) {
  // console.log(formatStr);
  // 如果你传入了格式化字符串 就用 传入的
  if(formatStr!=undefined){
    return moment(val).format(formatStr);
  }else{
    // 没有传入个格式化字符串 就用 默认的
    return moment(val).format("YYYY年MM月DD日");
  }
})
// 定义路由的规则
let routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    //  首页的规则
    path: '/index',
    component: Index, //component的名称要和最上面导入组件时的名称一致
  },
  // 详情页的规则
  {
    path: '/detail/:id',
    component: Detail,
  },
  // 购物车的规则
  {
    path: '/cart',
    component: Cart,
  },
  // 登录页面的规则
  {
    path: '/login',
    component: Login
  },
  // 订单页面的规则
  {
    path: '/order/:ids',
    component: Order,
    // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
    meta: {
      checkLogin: true
    }
  },
  // 订单详情页面的规则
  {
    path: '/payOrder/:orderid',
    component: PayOrder,
    // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
    meta: {
      checkLogin: true
    }
  },
  // 支付成功的规则
  {
    path: '/PaySuccess',
    component: PaySuccess,
    // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
    meta: {
      checkLogin: true
    }
  },
    // 个人中心的规则
    {
      path: '/VipCenter',
      component: VipCenter,
      // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      meta: {
        checkLogin: true
      }
    },
    
     // 订单列表的规则
     {
      path: '/OrderList',
      component: OrderList,
      // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      meta: {
        checkLogin: true
      }
    },
    
      // 订单详情的规则
      {
        path: '/orderDetail/:id',
        component: OrderDetail,
        // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
        meta: {
          checkLogin: true
        }
      },
]
// 实例化路由对象
let router = new VueRouter({
  routes //传入上面的规则  这个的键必须是routes ,如果上面的路由规则不是routes 需要用键值对赋值
})

// 增加导航路由--相当于是中间件 页面跳转之前需要进过这里过滤一次
router.beforeEach((to, from, next) => {
  // 提交载荷 保存数据--要在一进来的时候就保存这个地址.
  store.commit('saveFromPath', from.path);
  //判断去的页面是不是order
  if (to.meta.checkLogin) { //表示存在
    axios.get('site/account/islogin').then(response => {
      // 根据返回的数据看是不是登录状态
      if (response.data.code != "nologin") {
        //直接走 过去到跳转的页面
        next()
      } else {
        //到这里表示没有登录 跳去登录页面
        next('/login')
      }
    })
  } else {
    next()
  }
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() { //这里是所有的组件的外层,在这里判断最上面登录的状态,是否显示登录-注册
    //            每次进入页面都会判断 
    axios.get('/site/account/islogin').then(response => {
      // console.log(response);
      if (response.data.code == 'logined') {
        // 到这里表示登录成功
        // 改变登录的状态--
        store.state.isLogin = true;
        // 根据这个状态在vue.app中看是不是登录的状态
      } else {
        // 没有登陆
      }

    })

  }
}).$mount('#app')