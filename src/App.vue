<template>
  <div class="vue-truncate-html-example">
    <vue-dadata
      v-model="query"
      v-model:suggestion="suggestion"
      :highlight-options="highlightOptions"
      :token="token"
      :autocomplete="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VueDadata from './VueDadata.vue';
import './index.css';
import { HighlightOptions } from './types';

export default defineComponent({
  name: 'VueDadataExample',
  components: {
    VueDadata,
  },
  setup() {
    const query = ref('');
    const suggestion = ref(undefined);
    const highlightOptions: HighlightOptions = {
      highlightClass: 'test',
      highlightTag: 'span',
    };

    return {
      token: import.meta.env.VITE_APP_DADATA_API_KEY as string,
      query,
      suggestion,
      highlightOptions,
    };
  },
});
</script>

<style scoped>

</style>
