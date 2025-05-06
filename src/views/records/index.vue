<template>
  <div class="node-conatiner">
    <h3 class="nc_title font18">操作记录</h3>
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
        <template v-if="column.dataIndex === 'TimestampFrom'">
          <span>{{ record.TimestampFrom ? formatToDate(record.TimestampFrom) : '' }}</span>
        </template>
        <template v-if="column.dataIndex === 'TmestampTo'">
          <span>{{ record.TmestampTo ? formatToDate(record.TmestampTo) : '' }}</span>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
  import { columns } from './constant';
  import recordsAPi from '/@/api/records';
  import { formatToDate } from '/@/utils/dateUtil';

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
    Module: string = searchText.value ?? '',
  ) => {
    console.info(Page, Size, Module, 'zh----');
    const result = await recordsAPi.recordsList({ Page, Size, Module });
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
  }
</style>
