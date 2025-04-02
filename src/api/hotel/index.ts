import { ReqParams, ResResult } from './model';
import { get } from '/@/utils/http';

enum URL {
  list = '/v1/node/nodelist',
}

const hotellist = async (data: ReqParams) => {
  console.info('ReqParams', data);
  return get<ResResult>({ url: URL.list, data });
};

export default { hotellist };
