import { PropType } from 'vue';
import { ArrowOffsetType, PlacementType, TriggerActionType } from '@libs/core';

const DEFAULT_TRIGGER = 'hover';

export const emitData = ['focus', 'blur', 'onChange', 'update:modelValue', 'visible-change', 'update:visible'];

export const defaultProps = {
  appendBody: {
    type: Boolean,
    default: true
  },
  autoClose: {
    type: Number,
    default: 0
  },

  content: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  style: Object,
  hideAfter: {
    type: Number,
    default: 200
  },
  showAfter: {
    type: Number,
    default: 0
  },
  manualMode: {
    type: Boolean,
    default: false
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String as PropType<PlacementType>,
    default: 'bottom' as PlacementType
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  transition: {
    type: String,
    default: 'el-fade-in-linear'
  },
  trigger: {
    type: [String, Array] as PropType<TriggerActionType>,
    default: DEFAULT_TRIGGER
  },
  visible: {
    type: Boolean,
    default: undefined
  },
  arrowOffset: {
    type: String as PropType<ArrowOffsetType>,
    default: 'center' as ArrowOffsetType
  },
  popperWidth: {
    type: Number
  },
  popperHeight: {
    type: Number
  },
  modelValue: {
    type: Boolean,
    validator: (val: unknown) => typeof val === 'boolean',
    default: undefined
  },
  boundariesPadding: {
    type: Number,
    default: 8
  }
};
