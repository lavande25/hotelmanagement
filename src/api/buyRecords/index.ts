//import { ReqParams, ResResult } from './model';

import { get } from '/@/utils/http';

enum URL {
  list = '/manage/shopping/buyRecord',
}

const buyRecordList = async (data) => {
  return get({ url: URL.list, params: data });
};
// const replyFeedback = async (data) => {
//   return post({ url: URL.reply, data });
// };

export default { buyRecordList };
