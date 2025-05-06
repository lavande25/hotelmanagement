import { ColumnProps } from 'ant-design-vue/es/table';
//import { Tag, Tooltip, Space } from 'ant-design-vue';
//import { QuestionCircleOutlined } from '@ant-design/icons-vue';

export const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
  },
  {
    title: '会员到期日',
    dataIndex: 'PlanExpire',
  },
  {
    title: '套餐ID',
    dataIndex: 'PrimePlanID',
  },
  {
    title: 'UserID',
    dataIndex: 'UserID',
  },
  {
    title: '用户名称',
    dataIndex: '',
    customRender: ({ record }: any) => <span>{record.User.Name}</span>,
  },

  {
    title: '备注',
    dataIndex: 'Note',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
