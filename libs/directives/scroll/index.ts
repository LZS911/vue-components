import { isArray, isFunction, isHTMLElement, off, on } from '@libs/utils';
import { DirectiveBinding, ObjectDirective } from 'vue';

type ScrollVNodeDirective =
  | EventListener
  | {
      handler: EventListener;
      options?: boolean | AddEventListenerOptions;
    }
  | (EventListenerObject & { options?: boolean | AddEventListenerOptions });

const createTargetHandler = (el: HTMLElement, binding: DirectiveBinding<ScrollVNodeDirective>, unbind = false) => {
  const { arg, value } = binding;
  const includes: HTMLElement[] = [];
  if (isArray(arg)) {
    arg.forEach((item) => {
      if (isHTMLElement(item)) {
        includes.push(item);
      }
    });
  } else if (isHTMLElement(arg)) {
    includes.push(arg);
  }
  const target = arg ? (includes.length > 0 ? includes : el) : el;
  const handle = isFunction(value) || 'handleEvent' in value ? value : value?.handler;

  if (!target || !handle) {
    return;
  }

  if (isArray(target)) {
    target.forEach((v) => {
      unbind ? off(v, 'scroll', handle) : on(v, 'scroll', handle);
    });
  } else {
    unbind ? off(target, 'scroll', handle) : on(target, 'scroll', handle);
  }
};

const scroll: ObjectDirective = {
  updated(el: HTMLElement, binding: DirectiveBinding<ScrollVNodeDirective>) {
    createTargetHandler(el, binding);
  },
  unmounted(el: HTMLElement, binding: DirectiveBinding<ScrollVNodeDirective>) {
    createTargetHandler(el, binding, true);
  }
};

export default scroll;
