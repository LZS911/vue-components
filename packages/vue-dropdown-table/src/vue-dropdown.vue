<script setup lang="ts">
import { defaultProps, emitData } from './index.data';
import useDropTable from './useDropTable';
import { ElTable, ElTableColumn } from 'element-plus';
import VPopper from '@packages/vue-popper-gl';
import type { ILyDropTableProps } from './index.type';
import 'element-plus/es/components/table/style/css';
import 'element-plus/es/components/table-column/style/css';

const props = defineProps(defaultProps);
const emits = defineEmits(emitData);

const {
  visibility,
  inputRef,
  inputStyle,
  clearValue,
  showClose,
  readonly,
  focus,
  blur,
  tableStyle,
  tHeight,
  tWidth,
  currentPlaceholder,
  showEvent,
  setMultipleBack,
  navigateOptions,
  setRow,
  currentRowClick,
  columnList,
  filterList,
  filterMethod,
  tableRef,
  dropLabel,
  showOrHideEvent,
  SwitchEnum,
  wrapperHovering
} = useDropTable(props as ILyDropTableProps, emits);
</script>

<template>
  <v-popper
    trigger="click"
    placement="bottom-left"
    arrowOffset="left"
    v-model:visible="visibility"
    :popperHeight="tHeight"
    :popperWidth="tWidth"
    :boundariesPadding="6"
    @visibleChange="showOrHideEvent"
  >
    <template #trigger>
      <div
        @mouseover="wrapperHovering = true"
        @mouseleave="wrapperHovering = false"
        class="ly-input"
        :style="inputStyle"
        :class="{ 'ly-drop-table__show': visibility, 'ly-drop-table__disable': disabled }"
      >
        <input
          :placeholder="currentPlaceholder"
          @keyup.enter="setRow"
          @keydown.esc.stop.prevent="visibility = false"
          @keydown.tab="visibility = false"
          @keydown.down.stop.prevent="navigateOptions(SwitchEnum.next)"
          @keydown.up.stop.prevent="navigateOptions(SwitchEnum.prev)"
          @input="filterMethod"
          :readonly="readonly"
          ref="inputRef"
          v-model="dropLabel"
          :class="{ 'ly-input__readonly': readonly }"
        />
        <!-- todo...
        <div :class="visibility ? 'arrow-up' : 'arrow-down'">
          <i v-show="showClose" :class="clearIcon" @click="clearValue"></i>
          <i v-show="!showClose" :class="arrowIcon"></i>
        </div> -->
      </div>
    </template>
    <template #default>
      <teleport to="body" :disabled="!appendToBody">
        <transition :name="transitionName">
          <div class="ly-table" v-show="visibility" :class="[{ 'ly-table__show': visibility }, tableClass]">
            <el-table
              :size="props.size"
              ref="tableRef"
              :data="filterList"
              border
              :width="1000"
              highlight-current-row
              :header-cell-style="headerCellStyle"
              @row-click="currentRowClick"
              :row-class-name="setMultipleBack"
            >
              <el-table-column
                v-for="column in columnList"
                :key="column.prop"
                :prop="column.prop"
                :label="column.label"
                :width="column.width"
              />
            </el-table>
          </div>
        </transition>
      </teleport>
    </template>
  </v-popper>
</template>
