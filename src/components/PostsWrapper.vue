<template>
  <div
    class="post__wrapper"
    :class="`column-${items.length >= 3 ? 3 : items.length}`"
  >
    <BasePost v-for="(item, index) in items" :key="index" :item="item" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import client from '../contentful';
import BasePost from './BasePost.vue';

export default defineComponent({
  components: { BasePost },
  props: {
    selectedDate: { type: String, required: true },
  },
  async setup(props) {
    const items = ref([]);

    const getPosts = async (selectedDate: string) => {
      const posts = await client.getEntries({
        content_type: 'post',
        skip: 0,
        order: 'sys.createdAt',
        'fields.monthYear[all]': selectedDate,
      });
      items.value = posts.items as any; // FIXME: unknown type
    };

    getPosts(props.selectedDate);

    watch(
      () => props.selectedDate,
      (): void => {
        getPosts(props.selectedDate);
      }
    );

    return { items };
  },
});
</script>
<style scoped>
.post__wrapper {
  overflow: hidden;
  /* column-fill: auto; */

  width: fit-content;
  width: -moz-fit-content;
  margin: 0 auto;
}

.column-1 {
  column-count: 1;
  -moz-column-count: 1;
  -webkit-column-count: 1;
}
.column-2 {
  column-count: 2;
  -moz-column-count: 2;
  -webkit-column-count: 2;
}
.column-3 {
  column-count: 3;
  -moz-column-count: 3;
  -webkit-column-count: 3;
}

@media screen and (max-width: 1024px) {
  .column-3 {
    column-count: 2;
    -moz-column-count: 2;
    -webkit-column-count: 2;
  }
}

@media screen and (max-width: 750px) {
  .column-3 {
    column-count: 1;
    -moz-column-count: 1;
    -webkit-column-count: 1;
  }

  .column-2 {
    column-count: 1;
    -moz-column-count: 1;
    -webkit-column-count: 1;
  }
}
</style>
