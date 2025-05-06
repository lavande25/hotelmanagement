import { ColumnProps } from 'ant-design-vue/es/table';

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
    dataIndex: '',
    width: 100,
    customRender: ({ record }: any) => (
      <a-image
        style={{ display: 'block', width: '50px', height: '50px' }}
        src={record.Images}
        //src="https://staticweb.jiudianhui.com.cn/ims/dev/feedback/0/1743753660922.jpg"
        preview={false}
      />
    ),
  },

  {
    title: '反馈回复',
    dataIndex: 'FeedbackReply',
    //customRender: ({ FeedbackReply }: any) => <span>{FeedbackReply}</span>,
    customRender: ({ record }: any) => <span>{record.FeedbackReply.msg}</span>,
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
    title: '创建时间',
    dataIndex: 'CreatedAt',
  },
  {
    title: '更新时间',
    dataIndex: 'UpdatedAt',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 100,
  },
];
