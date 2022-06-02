<template>
  <div id="app">
    <vue-dadata
      ref="dadata"
      :token="token"
      @handle-error="handleError"
      input-name="vue-dadata"
      from-bound="region"
      to-bound="house"
      highlight-class-name="vue-dadata__highlight"
      unhighlight-class-name="vue-dadata__unhighlight"
      highlight-tag="span"
      :on-change="changed"
      :location-options="locations"
    ></vue-dadata>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import VueDadata from '@/VueDadata.vue';

export default Vue.extend({
  name: 'ServeDev',

  components: {
    VueDadata
  },

  data() {
    return {
      token: '',
      locations: {
        language: 'ru',
        locations: [
          // {
          //   region: 'москва',
          // },
          {
            country: '*',
          },
        ],
      }
    }
  },

  created() {
    this.token = process.env.VUE_APP_DADATA_API_KEY ?? '';
  },

  methods: {
    handleError(error: Error) {
      console.log(error);
    },

    changed(payload: any) {
      console.log('payload', payload);
    }
  }
});
</script>

