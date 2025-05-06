//import { ReqParams, ResResult } from './model';

import { get, post } from '/@/utils/http';

enum URL {
  list = '/manage/coupon',
}

const couponList = async (data) => {
  return get({ url: URL.list, params: data });
};
const addCoupon = async (data) => {
  return post({ url: URL.list, data });
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

export default { couponList, addCoupon };
