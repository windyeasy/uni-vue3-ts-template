<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<script lang="ts" setup>
const content = ref<string>('')
setTimeout(() => {
  content.value = `
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
      123中噶大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊, 11111111111111111111
    `
}, 3000)
</script>

<template>
  <div class="home">
    <div>
      {{ content }}
    </div>
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non nisi
      expedita nesciunt iste ratione quas, hic repellat sequi temporibus
      cupiditate unde tempore nemo odio autem voluptas. Hic ipsum debitis
      nostrum.
    </div>
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non nisi
      expedita nesciunt iste ratione quas, hic repellat sequi temporibus
      cupiditate unde tempore nemo odio autem voluptas. Hic ipsum debitis
      nostrum.
    </div>
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non nisi
      expedita nesciunt iste ratione quas, hic repellat sequi temporibus
      cupiditate unde tempore nemo odio autem voluptas. Hic ipsum debitis
      nostrum.
    </div>
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non nisi
      expedita nesciunt iste ratione quas, hic repellat sequi temporibus
      cupiditate unde tempore nemo odio autem voluptas. Hic ipsum debitis
      nostrum.
    </div>
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non nisi
      expedita nesciunt iste ratione quas, hic repellat sequi temporibus
      cupiditate unde tempore nemo odio autem voluptas. Hic ipsum debitis
      nostrum.
    </div>
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non nisi
      expedita nesciunt iste ratione quas, hic repellat sequi temporibus
      cupiditate unde tempore nemo odio autem voluptas. Hic ipsum debitis
      nostrum.
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
