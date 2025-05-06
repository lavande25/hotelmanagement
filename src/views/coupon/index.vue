<template>
  <div class="node-conatiner">
    <h3 class="nc_title font18">优惠卷管理</h3>
    <div class="btn_add"> <a-button type="primary" @click="handleAdd">新增</a-button></div>
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
        <template v-if="column.dataIndex === 'ExpireAt'">
          <span>{{ record.ExpireAt ? formatToDate(record.ExpireAt) : '' }}</span>
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
        <a-form-item label="有效期:" name="ExpireAt">
          <a-date-picker v-model:value="formModel.ExpireAt" value-format="YYYY-MM-DD" />
        </a-form-item>
        <!-- <a-form-item label="ID:" name="ID">
          <a-input v-model:value="formModel.ID" placeholder="请输入ID" />
        </a-form-item> -->
        <a-form-item label="是否使用过" name="IsUsed">
          <a-switch v-model:checked="formModel.IsUsed" />
        </a-form-item>
        <a-form-item label="价格:" name="Price">
          <a-input v-model:value="formModel.Price" placeholder="请输入价格" />
        </a-form-item>
        <a-form-item label="备注:" name="Note">
          <a-input v-model:value="formModel.Note" placeholder="请输入备注" />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { columns } from './constant';
  import couponAPi from '/@/api/coupon';
  import dayjs from 'dayjs';
  import utcPlugin from 'dayjs/plugin/utc';
  import { formatToDate } from '/@/utils/dateUtil';
  import timezonePlugin from 'dayjs/plugin/timezone';
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
    ID: [{ required: true, trigger: 'blur' }],
    Price: [{ required: true, trigger: 'blur' }],
    Note: [{ required: true, trigger: 'blur' }],
    ExpireAt: [
      {
        required: true,
        trigger: 'change',
        validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请选择角色')),
      },
    ],
  };

  const formModel = ref({
    ExpireAt: '',
    // ID: '',
    IsUsed: '',
    Price: '',
    Note: '',
  });
  //const dateValue = ref();

  const handleCancel = () => {
    modalState.visible = false;
    FormRef.value?.resetFields();
  };

  const Handlereset = () => {
    searchText.value = '';
    loadData();
  };

  //新增会员套

  const handleAdd = () => {
    modalState.title = '新增优惠卷';
    modalState.okText = '保存';
    modalState.visible = true;
  };
  dayjs.extend(utcPlugin);
  dayjs.extend(timezonePlugin);

  const handleSubmit = () => {
    console.info(formModel.value, 'formModel.value');
    FormRef.value
      ?.validate()
      .then(async () => {
        const submitData = {
          ...formModel.value,
          ExpireAt: formModel.value.ExpireAt + 'T00:00:00+08:00',
          Price: Number(formModel.value.Price),
        };
        const res = await couponAPi.addCoupon(submitData);
        if (!res.ErrorMsg) {
          createMessage.success('成功');
          loadData();
          modalState.visible = false;
        } else {
          createMessage.error(res.ErrorMsg);
        }
      })
      .catch((err) => {
        console.info(err);
      });
  };

  // 配置分页
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
    // Hotel: string = searchText.value ?? '',
  ) => {
    const result = await couponAPi.couponList({ Page, Size });
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

  //删除
  // const handleDelete = async (ID) => {
  //   // console.info('删除', id);
  //   const result = await hotelAPi.deleteHotel({ ID });
  //   if (result.Data) {
  //     createMessage.success('删除成功');
  //     loadData();
  //   } else {
  //     createMessage.error('删除失败');
  //   }
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
    .btn_add {
      margin-bottom: 10px;
    }
  }
</style>
