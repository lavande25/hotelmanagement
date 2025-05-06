import { ColumnProps } from 'ant-design-vue/es/table';
//import { Tag, Tooltip, Space } from 'ant-design-vue';
//import { QuestionCircleOutlined } from '@ant-design/icons-vue';
// "ID": 0,
//       "IsVisible": true,
//       "Methods": "string",
//       "Module": "string",
//       "Name": "string",
//       "Role": "string",
//       "Url": "string"

export const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
  },
  {
    title: '方法',
    dataIndex: 'Methods',
  },
  {
    title: '模块',
    dataIndex: 'Module',
  },
  {
    title: '名称',
    dataIndex: 'Name',
  },
  {
    title: '角色',
    dataIndex: 'Role',
  },
  {
    title: 'url',
    dataIndex: 'Url',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
