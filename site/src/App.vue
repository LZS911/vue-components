<script setup lang="ts">
import VuePopperGl from '@packages/vue-popper-gl'

</script>

<template>
  <div class="main">
    <VuePopperGl>
      <template #trigger>
        <div>test123312312</div>
      </template>

      <template #default>
        <div>1233112312</div>
        <div>1233112312</div>
        <div>1233112312</div>
      </template>

    </VuePopperGl>
  </div>

</template>

<style lang="scss">
@import '@packages/vue-popper-gl/styles/popper/index.scss';



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main {
  height: 1000px;
}
</style>
