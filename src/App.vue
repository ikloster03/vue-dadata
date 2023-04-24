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
import VueDadata from './VueDadata.vue';
import './index.css';

export default defineComponent({
  name: 'VueDadataExample',
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
