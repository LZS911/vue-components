import { watch } from 'vue';
import type { ConfigurableWindow } from './index.type';
import { tryOnScopeDispose } from './tryOnScopeDispose';
import { MaybeElementRef, unrefElement } from './unrefElement';

export interface ResizeObserverSize {
  readonly inlineSize: number;
  readonly blockSize: number;
}

export interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
  readonly borderBoxSize?: ReadonlyArray<ResizeObserverSize>;
  readonly contentBoxSize?: ReadonlyArray<ResizeObserverSize>;
  readonly devicePixelContentBoxSize?: ReadonlyArray<ResizeObserverSize>;
}

export type ResizeObserverCallback = (entries: ReadonlyArray<ResizeObserverEntry>, observer: ResizeObserver) => void;

export interface ResizeObserverOptions extends ConfigurableWindow {
  box?: 'content-box' | 'border-box';
}

declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);
  disconnect(): void;
  observe(target: Element, options?: ResizeObserverOptions): void;
  unobserve(target: Element): void;
}

export function useResizeObserver(
  target: MaybeElementRef,
  callback: ResizeObserverCallback,
  options: ResizeObserverOptions = {}
) {
  const { window, ...observerOptions } = options;
  let observer: ResizeObserver | undefined;
  const isSupported = window && 'ResizeObserver' in window;

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  const stopWatch = watch(
    () => unrefElement(target),
    (el) => {
      cleanup();

      if (isSupported && window && el) {
        observer = new ResizeObserver(callback);
        observer!.observe(el, observerOptions);
      }
    },
    { immediate: true, flush: 'post' }
  );

  const stop = () => {
    cleanup();
    stopWatch();
  };

  tryOnScopeDispose(stop);

  return {
    isSupported,
    stop
  };
}

export type UseResizeObserverReturn = ReturnType<typeof useResizeObserver>;
