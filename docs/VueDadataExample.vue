<template>
  <div class="vue-truncate-html-example">
    <vue-dadata
      v-model="query"
      v-model:suggestion="suggestion"
      :token="token"
      :autocomplete="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VueDadata from '../src/VueDadata.vue';
import '../src/index.css';

export default defineComponent({
  name: 'VueTruncateHtmlExample',
  components: {
    VueDadata,
  },
  setup() {
    const query = ref('');
    const suggestion = ref(undefined);

    return {
      token: import.meta.env.VITE_APP_DADATA_API_KEY as string,
      query,
      suggestion,
    };
  },
});
</script>

<style scoped>

</style>
