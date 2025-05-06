//import { ReqParams, ResResult } from './model';

import { get, post, put } from '/@/utils/http';

enum URL {
  list = '/manage/prime',
}

const List = async (data) => {
  return get({ url: URL.list, params: data });
};
const add = async (data) => {
  return post({ url: URL.list, data });
};

const update = async (data) => {
  return put({ url: URL.list, data });
};
export default { List, add, update };
