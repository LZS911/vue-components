import { ComponentPublicInstance, unref } from 'vue';
import { MaybeRef } from './index.type';

export type VueInstance = ComponentPublicInstance;
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>;
export type MaybeElement = HTMLElement | SVGElement | VueInstance | undefined | null;

export type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends VueInstance
  ? Exclude<MaybeElement, VueInstance>
  : T | undefined;

export function unrefElement<T extends MaybeElement>(elRef: MaybeElementRef<T>): UnRefElementReturn<T> {
  const plain = unref(elRef);
  return (plain as VueInstance)?.$el ?? plain;
}
