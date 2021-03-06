import { ARROW_BOTTOM, ARROW_TOP, ARROW_LEFT, ARROW_RIGHT } from '@libs/utils/constants';
import type { PlacementType, ArrowOffsetType, IPosition } from './index.type';
import { Ref } from 'vue';
import { $, throwError } from '@libs/utils';
import { isObject } from 'lodash';
import { camelize } from '@vue/shared';
import { PlacementEnum } from './index.enum';

export const on = (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options: AddEventListenerOptions = { passive: false }
): void => {
  if (element && event && handler) {
    element.addEventListener(event, handler, options);
  }
};

export const off = (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options: AddEventListenerOptions = { passive: false }
): void => {
  if (element && event && handler) {
    element.removeEventListener(event, handler, options);
  }
};

const setBottomOrTop = (
  current: IPosition,
  sizeObj: DOMRect,
  parent: IPosition,
  currentDom: Ref<HTMLElement>,
  cls: string,
  arrowOffset: ArrowOffsetType,
  currentWidth: number,
  currentHeight: number,
  model: PlacementEnum,
  position?: PlacementEnum
) => {
  if (model === PlacementEnum.Bottom) {
    current.top = parent.top + sizeObj.height + 16;
    addClass($(currentDom), `${cls}__${ARROW_BOTTOM} ${cls}__${ARROW_BOTTOM}__${arrowOffset}`);
  } else if (model === PlacementEnum.Top) {
    current.top = parent.top - sizeObj.height - 30;
    addClass($(currentDom), `${cls}__${ARROW_TOP} ${cls}__${ARROW_TOP}__${arrowOffset}`);
  }
  if (position === PlacementEnum.Left) {
    current.left = parent.left;
  } else if (position === PlacementEnum.Right) {
    current.left = parent.left + (sizeObj.width - currentWidth);
  } else {
    current.left = parent.left + sizeObj.width / 2 - currentWidth / 2;
  }
};

const setLeftOrRight = (
  current: IPosition,
  sizeObj: DOMRect,
  parent: IPosition,
  currentDom: Ref<HTMLElement>,
  cls: string,
  arrowOffset: ArrowOffsetType,
  currentWidth: number,
  currentHeight: number,
  model: PlacementEnum,
  position?: PlacementEnum
) => {
  if (model === PlacementEnum.Left) {
    current.left = parent.left - currentWidth - 10;
    addClass($(currentDom), `${cls}__${ARROW_LEFT} ${cls}__${ARROW_LEFT}__${arrowOffset}`);
  } else if (model === PlacementEnum.Right) {
    current.left = parent.left + sizeObj.width + 10;
    addClass($(currentDom), `${cls}__${ARROW_RIGHT} ${cls}__${ARROW_RIGHT}__${arrowOffset}`);
  }
  if (position === PlacementEnum.Top) {
    current.top = parent.top;
  } else if (position === PlacementEnum.Bottom) {
    current.top = parent.top + sizeObj.height;
  } else {
    current.top = parent.top + sizeObj.height - 16;
  }
};

