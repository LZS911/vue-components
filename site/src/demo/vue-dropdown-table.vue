<script lang="ts" setup>
import VDropdownTable from '@packages/vue-dropdown-table-gl';
import { ref } from 'vue';

const tableList = [
  { prgName: 'test0', prgNo: 0, prgUrl: 'adfafjdasfalsfjdalfaj123123213123132131313123131313' },
  { prgName: 'test1', prgNo: 1, prgUrl: 'adfafjdasfalsfjdalfaj' },
  { prgName: 'test2', prgNo: 2, prgUrl: 'adfafjdasfalsfjdalfaj' },
  { prgName: 'test3', prgNo: 3, prgUrl: 'adfafjdasfalsfjdalfaj' },
  { prgName: 'test4', prgNo: 4, prgUrl: 'adfafjdasfalsfjdalfaj' },
  { prgName: 'test5', prgNo: 5, prgUrl: 'adfafjdasfalsfjdalfaj' },
  { prgName: 'test6', prgNo: 6, prgUrl: 'adfafjdasfalsfjdalfaj' },
  { prgName: 'test7', prgNo: 7, prgUrl: 'adfafjdasfalsfjdalfaj' },
  { prgName: 'test8', prgNo: 8, prgUrl: 'adfafjdasfalsfjdalfaj' },
  { prgName: 'test9', prgNo: 9, prgUrl: 'adfafjdasfalsfjdalfaj' },
  { prgName: 'test10', prgNo: 10, prgUrl: 'adfafjdasfalsfjdalfaj' },
  { prgName: 'test11', prgNo: 11, prgUrl: 'adfafjdasfalsfjdalfaj' },
  { prgName: 'test12', prgNo: 12, prgUrl: 'adfafjdasfalsfjdalfaj' }
];
const columnList = [
  {
    width: 100,
    label: '菜单名称',
    prop: 'prgName'
  },
  {
    width: 100,
    label: '菜单代号',
    prop: 'prgNo'
  },
  {
    width: 500,
    label: 'url',
    prop: 'prgUrl'
  }
];

const table1 = ref();
const change = (val: any) => {
  console.log(val, 'onChange');
};
</script>
<template>
  <div class="box-wrapper">
    <VDropdownTable
      valueKey="prgNo"
      labelKey="prgName"
      :inputWidth="200"
      :tableWidth="300"
      :tableList="tableList"
      :columnList="columnList"
      v-model="table1"
      placeholder="placeholder"
      @onChange="change"
      size="mini"
    />
  </div>
</template>

<style lang="scss">
@import '@packages/vue-dropdown-table-gl/styles/dropdown-table/index.scss';
.main {
  display: flex;
  flex-wrap: wrap;
  height: 800px;
}
</style>
