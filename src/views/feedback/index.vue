<template>
  <div class="node-conatiner">
    <h3 class="nc_title font18">反馈管理</h3>

    <!-- :data-source="dataSource" -->
    <div class="btn_search">
      <a-input-search
        v-model:value="searchText"
        placeholder="请输入搜索内容"
        @search="handleSearch"
        style="width: 200px"
      />
      <a-button @click="Handlereset">重置</a-button>
    </div>

    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span @click="handleReply(record)"> 回复 </span>
          </div>
        </template>
        <template v-if="column.dataIndex === 'CreatedAt'">
          <span>{{ record.CreatedAt ? formatToDate(record.CreatedAt) : '' }}</span>
        </template>
        <template v-if="column.dataIndex === 'UpdatedAt'">
          <span>{{ record.UpdatedAt ? formatToDate(record.UpdatedAt) : '' }}</span>
        </template>
      </template>
    </a-table>

    <Modal v-bind="modalState" @cancel="handleCancel" @ok="handleSubmit">
      <a-form
        ref="FormRef"
        :model="formModel"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="FeedbackID:" name="FeedbackID">
          <a-input v-model:value="formModel.FeedbackID" :disabled="true" />
        </a-form-item>
        <a-form-item label="msg:" name="msg">
          <a-input v-model:value="formModel.msg" />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { columns } from './constant';
  import feedbackAPi from '/@/api/feedback';
  import type { FormInstance } from 'ant-design-vue';
  const FormRef = ref<FormInstance>();
  import type { Rule } from 'ant-design-vue/es/form';
  const labelCol = { style: { width: '110px' } };
  const wrapperCol = { span: 17 };
  import { useMessage } from '/@/hooks/useMessage';
  const { createMessage } = useMessage();
  import { formatToDate } from '/@/utils/dateUtil';

  const rules: Record<string, Rule[]> = {
    msg: [{ required: true, trigger: 'blur' }],
  };

  const pagination = ref({
    total: 100, // 设置总记录数，根据总记录数和每页条数计算总页数
    pageSize: 10, // 每页显示的记录数
    current: 1, // 当前页码
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30'],
    showTotal: (total) => `共 ${total} 条`,
  });

  const searchText = ref('');
  const tableData = ref<any[]>([]);

  const loadData = async (
    Page: number = pagination.value.current ?? 1,
    Size: number = pagination.value.pageSize ?? 10,
    // search: string = searchText.value ?? '',
  ) => {
    const result = await feedbackAPi.feedbackList({ Page, Size });
    tableData.value = result?.Data || [];
    pagination.value.total = result?.Total || 0;
  };

  //搜索

  const handleSearch = () => {
    pagination.value.current = 1;
    loadData();
  };

  const handleTableChange = (paginations) => {
    const { current, pageSize } = paginations;
    pagination.value.current = current;
    pagination.value.pageSize = pageSize;
    loadData();
  };

  const Handlereset = () => {
    searchText.value = '';
    loadData();
  };

  // modal
  const modalState = reactive({
    loading: false,
    visible: false,
    title: '回复',
    okText: '保存',
  });

  const formModel = ref({
    FeedbackID: 0,
    msg: '',
  });

  const handleCancel = () => {
    modalState.visible = false;
    FormRef.value?.resetFields();
  };

  //回复

  const handleReply = (row: any) => {
    modalState.title = '回复';
    modalState.okText = '保存';
    modalState.visible = true;
    formModel.value.FeedbackID = row.ID;
    console.info(row, 'row');
  };

  const handleSubmit = () => {
    FormRef.value
      ?.validate()
      .then(async () => {
        const res = await feedbackAPi.replyFeedback(formModel.value);
        if (!res.ErrorMsg) {
          createMessage.success('回复成功');
          modalState.visible = false;
          loadData();
        } else {
          createMessage.error(res.ErrorMsg);
        }
      })
      .catch(console.log);
  };

  onMounted(() => {
    loadData();
  });
</script>
<style lang="less" scoped>
  .node-conatiner {
    .nc_title {
      margin-top: 6px;
      margin-bottom: 60px;
    }
    .ui_image {
      display: block;
      width: 50px;
      height: 50px;
    }
    .btn_search {
      top: 62px;
      right: -48px;
      position: absolute;
      width: 340px;
    }
    .editable-row-operations {
      span {
        color: #3860f4;
        padding-left: 10px;
        cursor: pointer;
      }
    }
  }
</style>
