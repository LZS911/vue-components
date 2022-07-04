import {
  VISIBLE_EVENT,
  UPDATE_VISIBLE_EVENT,
  isArray,
  $,
  isBool,
  getDomLength,
  usePositionByParent
} from '@libs/utils';
import { TriggerActionType } from '@libs/core';
import { ref, Ref, onMounted, computed } from 'vue';
import type { IEventHandle, IPropsOptions } from './index.type';

export function usePopper(props: IPropsOptions, emit: (event: string, ...args: any[]) => void) {
  const triggerRef = ref<Ref<HTMLElement>>(null as any);
  const popperRef = ref<Ref<HTMLElement>>(null as any);
  onMounted(() => {
    usePositionByParent(
      triggerRef,
      popperRef,
      props.popperHeight ? props.popperHeight : undefined,
      props.popperWidth ? props.popperWidth : getDomLength(props.content) + props.boundariesPadding * 2,
      props.placement,
      undefined,
      props.arrowOffset
    );

    if (!!props.popperHeight) $(popperRef).style.height = `${props.popperHeight}px`;
    if (!!props.popperWidth) $(popperRef).style.width = `${props.popperWidth}px`;
    $(popperRef).style.padding = `${props.boundariesPadding}px`;
  });

  const visibleState = ref(false);
  const visibility = computed({
    get() {
      if (props.disabled) return false;
      return isBool(props.visible) ? props.visible : $(visibleState);
    },
    set(val: boolean) {
      isBool(props.visible) ? emit(UPDATE_VISIBLE_EVENT, val) : (visibleState.value = val);
    }
  });

  const _show = () => {
    visibility.value = true;
  };

  const _hide = () => {
    visibility.value = false;
  };

  const show = () => {
    if (props.manualMode || props.disabled) return;
    _show();
    emit(VISIBLE_EVENT, true);
  };
  const hide = () => {
    if (props.manualMode) return;
    _hide();
    emit(VISIBLE_EVENT, false);
  };

  const events: IEventHandle = {};

  const addEventsHandle = (e: Event) => {
    e.stopPropagation();
    switch (e.type) {
      case 'click':
        if ($(visibility)) {
          hide();
        } else {
          show();
        }
        break;
      case 'mouseenter': {
        show();
        break;
      }
      case 'mouseleave': {
        hide();
        break;
      }
      case 'focus': {
        show();
        break;
      }
      case 'blur': {
        hide();
        break;
      }
      default:
        break;
    }
  };

  const eventMap = new Map<TriggerActionType, (keyof IEventHandle)[]>([
    ['click', ['onClick']],
    ['hover', ['onMouseenter', 'onMouseleave']],
    ['focus', ['onFocus', 'onBlur']]
  ]);

  const mapFun = (t: TriggerActionType) => {
    eventMap.get(t)?.forEach((key) => {
      events[key] = addEventsHandle;
    });
  };
  if (isArray(props.trigger)) {
    console.log(props.trigger);
    props.trigger.forEach(mapFun);
  } else {
    mapFun(props.trigger);
  }
  return { triggerRef, popperRef, visibility, events, hide };
}
