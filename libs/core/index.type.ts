import { Ref } from 'vue';

export type PlacementType =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'left-bottom'
  | 'left-top'
  | 'right'
  | 'right-top'
  | 'right-bottom'
  | 'top'
  | 'top-left'
  | 'top-right';

export type ArrowOffsetType = 'left' | 'center' | 'right';
export type TriggerAction = 'click' | 'hover' | 'focus' | 'manual';

export type TriggerActionType = TriggerAction | TriggerAction[];

export interface IPosition {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export type MaybeRef<T> = T | Ref<T>;
export type Fn = () => void;
export interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window;
}
