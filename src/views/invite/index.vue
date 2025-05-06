<template>
  <div class="node-conatiner">
    <h3 class="nc_title font18">邀请记录</h3>
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
    />
  </div>
</template>

<script setup lang="ts">
  import { columns } from './constant';
  import inviteAPi from '/@/api/invite';
  // import { useMessage } from '/@/hooks/useMessage';
  // const { createMessage } = useMessage();

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
    //Hotel: string = searchText.value ?? '',
  ) => {
    const result = await inviteAPi.inviteList({ Page, Size });
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
    .btn_search {
      top: 62px;
      right: -48px;
      position: absolute;
      width: 340px;
    }
  }
</style>
