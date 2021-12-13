<template>
  <div class="post__wrapper">
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
    selectedDate: { type: String, required: true }
  },
  async setup(props) {
    const items = ref([])

    const getPosts = async (selectedDate: string) => {
      const posts = await client.getEntries({
        content_type: 'post',
        skip: 0,
        order: 'sys.createdAt',
        'fields.monthYear[all]': selectedDate
      })
      items.value = posts.items as any; // FIXME: unknown type
    };
    getPosts(props.selectedDate);

    watch(() => props.selectedDate, (): void => { getPosts(props.selectedDate) })

    return { items };
  },
})
</script>
<style scoped>
.post__wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
}
</style>