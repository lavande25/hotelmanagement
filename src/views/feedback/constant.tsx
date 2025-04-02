import { ColumnProps } from 'ant-design-vue/es/table';
//import { Tag, Tooltip, Space } from 'ant-design-vue';
//import { QuestionCircleOutlined } from '@ant-design/icons-vue';
// {
//       "Demand": "string",
//       "FeedbackReply": {
//         "FeedbackID": 0,
//         "ID": 0,
//         "UserID": 0,
//         "msg": "string"
//       },
//       "ID": 0,
//       "Images": [
//         "string"
//       ],
//       "RspFeedbackImages": [
//         {
//           "FeedbackID": 0,
//           "ID": 0,
//           "Url": "string"
//         }
//       ],
//       "Telephone": "string",
//       "UserID": 0
//     }

export const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
  },
  {
    title: '用户ID',
    dataIndex: 'UserID',
  },
  {
    title: '图片',
    dataIndex: 'Images',
    width: 100,
    customRender: ({ record }: any) => (
      <a-image
        style={{ display: 'block', width: '50px', height: '50px' }}
        src={record.Images}
        preview={false}
      />
    ),
  },

  {
    title: '反馈回复',
    dataIndex: 'FeedbackReply',
    //customRender: ({ FeedbackReply }: any) => <span>{FeedbackReply}</span>,
    customRender: ({ record }: any) => <span>{record.FeedbackReply}</span>,
  },
  {
    title: '电话',
    dataIndex: 'Telephone',
  },
  {
    title: '需求',
    dataIndex: 'Demand',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
