import { ReqParams, ResResult } from './model';
import { get, del } from '/@/utils/http';

enum URL {
  list = '/manage/hotel',
  //delte = '/manage/hotel',
}

const hotelList = async (data: ReqParams) => {
  console.info('ReqParams', data);
  return get<ResResult>({ url: URL.list, params: data });
};

const deleteHotel = async (data) => {
  return del({ url: URL.list, data });
};

export default { hotelList, deleteHotel };
