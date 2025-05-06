import { ReqParams, ResResult } from './model';
import { post } from '/@/utils/http';

enum URL {
  //login = '/v1/user/login',
  // permission = '/manage/perm',
  login = '/manage/user/login',
}

const login = async (data: ReqParams) => post<ResResult>({ url: URL.login, data });

//const permission = async () => get<ReqAuth>({ url: URL.permission });

export default { login };
