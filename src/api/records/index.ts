//import { ReqParams, ResResult } from './model';

import { get } from '/@/utils/http';

enum URL {
  list = '/manage/audit',
}

const recordsList = async (data) => {
  return get({ url: URL.list, params: data });
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

export default { recordsList };
