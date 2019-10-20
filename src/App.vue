<template>
  <div id="app">
    <vue-dadata :token="token"></vue-dadata>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueDadata from '@/components/VueDadata.vue';

@Component({
  name: 'App',
  components: {
    'vue-dadata': VueDadata,
  },
})
export default class App extends Vue {
  public token: string = '';

  public created() {
    this.token = process.env.VUE_APP_DADATA_API_KEY;
  }
}
</script>

<style lang="scss">
#app {
}
</style>
