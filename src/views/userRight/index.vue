<template>
  <div class="node-conatiner">
    <h3 class="nc_title font18">会员权益</h3>
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
            <span @click="updateTime(record)"> 修改会员时长 </span>
          </div>
        </template>
        <template v-if="column.dataIndex === 'Note'">
          <a-tooltip :title="record.Note">
            <span>{{ record.Note.substring(0, 5) + '...' }}</span>
          </a-tooltip>
        </template>
        <template v-if="column.dataIndex === 'PlanExpire'">
          <span>{{ formatToDate(record.PlanExpire) }}</span>
        </template>
      </template>
    </a-table>
    <Modal v-bind="modalState" @cancel="handleCancel" @ok="handleSubmit">
      <a-form ref="FormRef" :model="formModel" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="套餐到期时间:" name="PlanExpire">
          <a-date-picker v-model:value="formModel.PlanExpire" value-format="YYYY-MM-DD" />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { columns } from './constant';
  import userrightAPi from '/@/api/userRight';
  import { useMessage } from '/@/hooks/useMessage';
  const { createMessage } = useMessage();
  import type { FormInstance } from 'ant-design-vue';
  import { formatToDate } from '/@/utils/dateUtil';
  //import type { Rule } from 'ant-design-vue/es/form';
  const FormRef = ref<FormInstance>();
  const labelCol = { style: { width: '140px' } };
  const wrapperCol = { span: 17 };

  // modal
  const modalState = reactive({
    loading: false,
    visible: false,
    title: '修改会员时长',
    okText: '保存',
  });

  //form表单

  const formModel = ref({
    PlanExpire: '',
    ID: '',
    PrimePlanID: '',
  });

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
    UserName: string = searchText.value ?? '',
  ) => {
    const result = await userrightAPi.List({ Page, Size, UserName });
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

  // const handleDateChange = (dayjsDate) => {
  //   dayjs.extend(utcPlugin);
  //   dayjs.extend(timezonePlugin);
  //   if (dayjsDate) {
  //     // 设置为亚洲/上海时区（东八区）
  //     const formattedDate = dayjsDate
  //       .tz('Asia/Shanghai') // 转换为目标时区
  //       .startOf('day') // 时间设为 00:00:00
  //       .format('YYYY-MM-DDTHH:mm:ssZ'); // 格式化输出
  //     console.log(formattedDate, 'formattedDate');
  //     dateValue.value = formattedDate;
  //   }
  // };
  const updateTime = (row) => {
    console.info(row.PrimePlanID, 'row----');
    modalState.title = '修改会员时长';
    modalState.okText = '保存';
    modalState.visible = true;
    formModel.value.ID = row.ID;
    formModel.value.PrimePlanID = row.PrimePlanID;
    formModel.value.PlanExpire = formatToDate(row.PlanExpire);
  };

  const Handlereset = () => {
    searchText.value = '';
    loadData();
  };

  const handleCancel = () => {
    modalState.visible = false;
    FormRef.value?.resetFields();
  };

  const handleSubmit = () => {
    console.info(formModel.value, 'formModel.value');
    FormRef.value
      ?.validate()
      .then(async () => {
        const submitData = {
          ...formModel.value,
          PlanExpire: formModel.value.PlanExpire + 'T00:00:00+08:00',
        };
        const res = await userrightAPi.edit(submitData);
        console.info('res,', res);
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

  //删除
  // const handleDelete = async (ID) => {
  //   // console.info('删除', id);
  //   const result = await hotelAPi.deleteHotel({ ID });
  //   if (result && result.Data) {
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
      margin-bottom: 60px;
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
