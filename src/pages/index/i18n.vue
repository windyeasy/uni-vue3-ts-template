<route lang="json">
{
  "style": {
    "navigationBarTitleText": "%app.name%"
  }
}
</route>

<template>
  <view class="center flex-col mt-6">
    <view class="text-green-500">多语言测试</view>
    <view class="m-4">{{ $t('app.name') }}</view>

    <view class="text-green-500 mt-12">切换语言 </view>
    <view class="uni-list">
      <radio-group @change="radioChange" class="radio-group">
        <label
          class="uni-list-cell uni-list-cell-pd"
          v-for="item in languages"
          :key="item.value"
        >
          <view>
            <radio :value="item.value" :checked="item.value === current" />
          </view>
          <view>{{ item.name }}</view>
        </label>
      </radio-group>
    </view>

    <!-- http://localhost:9000/#/pages/index/i18n -->
    <button @click="testI18n" class="mt-20 mb-44">测试弹窗</button>
  </view>
</template>

<script lang="ts" setup>
import i18n from '@/locale/index'
import { testI18n } from '@/utils/index'

const current = ref(uni.getLocale())
const languages = [
  {
    value: 'zh-Hans',
    name: '中文',
    checked: 'true',
  },
  {
    value: 'en',
    name: '英文',
  },
]

const radioChange = (evt: any) => {
  // console.log(evt)
  current.value = evt.detail.value
  // 下面2句缺一不可！！！
  uni.setLocale(evt.detail.value)
  i18n.global.locale = evt.detail.value
}
</script>

<style lang="scss">
.uni-list {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
}

.radio-group {
  width: 200px;
  margin: 10px auto;
  border-radius: 12px;
}

.uni-list-cell {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #bcecd1;
}
</style>
