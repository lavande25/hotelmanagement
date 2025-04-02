<template>
  <div class="node-conatiner">
    <h3 class="nc_title font18">会员套餐</h3>
    <a-button type="primary" @click="handleAdd">新增</a-button>

    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span @click="handleEdit(record.ID)"> 编辑 </span>
            <span @click="handleDelete(record.ID)"> 删除 </span>
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
        <a-form-item label="ID:" name="id">
          <a-input v-model:value="formModel.ID" placeholder="请输入id" />
        </a-form-item>
        <a-form-item label=":套餐名称" name="Name">
          <a-input v-model:value="formModel.Name" placeholder="套餐名称" />
        </a-form-item>
        <a-form-item label="有效期:" name="Month">
          <a-input v-model:value="formModel.Month" placeholder="请输入有效期" />
        </a-form-item>
        <a-form-item label="优先级:" name="Priority">
          <a-input v-model:value="formModel.Priority" placeholder="请输入用户手机号" />
        </a-form-item>
        <a-form-item label="价格:" name="Price">
          <a-input v-model:value="formModel.Price" placeholder="价格" />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>
<script setup lang="ts">
  import { columns } from './constant';
  import type { TablePaginationConfig } from 'ant-design-vue/lib/table';
  import type { FormInstance } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/es/form';
  const FormRef = ref<FormInstance>();
  const labelCol = { style: { width: '110px' } };
  const wrapperCol = { span: 17 };

  // modal
  const modalState = reactive({
    loading: false,
    visible: false,
    title: '新增会员套餐',
    okText: '添加',
  });

  const rules: Record<string, Rule[]> = {
    mobile: [{ required: true, trigger: 'blur' }],
    role_id: [
      {
        required: true,
        trigger: 'change',
        validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请选择角色')),
      },
    ],
  };

  const formModel = ref({
    ID: '',
    Name: '',
    Month: '',
    Priority: '',
    Price: '',
  });

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
  ): Promise<{ data: any[]; total: number }> => {
    // 这里可以替换为实际的接口调用
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData: any[] = [];
        for (let i = 0; i < 100; i++) {
          mockData.push({
            ID: i,
            Priority: i,
            Price: `1${i}`,
            Month: `2025-040${i}`,
            Name: `aa. ${i}`,
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

  //const searchText = ref('');
  const tableData = ref<any[]>([]);

  const loadData = async (
    page: number = pagination.value.current ?? 1,
    pageSize: number = pagination.value.pageSize ?? 10,
    // search: string = searchText.value ?? '',
  ) => {
    console.info(page, pageSize, 'zh----');
    const result = await fetchData(page, pageSize);
    tableData.value = result.data;
    pagination.value.total = result.total;
  };

  // const handleSearch = () => {
  //   pagination.value.current = 1;
  //   loadData();
  // };

  const handleTableChange = (pag: TablePaginationConfig) => {
    const { current, pageSize } = pag;
    pagination.value.current = current;
    pagination.value.pageSize = pageSize;
    loadData(current, pageSize);
  };

  const handleCancel = () => {
    modalState.visible = false;
    FormRef.value?.resetFields();
  };

  //新增会员套餐

  const handleAdd = () => {
    modalState.title = '新增会员套餐';
    modalState.okText = '保存';
    modalState.visible = true;
  };

  const handleSubmit = () => {
    FormRef.value
      ?.validate()
      .then(async () => {
        // modalState.loading = true;
        // const req = modalState.title === '新增用户' ? store.fetchCreate : store.fetchUpdate;
        // const res = await mockReq(formModel.value);
        // modalState.loading = false;
      })
      .catch(console.log);
  };

  //编辑

  const handleEdit = (id) => {
    console.info(id);
    modalState.title = '编辑会员套餐';
    modalState.okText = '保存';
    modalState.visible = true;
  };

  //删除
  const handleDelete = (id) => {
    console.info('删除', id);
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
      // #3860F4
    }
    .editable-row-operations {
      span {
        color: #3860f4;
        padding-left: 10px;
      }
    }
  }
</style>
