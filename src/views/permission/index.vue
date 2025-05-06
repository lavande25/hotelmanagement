<template>
  <div class="node-conatiner">
    <h3 class="nc_title font18">权限管理</h3>
    <!-- <a-button type="primary" @click="handleAdd">新增</a-button>
    <a-input-search
      v-model:value="searchText"
      placeholder="请输入搜索内容"
      @search="handleSearch"
      style="width: 200px; margin-bottom: 16px"
    /> -->
    <!-- <div class="btn_add"> <a-button type="primary" @click="handleAdd">新增</a-button></div> -->
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
        <a-form-item label="ID:" name="id">
          <a-input v-model:value="formModel.ID" placeholder="请输入id" />
        </a-form-item>
        <a-form-item label="名称:" name="Name">
          <a-input v-model:value="formModel.Name" placeholder="请输入id" />
        </a-form-item>
        <a-form-item label="角色:" name="Role">
          <a-select
            v-model:value="formModel.Role"
            :options="roleOptions"
            placeholder="请选择角色"
          />
        </a-form-item>
        <a-form-item label="是否显示:" name="IsVisible">
          <a-switch v-model:checked="formModel.IsVisible" />
        </a-form-item>
        <a-form-item label="模块:" name="Module">
          <a-input v-model:value="formModel.Module" placeholder="请输入模块" />
        </a-form-item>
        <a-form-item label="方法:" name="Methods">
          <a-input v-model:value="formModel.Methods" placeholder="请输入方法" />
        </a-form-item>

        <a-form-item label="url:" name="Url">
          <a-input v-model:value="formModel.Url" placeholder="请输入url" />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>
<script setup lang="ts">
  import { columns } from './constant';
  import permAPi from '/@/api/perm';
  //import type { TablePaginationConfig } from 'ant-design-vue/lib/table';
  import type { FormInstance } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/es/form';
  const FormRef = ref<FormInstance>();
  const labelCol = { style: { width: '110px' } };
  const wrapperCol = { span: 17 };
  import { useMessage } from '/@/hooks/useMessage';
  const { createMessage } = useMessage();

  const roleOptions = computed(() => [
    { label: '超级管理员', value: 'superuser' },
    { label: '操作员', value: 'operator' },
    { label: '财务员', value: 'financial' },
  ]);

  // modal
  const modalState = reactive({
    loading: false,
    visible: false,
    title: '新增权限',
    okText: '保存',
  });

  // 规则
  const rules: Record<string, Rule[]> = {
    Name: [{ required: true, trigger: 'blur' }],
    ID: [{ required: true, trigger: 'blur' }],
    Url: [{ required: true, trigger: 'blur' }],
    Role: [
      {
        required: true,
        trigger: 'change',
        validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请选择角色')),
      },
    ],
  };

  //form表单

  const formModel = ref({
    ID: '',
    Name: '',
    IsVisible: '',
    Role: '',
    Module: '',
    Methods: '',
    Url: '',
  });

  //分页数据
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
    Name: string = searchText.value ?? '',
  ) => {
    const result = await permAPi.List({ Page, Size, Name });
    tableData.value = result?.Data || [];
    pagination.value.total = result?.Total || 0;
  };

  const handleSearch = () => {
    pagination.value.current = 1;
    loadData();
  };

  const Handlereset = () => {
    searchText.value = '';
    loadData();
  };

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

  //新增

  // const handleAdd = () => {
  //   modalState.visible = false;
  //   modalState.title = '新增权限';
  //   modalState.okText = '保存';
  //   modalState.visible = true;
  // };

  const handleSubmit = () => {
    FormRef.value
      ?.validate()
      .then(async () => {
        let res: any;
        modalState.title === '编辑权限'
          ? (res = await permAPi.update(formModel.value))
          : (res = await permAPi.add(formModel.value));
        if (!res.ErrorMsg) {
          modalState.visible = false;
          loadData();
          createMessage.success('操作成功');
        } else {
          createMessage.error(res.ErrorMsg);
        }
      })
      .catch(console.log);
  };

  //编辑

  const handleEdit = (row) => {
    console.info(row);
    modalState.title = '编辑权限';
    modalState.okText = '保存';
    modalState.visible = true;
    formModel.value.IsVisible = row.IsVisible;
    formModel.value.Methods = row.Methods;
    formModel.value.Module = row.Module;
    formModel.value.ID = row.ID;
    formModel.value.Role = row.Role;
    formModel.value.Name = row.Name;
    formModel.value.Url = row.Url;
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
      margin-bottom: 60px;
      // #3860F4
    }
    .editable-row-operations {
      span {
        color: #3860f4;
        padding-left: 10px;
        cursor: pointer;
      }
    }
    .btn_search {
      top: 82px;
      right: -41px;
      position: absolute;
      width: 340px;
    }
    // .btn_add {
    //   margin-bottom: 10px;
    // }
  }
</style>
