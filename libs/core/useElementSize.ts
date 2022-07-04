import { ref, watch } from 'vue';
import { MaybeElementRef, unrefElement } from './unrefElement';
import { useResizeObserver } from './useResizeObserver';

export interface ElementSize {
  width: number;
  height: number;
}

export function useElementSize(
  target: MaybeElementRef,
  initialSize: ElementSize = { width: 0, height: 0 },
  options: ResizeObserverOptions = {}
) {
  const width = ref(initialSize.width);
  const height = ref(initialSize.height);

  useResizeObserver(
    target,
    ([entry]) => {
      width.value = entry.contentRect.width;
      height.value = entry.contentRect.height;
    },
    options as any
  );
  watch(
    () => unrefElement(target),
    (ele) => {
      width.value = ele ? initialSize.width : 0;
      height.value = ele ? initialSize.height : 0;
    }
  );
  return {
    width,
    height
  };
}

export type UseElementSizeReturn = ReturnType<typeof useElementSize>;
