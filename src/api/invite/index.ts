//import { ReqParams, ResResult } from './model';

import { get } from '/@/utils/http';

enum URL {
  list = '/manage/invite',
}

const inviteList = async (data) => {
  return get({ url: URL.list, params: data });
};

export default { inviteList };
