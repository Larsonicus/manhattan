<template>
  <div class="post">
    <div class="post__content">
      <div class="post__title">
        <h1 style="margin-bottom: 5px;">{{ item.fields.date.content[0].content[0].value }}</h1>
        <h1>{{ item.fields.title.content[0].content[0].value }}</h1>
      </div>
      <p class="post__text">{{ item.fields.text }}</p>
      <img class="post__image" :src="'https:' + item.fields.image.fields.file.url" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Item } from '../types';

export default defineComponent({
  props: {
    item: { type: Object as PropType<Item>, required: true }
  },
})
</script>
<style scoped>
.post {
  border: 4px solid black;
  border-radius: 1em;
  background-color: #efefef;
  color: #222;
  padding: 10px;
  max-width: 500px;
}

.post__title {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.post__content {
  margin: auto;
  display: flex;
  flex-direction: column;
  height: calc(100% - 10px);
  justify-content: space-between;
}
.post__text {
  word-wrap: normal;
  margin-bottom: 20px;
}

.post__image {
  border: 2px solid black;
}
</style>
