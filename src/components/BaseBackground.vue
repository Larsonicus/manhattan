<template>
  <div class="wrap">
    <div class="bg-image">asd</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
})
</script>
<style scoped>
.wrap {
  height: 100vh;
  position: relative;
  position: sticky;
}

.wrap::after {
  content: "";
  top: 0;
  width: 100%;
  position: absolute;
  height: inherit;
  background-color: rgba(62, 53, 49, 0.67);
}

.bg-image {
  background-size: cover;
  height: inherit;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.bg-image::after {
  content: "";
  background: url("../assets/background.jpg") no-repeat center center;
  background-size: cover;
  filter: blur(6px);
  position: absolute;
  top: -10px;
  right: -10px;
  bottom: -10px;
  left: -10px;
}
</style>
