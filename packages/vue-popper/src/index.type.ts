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
