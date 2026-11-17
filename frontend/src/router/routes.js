// 路由表是当前菜单的唯一数据源（后端暂无菜单接口）。
// meta.public：无需登录即可访问；meta.title：页面标题；meta.icon：菜单图标名。
const layoutChildren = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: { title: '工作台', icon: 'Odometer' },
  },
  {
    path: 'employee',
    name: 'Employee',
    component: () => import('@/views/employee/index.vue'),
    meta: { title: '员工管理', icon: 'UserFilled' },
  },
  {
    path: 'category',
    name: 'Category',
    component: () => import('@/views/category/index.vue'),
    meta: { title: '分类管理', icon: 'Menu' },
  },
  {
    path: 'dish',
    name: 'Dish',
    component: () => import('@/views/dish/index.vue'),
    meta: { title: '菜品管理', icon: 'Food' },
  },
  {
    path: 'setmeal',
    name: 'Setmeal',
    component: () => import('@/views/setmeal/index.vue'),
    meta: { title: '套餐管理', icon: 'Dish' },
  },
  {
    path: 'order',
    name: 'Order',
    component: () => import('@/views/order/index.vue'),
    meta: { title: '订单管理', icon: 'Tickets' },
  },
  {
    path: 'statistics',
    name: 'Statistics',
    component: () => import('@/views/statistics/index.vue'),
    meta: { title: '数据统计', icon: 'DataLine' },
  },
]

/**
 * 菜单数据：由布局路由的子路由派生，避免路由表与菜单两处漂移。
 * @type {{ path: string, title: string, icon: string }[]}
 */
export const menuRoutes = layoutChildren.map((item) => ({
  path: `/${item.path}`,
  title: item.meta.title,
  icon: item.meta.icon,
}))

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', public: true },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    meta: { title: '首页' },
    children: layoutChildren,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
    meta: { title: '页面不存在', public: true },
  },
]
