import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './routerConfig'
Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

let routes = [
  {
    path: '/',
    component: load('layouts/Full'),
    children: [
      { path: '/', component: load('Index') }, // Default
    {path: '/test', name: 'test', component: load('Test')},
    {path: '/login', name: 'auth.login', component: load('auth/Login'), meta: {guest: true}},
    {path: '/password/reset', name: 'auth.password', component: load('auth/PasswordReset'), meta: {guest: true}},
    {path: '/signup', name: 'auth.signup', component: load('auth/Signup'), meta: {guest: true}},
    {path: '/logout', name: 'auth.logout', component: load('auth/Logout'), meta: {auth: true}},
    {path: '/cart', component: load('cart/Index')},
    {path: '/posts/add', name: 'posts.add', component: load('posts/AddPost')},
    {path: '/posts/:id', name: 'posts.show', component: load('posts/Show')},
    {path: '/hello', components: {default: load('Hello')}},
    {path: '/contact-us', name: 'pages.contact', component: load('pages/Contact')},
    {path: '/about-us', name: 'pages.about', component: load('pages/About')},
    // pages
    {path: '/pages/:name', name: 'pages.terms', component: load('pages/Static')}
    ]
  },
  /**
  * user profile
  */
  {
    path: '/@:username',
    component: load('users/profile/Index'),
    name: 'user.profile',
    children: [
      {path: '/user/:username/info', name: 'user.info', component: load('users/profile/Info')}
    ]
    // { path: '/user/:username/followed', name: 'user.followed', component: load('users/List') },
    // { path: '/user/:username/followers', name: 'user.followers', component: load('users/List') },
    // {path: '/user/account', name: 'user.account', component: load('users/account/Account'), meta: {auth: true}},
    // {path: '/account/settings', name: 'user.settings', component: load('users/account/Settings'), meta: {auth: true}},
    // {path: 'user/notification', name: 'user.notification', component: load('users/Notification'), meta: {auth: true}}
    // ]
  },
  { path: '/:username/location', name: 'user.location', component: load('users/profile/Location') },
  /**
  * user account
  */
  {
    path: '/:username',
    component: load('users/account/Index'),
    meta: {auth: true},
    children: [
      { path: '/', name: 'user.settings', component: load('users/account/Settings') },
      { path: 'edit-profile', name: 'user.edit.profile', component: load('users/account/EditProfile') },
      { path: 'edit-password', name: 'user.edit.password', component: load('users/account/EditPassword') },
      { path: 'edit-account', name: 'user.edit.account', component: load('users/account/EditAccount') },
      { path: 'market-settings', name: 'user.edit.market.settings', component: load('users/account/market/Settings'), meta: {hasMarket: true} },
      { path: 'market-create', name: 'user.create.market', component: load('users/account/market/Create'), meta: {hasNoMarket: true} },
      { path: 'edit-location', name: 'user.edit.market.location', component: load('users/account/EditLocation') }
    ]
  },
    /*
    *   Orders
    *
    */
  {
    path: '/!',
    component: load('layouts/Full'),
    meta: {},
    children: [
      {
        path: 'orders',
        name: 'orders',
        component: load('orders/Index2')
        // children: [
        //   { path: '/', name: 'orders.many', component: load('orders/ManyOrders') },
        //   { path: ':number', name: 'orders.show', component: load('orders/show2/OrderShow') },
        //   {path: ':number/:username', name: 'orders.oneSeller', component: load('orders/show2/OrderSellerShow')}

          // {
          //   path: '/',
          //   name: 'orders.many',
          //   component: load('orders/ManyOrders'),
          //   children: [
          //     {
          //       path: ':number',
          //       name: 'orders.show',
          //       component: load('orders/show2/OrderShow'),
          //       children: [
          //         {path: '/orders/:number/:username', name: 'orders.oneOrder', component: load('orders/show/OneOrder'), meta: {auth: true}}
          //       ]
          //     }
          //   // {path: '/orders/test/t', name: 'orders.test', component: load('orders/Test'), meta: {auth: true}}
          //   ]
          // }
        // ]
      }
    ]
  },
  { path: '*', component: load('errors/404') } // Not found
]
let router = new VueRouter({
  routes
})
routerConfig(router)
export default router
