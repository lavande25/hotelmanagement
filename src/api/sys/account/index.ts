/**
 * @name account
 * @description 系统设置 - 账户模块
 */

import { ReqAccount } from './model';
import { put } from '/@/utils/http';

enum URL {
  update = '/manage/user/info',
  // account = '/v1/account/info',
}

const update = async (data: ReqAccount) => put<any>({ url: URL.update, data });

export default { update };
