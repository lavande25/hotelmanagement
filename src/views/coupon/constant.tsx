import { ColumnProps } from 'ant-design-vue/es/table';
//import { Tag, Tooltip, Space } from 'ant-design-vue';
//import { QuestionCircleOutlined } from '@ant-design/icons-vue';

export const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
  },
  {
    title: '是否使用',
    dataIndex: 'IsUsed',
    customRender: ({ record }: any) => <span>{record.IsUsed === true ? '是' : '否'}</span>,
  },

  {
    title: 'UserID',
    dataIndex: 'UserID',
  },
  {
    title: '优惠金额',
    dataIndex: 'Price',
  },
  {
    title: '有效期',
    dataIndex: 'ExpireAt',
  },
  {
    title: '备注',
    dataIndex: 'Note',
  },

  // {
  //   title: '操作',
  //   dataIndex: 'operation',
  // },
];
