/**
 * @name permission
 * @description 全局路由过滤
 */

import { router } from '.';
import { getToken } from '../utils/auth';

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to: any, _, next) => {
  const hasToken = getToken();
  if (hasToken) {
    // 已登录
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
    }
  }
});
