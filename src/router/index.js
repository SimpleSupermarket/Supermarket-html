import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

var page = [
    {path: 'bill', title: "账单"},
    {path: 'goods', title: '商品'},
    {path: 'provider', title: '供应商'},
    {path: 'user', title: '用户'},
];

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/welcome'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/public.vue'], resolve),
            meta: {title: '自述文件'},
            children: getPage()
        },

        {
            path: '/login',
            component: resolve => require(['../components/page/login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})


function getPage() {
    let pages = [{
        path: '/welcome',
        component: resolve => require(['../components/page/welcome.vue'], resolve),
        meta: {title: '系统首页'}
    }, {
            path: '/repassword',
            component: resolve => require(['../components/page/repassword.vue'], resolve),
            meta: {title: '密码修改'}
        }];
    page.forEach(v => {
        pages.push({
            path: '/' + v.path,
            component: resolve => require(['../components/page/' + v.path + '/list.vue'], resolve),
            meta: {title: v.title + '管理'}
        },  {
            path: '/' + v.path + '/update',
            component: resolve => require(['../components/page/' + v.path + '/add.vue'], resolve),
            meta: {title: v.title + '修改'}
        }, {
            path: '/' + v.path + "/add",
            component: resolve => require(['../components/page/' + v.path + '/add.vue'], resolve),
            meta: {title: v.title + '添加'}
        });
    });
    return pages;
}