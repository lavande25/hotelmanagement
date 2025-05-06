<template>
  <div class="node-conatiner">
    <h3 class="nc_title font18">会员套餐</h3>
    <a-button type="primary" @click="handleAdd" class="add_btn">新增</a-button>

    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span @click="handleEdit(record)"> 编辑 </span>
            <!-- <span @click="handleDelete(record.ID)"> 删除 </span> -->
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
        <a-form-item label="是否是会员" name="IsPrime">
          <a-switch v-model:checked="formModel.IsPrime" />
        </a-form-item>

        <a-form-item label=":套餐名称" name="Name">
          <a-input v-model:value="formModel.Name" placeholder="套餐名称" />
        </a-form-item>
        <a-form-item label="有效期:" name="Month">
          <a-input v-model:value="formModel.Month" pattern="\d*" placeholder="请输入有效期" />
        </a-form-item>
        <a-form-item label="优先级:" name="Priority">
          <a-input v-model:value="formModel.Priority" pattern="\d*" placeholder="请输入优先级" />
        </a-form-item>
        <a-form-item label="价格:" name="Price">
          <a-input v-model:value="formModel.Price" pattern="\d*" placeholder="价格" />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>
<script setup lang="ts">
  import { columns } from './constant';
  import primeAPi from '/@/api/prime';
  import type { FormInstance } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/es/form';
  const FormRef = ref<FormInstance>();
  const labelCol = { style: { width: '110px' } };
  const wrapperCol = { span: 17 };
  import { useMessage } from '/@/hooks/useMessage';
  const { createMessage } = useMessage();

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
    IsPrime: null,
    Name: '',
    Month: 0,
    Priority: 0,
    Price: 0,
  });
  const editId = ref(null);

  //分页数据
  const pagination = ref({
    total: 100, // 设置总记录数，根据总记录数和每页条数计算总页数
    pageSize: 10, // 每页显示的记录数
    current: 1, // 当前页码
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30'],
    showTotal: (total) => `共 ${total} 条`,
  });

  //const searchText = ref('');
  const tableData = ref<any[]>([]);

  const loadData = async (
    Page: number = pagination.value.current ?? 1,
    Size: number = pagination.value.pageSize ?? 10,
    // search: string = searchText.value ?? '',
  ) => {
    const result = await primeAPi.List({ Page, Size });
    tableData.value = result?.Data || [];
    pagination.value.total = result?.Total || 0;
  };

  // const handleSearch = () => {
  //   pagination.value.current = 1;
  //   loadData();
  // };

  const handleTableChange = (paginations) => {
    const { current, pageSize } = paginations;
    pagination.value.current = current;
    pagination.value.pageSize = pageSize;
    loadData();
  };

  const handleCancel = () => {
    modalState.visible = false;
    FormRef.value?.resetFields();
  };

  //新增会员套餐

  const handleAdd = () => {
    FormRef.value?.resetFields();
    modalState.title = '新增会员套餐';
    modalState.okText = '保存';
    modalState.visible = true;
  };

  const handleSubmit = () => {
    FormRef.value
      ?.validate()
      .then(async () => {
        let res;
        formModel.value.Month = Number(formModel.value.Month);
        formModel.value.Priority = Number(formModel.value.Priority);
        formModel.value.Price = Number(formModel.value.Price);
        if (modalState.title === '编辑会员套餐') {
          formModel.value['ID'] = editId.value;
        } else {
          formModel.value['ID'] ? delete formModel.value['ID'] : '';
        }
        modalState.title === '编辑会员套餐'
          ? (res = await primeAPi.update(formModel.value))
          : (res = await primeAPi.add(formModel.value));
        console.info(res, 'res');

        if (!res.ErrorMsg) {
          modalState.visible = false;
          loadData();
        } else {
          createMessage.error(res.ErrorMsg);
        }
      })
      .catch(console.log);
  };

  //编辑

  const handleEdit = (row) => {
    console.info(row, 'row');
    modalState.title = '编辑会员套餐';
    modalState.okText = '保存';
    modalState.visible = true;
    editId.value = row.ID;
    formModel.value.Name = row.Name;
    formModel.value.IsPrime = row.IsPrime;
    formModel.value.Month = row.Month;
    formModel.value.Price = row.Price;
    formModel.value.Priority = row.Priority;
  };

  //删除
  // const handleDelete = (id) => {
  //   console.info('删除', id);
  // };

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
        cursor: pointer;
      }
    }
    .add_btn {
      margin-bottom: 20px;
    }
  }
</style>
