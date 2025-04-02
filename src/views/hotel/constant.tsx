import { ColumnProps } from 'ant-design-vue/es/table';
//import { Tag, Tooltip, Space } from 'ant-design-vue';
//import { QuestionCircleOutlined } from '@ant-design/icons-vue';

export const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
  },
  {
    title: '街道',
    dataIndex: 'Address',
  },
  {
    title: '银行账号',
    dataIndex: 'BankAccount',
  },
  {
    title: '银行地址',
    dataIndex: 'BankAddress',
  },
  {
    title: '公司',
    dataIndex: 'Company',
  },
  {
    title: '邀请人',
    dataIndex: 'InvitedBy',
  },
  {
    title: '酒店名称',
    dataIndex: 'Name',
  },
];
