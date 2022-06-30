<script setup lang="ts">
import { usePopper } from './userPopper';
import { defaultProps, emitData } from './index.data';
import { clickOutSide as vClickoutside } from '@libs/directives';
import { IPropsOptions } from './index.type';

const props = defineProps(defaultProps);
const emits = defineEmits(emitData);
const {
  triggerRef,
  popperRef,
  visibility,
  events: { onBlur, onClick, onFocus, onMouseenter, onMouseleave },
  hide
} = usePopper(props as IPropsOptions, emits);
</script>

<template>
  <span
    v-clickoutside:[popperRef]="hide"
    ref="triggerRef"
    :style="props.style"
    :class="props.class"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @blur="onBlur"
    @click="onClick"
    @focus="onFocus"
    :tabindex="0"
  >
    <slot name="trigger" />
  </span>
  <teleport to="body" :disabled="!props.appendBody">
    <transition>
      <div
        v-show="visibility"
        :aria-hidden="visibility"
        ref="popperRef"
        role="popper"
        :class="{ 'ly-popper': true, 'ly-popper__arrow': props.showArrow }"
      >
        <span v-if="props.content">{{ props.content }}</span>
        <slot v-else name="default" />
      </div>
    </transition>
  </teleport>
</template>
