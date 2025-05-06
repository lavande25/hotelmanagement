//import { ReqParams, ResResult } from './model';

import { get, put } from '/@/utils/http';

enum URL {
  list = '/manage/config',
}

const configList = async (data) => {
  return get({ url: URL.list, params: data });
};
const configUpdate = async (data) => {
  return put({ url: URL.list, data });
};

// const deleteHotel = async (data) => {
//   // return DELETE({ url: URL.list, params: data });
//   return del({
//     url: '/manage/hotel',
//     // url: `/manage/hotel?${data}`,
//     // method: 'POST',
//     params: data,
//   });
// };

export default { configList, configUpdate };
