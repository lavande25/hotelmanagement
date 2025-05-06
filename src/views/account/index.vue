<template>
  <a-spin :spinning="loading">
    <div class="title font18">用户信息</div>
    <div class="content">
      <div class="content_left">
        <!-- <div class="img"><img src="" alt="" /></div> -->
        <!-- <a-avatar :size="100" :src="avatar" /> -->
      </div>
      <div class="content_right">
        <a-row class="row" v-for="item in columns" :key="item.label">
          <a-col :span="12">
            <a-space>
              <div class="label-w">{{ item.label }}</div>
              <div>
                <a-input v-model:value="accountInfo[item.key]" />
              </div>
            </a-space>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-space class="save_btn">
              <a @click="handleSubmit">保存</a>
            </a-space>
          </a-col>
        </a-row>
      </div>
    </div>
  </a-spin>
</template>
<script setup lang="ts">
  //import avatar from '/@/assets/images/avatar.png';
  import { KeyValue } from './constant';
  import accountAPi from '/@/api/sys/account';
  import { useMessage } from '/@/hooks/useMessage';
  const { createMessage } = useMessage();
  //import { useSysAccountStore } from '/@/store/modules/sysAccount';
  // import { useMessage } from '/@/hooks/useMessage';

  //const { createMessage } = useMessage();
  //const store = useSysAccountStore();

  // const initVal = {
  //   key: '',
  //   value: '',
  // };
  const accountInfo = ref({
    Telephone: '',
    Password: '',
    OldPassword: '',
  });

  const loading = ref(false);
  const columns = ref(KeyValue);
  //const modifyItem = ref(initVal);
  //const account = computed(() => store.getAccount);

  // watch(
  //   () => account.value,
  //   (val) => {
  //     columns.value = KeyValue.map((n) => ({
  //       ...n,
  //       value: toRaw(val)?.[n.key] || n.value,
  //     }));
  //   },
  // );

  //onMounted(() =>
  // store.fetchAccount()
  //);

  //onUnmounted(() =>
  //store.resetState()
  //);

  //
  // const handleClick = (item) => {
  //   modifyItem.value = item.key === 'password' ? { ...item, value: '' } : item;
  // };

  // const handleCancle = () => {
  //   //  modifyItem.value = initVal;
  // };

  const handleSubmit = async () => {
    console.info(accountInfo.value, 'accountInfo');
    const result = await accountAPi.update(accountInfo.value);
    console.info(result, 'result');
    if (!result.ErrorMsg) {
      createMessage.success('修改成功');
      accountInfo.value.OldPassword = '';
      accountInfo.value.Telephone = '';
      accountInfo.value.Password = '';
    } else {
      createMessage.error(result.ErrorMsg);
    }
  };
</script>
<style lang="less" scoped>
  .title {
    margin-top: -24px;
    height: 105px;
    line-height: 105px;
    padding-left: 29px;
  }
  .content {
    display: flex;
    &_left {
      padding-left: 15px;
      margin-right: 24px;
      // .img {
      //   width: 100px;
      //   height: 100px;
      //   border-radius: 50%;
      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }
    }
    &_right {
      flex: 1;
      padding-bottom: 44px;
      .row {
        height: 53px;
        padding-left: 24px;
        line-height: 53px;
        font-size: 14px;
        color: #333333;
        .label-w {
          width: 80px;
        }
        &:nth-child(odd) {
          background-color: #fafafa;
        }
      }
    }
    .save_btn {
      font-size: 18px;
      margin-top: 30px;
      margin-left: 30px;
    }
  }
</style>
