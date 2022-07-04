<script lang="ts" setup>
import VDropdownTable from '@packages/vue-dropdown-table-gl';
import { nextTick, ref } from 'vue';

const tableList = Array.from({ length: 100000 }, (_, i) => ({
  prgName: `test${i}`,
  prgNo: i,
  prgUrl: `adfafjdasfalsfjdalfaj1231232131231321313 +++ ${i}`
}));
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
  nextTick(() => {
    console.log(val, 'onChange', table1.value);
  });
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