export const usePositionByParent = (
  parentDom: Ref<HTMLElement>,
  currentDom: Ref<HTMLElement>,
  currentHeight: number = 50,
  currentWidth: number = 50,
  placement: PlacementType = 'bottom' as PlacementType,
  cls: string = 'ly-popper',
  arrowOffset: ArrowOffsetType = 'center' as ArrowOffsetType
) => {
  if (!$(parentDom)?.getBoundingClientRect) {
    throwError('popper', 'should a single node');
  }
  const sizeObj = $(parentDom).getBoundingClientRect();

  const parent = { top: 0, left: 0, right: 0, bottom: 0 };
  const current = { top: 0, left: 0, right: 0, bottom: 0 };
  const bodyWidth = document.body.clientWidth;
  const bodyHeight = document.body.clientHeight;
  const arrowCls = '';

  parent.top = sizeObj.top + document.documentElement.scrollTop;
  parent.left = sizeObj.left + document.documentElement.scrollLeft;
  parent.right = sizeObj.right;
  parent.bottom = sizeObj.bottom;

  const placementArr = placement.split('-');
  let flag;
  switch (placementArr[0]) {
    case PlacementEnum.Bottom:
      flag = bodyHeight - sizeObj.height - parent.top < currentHeight;
      setBottomOrTop(
        current,
        sizeObj,
        parent,
        currentDom,
        cls,
        arrowOffset,
        currentWidth,
        currentHeight,
        flag ? PlacementEnum.Top : PlacementEnum.Bottom,
        placementArr[1] as PlacementEnum
      );
      break;
    case PlacementEnum.Top:
      flag = parent.top < currentHeight;
      setBottomOrTop(
        current,
        sizeObj,
        parent,
        currentDom,
        cls,
        arrowOffset,
        currentWidth,
        currentHeight,
        flag ? PlacementEnum.Bottom : PlacementEnum.Top,
        placementArr[1] as PlacementEnum
      );
      break;
    case PlacementEnum.Left:
      flag = parent.left < currentWidth;
      if (flag) {
        setBottomOrTop(
          current,
          sizeObj,
          parent,
          currentDom,
          cls,
          arrowOffset,
          currentWidth,
          currentHeight,
          PlacementEnum.Bottom
        );
      } else {
        setLeftOrRight(
          current,
          sizeObj,
          parent,
          currentDom,
          cls,
          arrowOffset,
          currentWidth,
          currentHeight,
          PlacementEnum.Left,
          placementArr[1] as PlacementEnum
        );
      }
      break;
    case PlacementEnum.Right:
      flag =
        bodyWidth - parent.left - sizeObj.width < currentWidth || currentHeight / 2 > parent.top + sizeObj.height / 2;
      if (flag) {
        setBottomOrTop(
          current,
          sizeObj,
          parent,
          currentDom,
          cls,
          arrowOffset,
          currentWidth,
          currentHeight,
          PlacementEnum.Bottom
        );
      } else {
        setLeftOrRight(
          current,
          sizeObj,
          parent,
          currentDom,
          cls,
          arrowOffset,
          currentWidth,
          currentHeight,
          PlacementEnum.Right,
          placementArr[1] as PlacementEnum
        );
      }
      break;
    default:
      break;
  }

  const style = {
    position: 'absolute',
    top: `${current.top}px`,
    left: `${current.left}px`
  };
  addStyle($(currentDom), style as CSSStyleDeclaration);

  return arrowCls;
};

export const setTableScrollIntoView = (currentIndex: number, lineHeight: number, currentDom: any, count: number) => {
  if (currentDom.$refs.bodyWrapper.scrollTop === 0) {
    if (currentIndex > count) {
      currentDom.$refs.bodyWrapper.scrollTop = currentIndex * lineHeight;
    }
  } else {
    currentDom.$refs.bodyWrapper.scrollTop = currentIndex * lineHeight;
  }
};

export const trim = function (s: string) {
  return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

export const calcTableCount = (wrapperHeight: number, lineHeight: number) =>
  parseInt(((wrapperHeight - lineHeight - 20) / lineHeight).toString());

export function hasClass(el: HTMLElement, cls: string): boolean {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return ` ${el.className} `.indexOf(` ${cls} `) > -1;
}
export function addClass(el: HTMLElement, cls: string): void {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ` ${clsName}`;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el: HTMLElement, cls: string): void {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ` ${el.className} `;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(` ${clsName} `, ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

export const addStyle = (element: HTMLElement, styleName: CSSStyleDeclaration | string, value?: string) => {
  if (!element || !styleName) return;

  if (isObject(styleName)) {
    Object.keys(styleName).forEach((key) => {
      addStyle(element, key, styleName[key as any]);
    });
  } else {
    styleName = camelize(styleName);
    if (value) {
      element.style[styleName as any] = value;
    }
  }
};
export const removeStyle = (element: HTMLElement, styleName: CSSStyleDeclaration | string) => {
  if (!element || !styleName) return;

  if (isObject(styleName)) {
    Object.keys(styleName).forEach((key) => {
      addStyle(element, key, '');
    });
  } else {
    styleName = camelize(styleName);
    element.style[styleName as any] = '';
  }
};

export const getDomLength = (content: string, fontSize: string = '12px') => {
  let width = 0;
  const html = document.createElement('span');
  html.innerText = content;
  html.style.whiteSpace = 'nowrap';
  html.style.fontSize = fontSize;
  html.className = 'getDomLength';
  document.querySelector('body')?.appendChild(html);
  width = (document.querySelector('.getDomLength') as HTMLElement).offsetWidth;
  (document.querySelector('.getDomLength') as HTMLElement).remove();
  return width;
};
