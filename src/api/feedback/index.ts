//import { ReqParams, ResResult } from './model';

import { get, post } from '/@/utils/http';

enum URL {
  list = '/manage/feedback',
  reply = '/manage/feedback/reply',
}

const feedbackList = async (data) => {
  return get({ url: URL.list, params: data });
};
const replyFeedback = async (data) => {
  return post({ url: URL.reply, data });
};

export default { feedbackList, replyFeedback };
