<template>
  <div class="vue-truncate-html-example">
    <vue-dadata
      v-model="query"
      :token="token" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VueDadata from '../src/VueDadata.vue';

export default defineComponent({
  name: 'VueTruncateHtmlExample',
  components: {
    VueDadata,
  },
  setup() {
    const query = ref('');

    return {
      token: import.meta.env.VITE_APP_DADATA_API_KEY,
      query,

    };
  },
});
</script>

<style scoped>

</style>
