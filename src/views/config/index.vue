<template>
  <div class="node-conatiner">
    <h3 class="nc_title font18">配置管理</h3>
    <!-- :data-source="dataSource" -->
    <!-- <a-input-search
      v-model:value="searchText"
      placeholder="请输入搜索内容"
      @search="handleSearch"
      style="width: 200px; margin-bottom: 16px"
    /> -->
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
        <template v-if="column.dataIndex === 'Value'">
          <a-tooltip :title="record.Value">
            <span>{{ record.Value.substring(0, 5) + '...' }}</span>
          </a-tooltip>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span @click="updateConfig(record)"> 更新配置 </span>
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
  </div>
</template>

<script setup lang="ts">
  import { columns } from './constant';
  import configAPi from '/@/api/config';
  import { formatToDate } from '/@/utils/dateUtil';
  import { useMessage } from '/@/hooks/useMessage';
  const { createMessage } = useMessage();

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
    Search: string = searchText.value ?? '',
  ) => {
    const result = await configAPi.configList({ Page, Size, Search });
    console.info();
    if (!result.ErrorMsg) {
      tableData.value = result?.Data || [];
      pagination.value.total = result?.Total || 0;
    } else {
      createMessage.error(result.ErrorMsg);
    }
  };

  const handleSearch = () => {
    pagination.value.current = 1;
    loadData();
  };

  const updateConfig = async (record: any) => {
    console.info(record, 'zh----');
    const params = {
      Value: record.Value,
      Key: record.Key,
    };
    const res = await configAPi.configUpdate({ params });
    if (!res.ErrorMsg) {
      createMessage.success('更新成功');
      loadData();
    } else {
      createMessage.error(res.ErrorMsg);
    }
  };

  // const handleTableChange = (pagination: TablePaginationConfig) => {
  //   const { current, pageSize } = pagination;
  //   loadData(current, pageSize);
  // };
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
