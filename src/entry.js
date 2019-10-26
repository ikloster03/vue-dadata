import VueDadata from './components/VueDadata.vue';

const install = Vue => {
  if (install.installed) {
    return;
  }
  install.installed = true;
  Vue.component('vue-dadata', VueDadata);
};

const plugin = {
  install,
};

let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

VueDadata.install = install;

export default VueDadata;
