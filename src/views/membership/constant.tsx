import { ColumnProps } from 'ant-design-vue/es/table';
//import { Tag, Tooltip, Space } from 'ant-design-vue';
//import { QuestionCircleOutlined } from '@ant-design/icons-vue';

export const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
  },
  {
    title: '有效期',
    dataIndex: 'Month',
  },
  {
    title: '会员',
    dataIndex: 'IsPrime',
    customRender: () => <span>{'是'}</span>,
  },
  {
    title: '价格',
    dataIndex: 'Price',
  },
  {
    title: '优先级',
    dataIndex: 'Priority',
  },

  {
    title: '套餐名称',
    dataIndex: 'Name',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
