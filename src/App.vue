<template>
  <div id="app">
    <vue-dadata
      :token="token"
      @handleError="handleError"
      input-name="test"
      from-bound="region"
      to-bound="street"
    ></vue-dadata>
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
  public token = '';

  public created() {
    this.token = process.env.VUE_APP_DADATA_API_KEY;
  }

  public handleError(error: Error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
}
</script>

<style lang="scss">
#app {
}
</style>
