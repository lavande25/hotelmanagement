import { ColumnProps } from 'ant-design-vue/es/table';
//import { Tag, Tooltip, Space } from 'ant-design-vue';
//import { QuestionCircleOutlined } from '@ant-design/icons-vue';

export const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
  },
  {
    title: '酒店ID',
    dataIndex: 'HotelID',
  },
  {
    title: '创建时间',
    dataIndex: 'CreatedAt',
  },
  {
    title: '是否兑换奖励',
    dataIndex: 'IsRedeem',
    customRender: ({ record }: any) => <span>{record.IsRedeem === true ? '是' : '否'}</span>,
  },
  {
    title: '邀请注册酒店Userid',
    dataIndex: 'UserID',
  },

  // {
  //   title: '操作',
  //   dataIndex: 'operation',
  // },
];
