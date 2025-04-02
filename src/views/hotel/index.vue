<template>
  <div class="node-conatiner">
    <h3 class="nc_title font18">酒店管理</h3>
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
    />
  </div>
</template>
<script setup lang="ts">
  import { columns } from './constant';
  import type { TablePaginationConfig } from 'ant-design-vue/lib/table';

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
    search: string,
  ): Promise<{ data: any[]; total: number }> => {
    // 这里可以替换为实际的接口调用
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData: any[] = [];
        for (let i = 0; i < 100; i++) {
          mockData.push({
            key: i,
            Address: `Edward King ${i}`,
            BankAccount: 32,
            name: `aa. ${i}`,
            BankAddress: `London, Park Lane no. ${i}`,
          });
        }
        const filteredData = mockData.filter((item) => item.name.includes(search));
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

  // const dataSource = [
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },

  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  //   {
  //     Address: '街道121',
  //     BankAccount: '12344',
  //     BankAddress: '地址',
  //     Company: '公司',
  //     ID: 0,
  //     InvitedBy: '邀请人',
  //     Name: '酒店名称',
  //     SocialCode: '1234567890',
  //     Telephone: '1234567890',
  //   },
  // ];
  const searchText = ref('');
  const tableData = ref<any[]>([]);

  const loadData = async (
    page: number = pagination.value.current ?? 1,
    pageSize: number = pagination.value.pageSize ?? 10,
    search: string = searchText.value ?? '',
  ) => {
    console.info(page, pageSize, search, 'zh----');
    const result = await fetchData(page, pageSize, search);
    tableData.value = result.data;
    pagination.value.total = result.total;
  };

  const handleSearch = () => {
    pagination.value.current = 1;
    loadData();
  };

  // const handleTableChange = (pagination: TablePaginationConfig) => {
  //   const { current, pageSize } = pagination;
  //   loadData(current, pageSize);
  // };

  const handleTableChange = (pag: TablePaginationConfig) => {
    const { current, pageSize } = pag;
    pagination.value.current = current;
    pagination.value.pageSize = pageSize;
    loadData(current, pageSize);
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
