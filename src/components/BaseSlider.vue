<template>
  <div class="slide-container">
    <h1 class="slider__year">{{ selectedYear }}</h1>
    <input
      @input="debounceOnInput"
      type="range"
      min="1945"
      max="1991"
      value="1945"
      class="slider"
      id="myRange"
    />
    <div class="slider__months">
      <button
        v-for="button in buttons"
        :key="button.month"
        class="month__button"
        @click="handleClick"
        :value="button.month"
        :class="button.month === selectedMonth ? 'selected' : null"
        :disabled="!enabledMonths.includes(button.month)"
      >{{ button.month }}</button>
    </div>
  </div>
</template>
<script lang="ts">
import debounce from 'lodash.debounce';
import { defineComponent, ref, computed } from 'vue';
import client from '../contentful';

export default defineComponent({
  emits: ['changeDate'],
  async setup(props, context) {
    const buttons = [{ month: 'ЯНВ' }, { month: 'ФЕВ' }, { month: 'МАР' }, { month: 'АПР' },
    { month: 'МАЙ' }, { month: 'ИЮН' }, { month: 'ИЮЛ' }, { month: 'АВГ' }, { month: 'СЕН' },
    { month: 'ОКТ' }, { month: 'НОЯ' }, { month: 'ДЕК' }]

    let selectedYear = ref('1945');
    const enabledMonths = ref(['']);

    const changeEnabledMonths = async (selectedYear: string) => {
      const enabledMonthsResponse: any = await client.getEntries({ // FIXME: unknown type
        content_type: 'year',
        skip: 0,
        order: 'sys.createdAt',
        'fields.year[all]': selectedYear
      });
      enabledMonths.value = enabledMonthsResponse.items[0].fields.months.split(' ')
    };
    changeEnabledMonths(selectedYear.value);

    let selectedMonth = ref('ФЕВ');

    const changeSelectedMonth = (month: string) => {
      selectedMonth.value = month;
      context.emit('changeDate', selectedMonth.value + selectedYear.value)
    };

    const changeYear = (payload: Event) => {
      const target = payload.target as HTMLButtonElement;
      selectedYear.value = target?.value;
      changeEnabledMonths(selectedYear.value);
      changeSelectedMonth(enabledMonths.value[0]);
    };

    const debounceOnInput = computed(() => {
      return debounce(changeYear, 250)
    });

    const handleClick = (payload: Event) => {
      const target = payload.target as HTMLButtonElement;
      changeSelectedMonth(target?.value);
    };


    return { buttons, selectedMonth, selectedYear, debounceOnInput, enabledMonths, handleClick };
  }
})

</script>
<style scoped>
.slider__year {
  font-size: 72px;
  text-align: center;
}
.slider__months {
  margin: 0 auto;
  margin-top: 20px;
  height: 35px;
  width: calc(100% - 40px);
  background-color: #fff;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  color: #222;
  text-align: center;
  align-items: center;
}
.slide-container {
  width: 50vw;
  margin: 0 auto;
  margin-bottom: 40px;
  position: relative;
}

.slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 1em;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  background: #222;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
}

.month__button {
  height: 100%;
  appearance: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.month__button:hover:enabled {
  background-color: #222;
  color: white;
}

.month__button:disabled {
  cursor: auto;
}
.selected {
  background-color: #222;
  color: white;
}
</style>
