<template>
  <div class="node-conatiner">
    <h3 class="nc_title font18">用户管理</h3>
    <!-- <a-button type="primary" @click="handleAdd">新增</a-button> -->
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
            <span @click="handleUser(record.ID, 'ban')"> 禁封用户 </span>
          </div>
          <div class="editable-row-operations">
            <span @click="handleUser(record.ID, 'admin')"> 设置用户 </span>
          </div>
        </template>
        <template v-if="column.dataIndex === 'WxOpenID'">
          <a-tooltip :title="record.WxOpenID">
            <span>{{ record.WxOpenID.substring(0, 5) + '...' }}</span>
          </a-tooltip>
        </template>
        <template v-if="column.dataIndex === 'WxCode'">
          <a-tooltip :title="record.WxCode">
            <span>{{ record.WxCode.substring(0, 5) + '...' }}</span>
          </a-tooltip>
        </template>
      </template>
    </a-table>

    <Modal v-bind="modalState" @cancel="handleCancel" @ok="handleSubmit">
      <a-form ref="FormRef" :model="formModel" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="ID:" name="id">
          <a-input v-model:value="formModel.ID" :disabled="true" />
        </a-form-item>

        <a-form-item
          :label="modalState.title === '禁封用户' ? '是否禁封:' : '是否设置为管理员:'"
          name="IsBan"
        >
          <a-switch v-model:checked="formModel.IsBan" v-if="modalState.title === '禁封用户'" />
          <a-switch v-model:checked="formModel.IsAdmin" v-else />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>
<script setup lang="ts">
  import { columns } from './constant';
  import manageUserAPi from '/@/api/manageUser';
  import type { FormInstance } from 'ant-design-vue';
  //import type { Rule } from 'ant-design-vue/es/form';
  const FormRef = ref<FormInstance>();
  const labelCol = { style: { width: '140px' } };
  const wrapperCol = { span: 17 };
  import { useMessage } from '/@/hooks/useMessage';
  const { createMessage } = useMessage();

  // modal
  const modalState = reactive({
    loading: false,
    visible: false,
    title: '禁封用户',
    okText: '保存',
  });

  // 规则
  // const rules: Record<string, Rule[]> = {
  //   mobile: [{ required: true, trigger: 'blur' }],
  //   role_id: [
  //     {
  //       required: true,
  //       trigger: 'change',
  //       validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请选择角色')),
  //     },
  //   ],
  // };

  //form表单

  const formModel = ref({
    ID: '',
    IsBan: '',
    IsAdmin: '',
  });

  //分页数据

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
    User: string = searchText.value ?? '',
  ) => {
    const result = await manageUserAPi.List({ Page, Size, User });
    tableData.value = result?.Data || [];
    pagination.value.total = result?.Total || 0;
  };

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

  const handleCancel = () => {
    modalState.visible = false;
    FormRef.value?.resetFields();
  };

  const Handlereset = () => {
    searchText.value = '';
    loadData();
  };

  const handleSubmit = () => {
    FormRef.value
      ?.validate()
      .then(async () => {
        let params = {};
        if (modalState.title === '禁封用户') {
          params = {
            ID: formModel.value.ID,
            IsBan: formModel.value.IsBan,
          };
        } else {
          params = {
            ID: formModel.value.ID,
            IsAdmin: formModel.value.IsAdmin,
          };
        }

        const res = await manageUserAPi.ban(params);
        console.info(res, 'res');
        if (!res.ErrorMsg) {
          createMessage.success('操作成功');
          loadData();
          modalState.visible = false;
        } else {
          createMessage.error(res.ErrorMsg);
        }
      })
      .catch(console.log);
  };

  //禁封用户

  const handleUser = (id, status) => {
    console.info(id, status, 'id, status');
    modalState.title = status === 'ban' ? '禁封用户' : '设置用户';
    modalState.okText = '保存';
    modalState.visible = true;
    formModel.value.ID = id;
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
      top: 62px;
      right: -48px;
      position: absolute;
      width: 340px;
    }
  }
</style>
