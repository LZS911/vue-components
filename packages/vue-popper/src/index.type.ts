import { ArrowOffsetType, PlacementType, TriggerActionType } from '@libs/core';
import { Slot } from 'vue';

export interface IEventHandle {
  onMouseenter?: (e: Event) => void;
  onMouseleave?: (e: Event) => void;
  onClick?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface IRenderPopperProps {
  ref?: string;
  content?: string;
  visibility?: boolean;
  showArrow?: boolean;
  transition?: string;
}

export interface IRenderTriggerProps {
  ref?: string;
  hide?: () => void;
  popperRef?: HTMLElement;
  events?: IEventHandle;
  manualMode?: boolean;
  className?: string;
  style?: Object;
}

export type InternalSlots = {
  [name: string]: Slot | undefined;
};

export type EmitType = 'update:visible' | 'visible-change';

export interface IPropsOptions {
  arrowOffset: ArrowOffsetType;
  appendBody: boolean;
  autoClose: number;
  content: string;
  class: string;
  disabled: boolean;
  style: Object;
  hideAfter: number;
  manualMode: boolean;
  offset: number;
  placement: PlacementType;
  showArrow: boolean;
  transition: string;
  trigger: TriggerActionType;
  visible: boolean;
  popperWidth?: number;
  popperHeight?: number;
  modelValue?: boolean;
  boundariesPadding: number;
}
