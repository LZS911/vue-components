<script setup lang="ts"></script>

<template>
  <div id="app">
    <router-link to="/popper">popper</router-link>
    <router-link to="/dropdown">dropdown</router-link>
    <router-view />
  </div>
</template>

<style lang="scss">
.red-text {
  color: red;
}
.blue-text {
  color: #1890ff;
}
.orange-text {
  color: orange;
}
#app {
  height: 800px;

  .box-wrapper {
    border: 1px solid #eee;
    margin: 20px;
    width: 25%;
    padding: 30px;
    overflow: scroll;
  }

  .box-line {
    margin-top: 20px;
    border: 1px solid rgba(214, 204, 204, 0.5);
  }

  .box-title {
    margin-top: 6px;
    font-size: 14px;
  }
  .box-desc {
    margin-top: 6px;
    font-size: 12px;
  }

  button {
    color: #fff;
    border: 0;
    background: #1890ff;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    outline: 0;
    line-height: 1.5715;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    margin: 2px 4px;
  }
}
</style>
