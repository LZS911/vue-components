<script setup lang="ts">
import VuePopperGl from '@packages/vue-popper-gl';
import { ref } from 'vue';

const visibleManualMode = ref(false);
const visibleManualModeClick = () => {
  visibleManualMode.value = !visibleManualMode.value;
};
</script>

<template>
  <div class="main">
    <div class="basic-usage box-wrapper">
      <VuePopperGl content="basic usage">
        <template #trigger>
          <button>Hover me</button>
        </template>
      </VuePopperGl>

      <VuePopperGl disabled content="basic usage">
        <template #trigger>
          <button>disabled</button>
        </template>
      </VuePopperGl>

      <div class="box-line"></div>
      <div class="box-title">基本</div>
      <div class="box-desc">最简单的用法，浮层的大小由内容区域决定</div>
    </div>

    <div class="trigger-type box-wrapper">
      <VuePopperGl content="Hover me">
        <template #trigger>
          <button>Hover me</button>
        </template>
      </VuePopperGl>
      <VuePopperGl trigger="focus" content="Focus me">
        <template #trigger>
          <button>Focus me</button>
        </template>
      </VuePopperGl>

      <VuePopperGl trigger="click" content="Click me">
        <template #trigger>
          <button>Click me</button>
        </template>
      </VuePopperGl>

      <div class="box-line"></div>
      <div class="box-title">三种触发方式</div>
      <div class="box-desc">鼠标移入、聚集、点击。</div>
    </div>

    <div class="popper-placement box-wrapper">
      <div>
        <VuePopperGl placement="top-left" content="Content test">
          <template #trigger>
            <button>Top-Left</button>
          </template>
        </VuePopperGl>
        <VuePopperGl placement="top" content="Content test">
          <template #trigger>
            <button>Top</button>
          </template>
        </VuePopperGl>
        <VuePopperGl placement="top-right" content="Content test">
          <template #trigger>
            <button>Top-Right</button>
          </template>
        </VuePopperGl>
      </div>

      <div>
        <VuePopperGl placement="left-top" content="Content test">
          <template #trigger>
            <button>Left-Top</button>
          </template>
        </VuePopperGl>
        <VuePopperGl placement="left" content="Content test">
          <template #trigger>
            <button>Left</button>
          </template>
        </VuePopperGl>
        <VuePopperGl placement="left-bottom" content="Content test">
          <template #trigger>
            <button>Left-Bottom</button>
          </template>
        </VuePopperGl>
      </div>

      <div>
        <VuePopperGl placement="right-bottom" content="Content test">
          <template #trigger>
            <button>Right-Bottom</button>
          </template>
        </VuePopperGl>
        <VuePopperGl placement="right" content="Content test">
          <template #trigger>
            <button>Right</button>
          </template>
        </VuePopperGl>
        <VuePopperGl placement="right-top" content="Content test">
          <template #trigger>
            <button>Right-Top</button>
          </template>
        </VuePopperGl>
      </div>

      <div>
        <VuePopperGl placement="bottom-left" content="Content test">
          <template #trigger>
            <button>Bottom-Left</button>
          </template>
        </VuePopperGl>
        <VuePopperGl content="Content test">
          <template #trigger>
            <button>Bottom</button>
          </template>
        </VuePopperGl>

        <VuePopperGl placement="bottom-right" content="Content test">
          <template #trigger>
            <button>Bottom-Right</button>
          </template>
        </VuePopperGl>
      </div>

      <div class="box-line"></div>
      <div class="box-title">位置</div>
      <div class="box-desc">位置有十二个方向</div>
    </div>

    <div class="box-wrapper">
      <VuePopperGl v-model:visible="visibleManualMode" manualMode content="Content test">
        <template #trigger>
          <button @click="visibleManualModeClick">Manual Mode</button>
        </template>
      </VuePopperGl>
      <div class="box-line"></div>
      <div class="box-title">从浮层内关闭</div>
      <div class="box-desc">使用 visible 属性控制浮层显示</div>
    </div>

    <div class="box-wrapper">
      <VuePopperGl trigger="click" :popper-width="100">
        <template #trigger>
          <button>custom content</button>
        </template>
        <template #default>
          <p class="red-text">red text</p>
          <p class="blue-text">blue text</p>
          <p class="orange-text">orange text</p>
        </template>
      </VuePopperGl>
      <div class="box-line"></div>
      <div class="box-title">自定义 content</div>
      <div class="box-desc">使用插槽模式生成content</div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@packages/vue-popper-gl/styles/popper/index.scss';

.main {
  display: flex;
  flex-wrap: wrap;
}
</style>
