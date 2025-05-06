import { ColumnProps } from 'ant-design-vue/es/table';
//import { Tag, Tooltip, Space } from 'ant-design-vue';
//import { QuestionCircleOutlined } from '@ant-design/icons-vue';

export const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
  },
  {
    title: '模块',
    dataIndex: 'Module',
  },
  {
    title: '方法',
    dataIndex: 'Methods',
  },
  {
    title: 'URL',
    dataIndex: 'Url',
  },
  {
    title: '酒店',
    dataIndex: 'Hotel',
  },
  {
    title: '用户',
    dataIndex: 'User',
  },
  {
    title: '开始时间',
    dataIndex: 'TimestampFrom',
  },
  {
    title: '结束时间',
    dataIndex: 'TmestampTo',
  },
];
