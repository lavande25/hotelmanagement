//import { ReqParams, ResResult } from './model';

import { get, put } from '/@/utils/http';

enum URL {
  list = '/manage/user',
}

const List = async (data) => {
  return get({ url: URL.list, params: data });
};
const ban = async (data) => {
  return put({ url: URL.list, data });
};

export default { List, ban };
