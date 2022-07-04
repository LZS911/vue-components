<script setup lang="ts">
import { useVirtualList } from '@vueuse/core';
import { scroll as vScroll } from '@libs/directives';
import { ref } from 'vue';
const ref2 = ref();
const scroll1 = () => {};
const scroll2 = () => {};

const list = Array.from({ length: 1000 }, (_, i) => `${i} ========== `);

const { list: realList, containerProps, wrapperProps } = useVirtualList(list, { overscan: 5, itemHeight: 22 });
</script>

<template>
  <div class="box-wrapper">
    <div class="wrapper" v-scroll="scroll1" v-scroll:[ref2]="scroll2"><div class="children">children1</div></div>
    <div class="wrapper" ref="ref2"><div class="children">children2</div></div>
    <div v-bind="(containerProps as any)" class="wrapper">
      <ul v-bind="wrapperProps">
        <li v-for="v in realList">{{ v.data }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  margin-bottom: 30px;
  border: 1px solid #eee;
  width: 300px;
  height: 300px;
  overflow: scroll;

  .children {
    height: 600px;
  }
}
</style>
