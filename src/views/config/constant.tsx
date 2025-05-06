import { ColumnProps } from 'ant-design-vue/es/table';
//import { Tag, Tooltip, Space } from 'ant-design-vue';
//import { QuestionCircleOutlined } from '@ant-design/icons-vue';

export const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
  },
  {
    title: 'key',
    dataIndex: 'Key',
  },
  {
    title: '创建时间',
    dataIndex: 'CreatedAt',
  },
  {
    title: '更新时间',
    dataIndex: 'UpdatedAt',
  },
  {
    title: '是否可见',
    dataIndex: 'OnlyAdminVisible',
    customRender: ({ record }: any) => <span>{record.OnlyAdminVisible === 1 ? '是' : '否'}</span>,
  },
  {
    title: '值',
    dataIndex: 'Value',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
