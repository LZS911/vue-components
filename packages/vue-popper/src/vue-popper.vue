<script lang='ts'>
import { defineComponent, createVNode, Fragment, Teleport } from 'vue';
import { renderBlock } from '@libs/core'
import { throwError } from '@libs/utils';
import { useRenderPopper, useRenderTrigger, usePopper } from './hooks';
import { defaultProps, IPropsOptions } from './index.data';
import { IRenderTriggerProps } from './index.type';

const COMPONENT_NAME = 'LyPopper';

export default defineComponent({
  name: COMPONENT_NAME,
  emits: ['focus', 'blur', 'onChange', 'update:modelValue', 'visible-change', 'update:visible'],
  props: defaultProps,
  setup(props, ctx) {
    if (!ctx.slots.trigger) {
      throwError(COMPONENT_NAME, 'Trigger must be provided');
    }

    const propsStates = usePopper(props as IPropsOptions, ctx as any);

    return propsStates;
  },
  render() {
    const {
      $slots,
      content,
      visibility,
      events,
      showArrow,
      transition,
      hide,
      popperRef,
      appendBody,
      manualMode,
      class: className,
      style
    } = this;

    const triggerProps: IRenderTriggerProps = {
      ref: 'triggerRef',
      hide,
      popperRef,
      events,
      manualMode,
      className,
      style
    };

    const trigger = useRenderTrigger($slots, triggerProps);
    const popper = useRenderPopper($slots, { content, visibility, showArrow, transition });
    return renderBlock(Fragment, null, [
      trigger!,
      createVNode(Teleport as any, { to: 'body', disabled: !appendBody }, [popper])
    ]);
  }
});
</script>
