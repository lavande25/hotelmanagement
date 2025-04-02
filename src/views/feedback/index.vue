<template>
  <div class="node-conatiner">
    <h3 class="nc_title font18">反馈管理</h3>
    <!-- :data-source="dataSource" -->
    <a-input-search
      v-model:value="searchText"
      placeholder="请输入搜索内容"
      @search="handleSearch"
      style="width: 200px; margin-bottom: 16px"
    />
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
          <a-input v-model:value="formModel.FeedbackID" />
        </a-form-item>
        <a-form-item label="ID:" name="ID">
          <a-input v-model:value="formModel.ID" />
        </a-form-item>
        <a-form-item label="UserID:" name="UserID">
          <a-input v-model:value="formModel.UserID" />
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
  import type { TablePaginationConfig } from 'ant-design-vue/lib/table';
  import type { FormInstance } from 'ant-design-vue';
  const FormRef = ref<FormInstance>();
  import type { Rule } from 'ant-design-vue/es/form';
  //import { UserDeleteOutlined } from '@ant-design/icons-vue';
  const labelCol = { style: { width: '110px' } };
  const wrapperCol = { span: 17 };

  const rules: Record<string, Rule[]> = {
    msg: [{ required: true, trigger: 'blur' }],
  };

  const pagination = ref<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30'],
  });

  // 模拟接口请求
  const fetchData = async (
    page: number,
    pageSize: number,
    // search: string,
  ): Promise<{ data: any[]; total: number }> => {
    // 这里可以替换为实际的接口调用
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData: any[] = [];
        for (let i = 0; i < 100; i++) {
          mockData.push({
            ID: i,
            UserID: i,
            // FeedbackReply: {
            //   msg: `回复反馈${i}`,
            //   FeedbackID: i,
            // },
            FeedbackReply: `回复反馈${i}`,
            Telephone: '15011494567',
            Demand: '需求',
            Images:
              'https://tse4-mm.cn.bing.net/th/id/OIP-C.WRt9evHqLsC2RwMpDz8GQwHaNK?rs=1&pid=ImgDetMain',
          });
        }
        const filteredData = mockData;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        resolve({
          data: paginatedData,
          total: filteredData.length,
        });
      }, 500);
    });
  };

  const searchText = ref('');
  const tableData = ref<any[]>([]);

  const loadData = async (
    page: number = pagination.value.current ?? 1,
    pageSize: number = pagination.value.pageSize ?? 10,
    search: string = searchText.value ?? '',
  ) => {
    console.info(page, pageSize, search, 'zh----');
    const result = await fetchData(page, pageSize);
    tableData.value = result.data;
    pagination.value.total = result.total;
  };

  //搜索

  const handleSearch = () => {
    pagination.value.current = 1;
    loadData();
  };

  const handleTableChange = (pag: TablePaginationConfig) => {
    const { current, pageSize } = pag;
    pagination.value.current = current;
    pagination.value.pageSize = pageSize;
    loadData(current, pageSize);
  };
  // modal
  const modalState = reactive({
    loading: false,
    visible: false,
    title: '回复',
    okText: '保存',
  });

  const formModel = ref({
    ID: '',
    FeedbackID: '',
    UserID: '',
    msg: '',
  });

  const handleCancel = () => {
    modalState.visible = false;
    FormRef.value?.resetFields();
  };

  //新增会员套餐

  const handleReply = (row: any) => {
    modalState.title = '回复';
    modalState.okText = '保存';
    modalState.visible = true;
    formModel.value.ID = row.ID;
    formModel.value.UserID = row.UserID;
    formModel.value.FeedbackID = '12';
    console.info(row, 'row');
  };
  const handleSubmit = () => {
    FormRef.value
      ?.validate()
      .then(async () => {
        modalState.loading = true;
        // const req = modalState.title === '新增用户' ? store.fetchCreate : store.fetchUpdate;

        // if (res) {
        //   createMessage.success(`${modalState.title === '新增用户' ? '新增' : '修改'}用户成功`);
        //   handleCancel();
        //   console.log('ELRef.value', ELRef.value);
        //   refresh();
        // }
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
      margin-bottom: 30px;
    }
    .ui_image {
      display: block;
      width: 50px;
      height: 50px;
    }
  }
</style>
