<template>
  <base-background style="position: fixed; width: 100%; z-index: -1;" />
  <suspense>
    <base-slider @change-date="changeSelectedDate" />
  </suspense>
  <suspense>
    <posts-wrapper :selected-date="selectedDate" />
  </suspense>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseBackground from './components/BaseBackground.vue';
import PostsWrapper from './components/PostsWrapper.vue';
import BaseSlider from './components/BaseSlider.vue';

export default defineComponent({
  components: {
    BaseBackground,
    PostsWrapper,
    BaseSlider
  },
  setup() {
    const selectedDate = ref('ФЕВ1945');

    const changeSelectedDate = (date: string) => {
      selectedDate.value = date;
    }

    return { changeSelectedDate, selectedDate };
  }
})
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap");
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background-color: #efefef;
}

::-webkit-scrollbar-thumb {
  background-color: #222;
  border-radius: 1em;
  border: 2px solid #efefef;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

input,
textarea,
select,
button {
  font: inherit;
}
</style>
