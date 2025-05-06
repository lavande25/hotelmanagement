import { ColumnProps } from 'ant-design-vue/es/table';
//import { Tag, Tooltip, Space } from 'ant-design-vue';
//import { QuestionCircleOutlined } from '@ant-design/icons-vue';
// "Data": [
//     {
//       "Avatar": "string",
//       "Hotel": {
//         "Address": "string",
//         "BankAccount": "string",
//         "BankAddress": "string",
//         "Company": "string",
//         "ID": 0,
//         "InvitedBy": "string",
//         "Name": "string",
//         "SocialCode": "string",
//         "Telephone": "string"
//       },
//       "ID": 0,
//       "InvitedByHotelID": 0,
//       "InvitedByHotelRole": "string",
//       "InvitedCode": "string",
//       "IsBan": true,
//       "Name": "string",
//       "Perms": [
//         {
//           "ID": 0,
//           "IsVisible": true,
//           "Methods": "string",
//           "Module": "string",
//           "Name": "string",
//           "Role": "string",
//           "Url": "string"
//         }
//       ],
//       "PrimeRight": {
//         "ExpireAt": "string",
//         "Name": "string"
//       },
//       "Token": "string",
//       "UserHotelRole": {
//         "Department": "string",
//         "HotelID": 0,
//         "ID": 0,
//         "Role": "string",
//         "UserID": 0
//       },
//       "WxCode": "string",
//       "WxOpenID": "string"
//     }
//   ],
//   "ErrorMsg": "string",
//   "Total": 0      "Url": "string"

export const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
  },
  {
    title: '创建时间',
    dataIndex: 'CreatedAt',
  },
  // {
  //   title: 'userID',
  //   dataIndex: 'UserHotelRole',
  //   customRender: ({ record }: any) => <span>{record.UserHotelRole[0]['UserID']}</span>,
  // },
  {
    title: '名称',
    dataIndex: 'Name',
  },
  {
    title: '角色',
    dataIndex: 'InvitedByHotelRole',
  },
  {
    title: '邀请码',
    dataIndex: 'InvitedCode',
  },

  {
    title: '是否被禁封',
    dataIndex: 'IsBan',
    customRender: ({ record }: any) => <span>{record.IsBan === false ? '否' : '是'}</span>,
  },
  // {
  //   title: '用户酒店角色',
  //   dataIndex: 'UserHotelRole',
  // },
  {
    title: '微信',
    dataIndex: 'WxCode',
  },
  {
    title: '微信openid',
    dataIndex: 'WxOpenID',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 200,
  },
];
