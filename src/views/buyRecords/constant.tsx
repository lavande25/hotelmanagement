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
    title: '付了多少钱',
    dataIndex: 'PayMoney',
  },
  {
    title: '套餐ID',
    dataIndex: 'PrimePlanID',
  },
  {
    title: '套餐存档',
    dataIndex: 'PrimePlanJson',
  },
  {
    title: 'UserID',
    dataIndex: 'UserID',
  },
];
