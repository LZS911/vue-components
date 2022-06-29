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
