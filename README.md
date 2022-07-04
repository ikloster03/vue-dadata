# Vue Dadata

[![npm version](https://badge.fury.io/js/vue-dadata.svg)](https://badge.fury.io/js/vue-dadata)
[![npm downloads](https://img.shields.io/npm/dw/vue-dadata)](https://badge.fury.io/js/vue-dadata)
[![NPM license](https://img.shields.io/npm/l/vue-dadata)](https://github.com/ikloster03/vue-dadata/blob/main/LICENSE)
[![npm type definitions](https://img.shields.io/npm/types/vue-dadata)](https://github.com/ikloster03/vue-dadata)

[comment]: <> (![Publish]&#40;https://github.com/ikloster03/vue-dadata/workflows/Publish/badge.svg&#41;)

It's a vue component for hinting addresses using [DaData.ru](https://dadata.ru).

| Version  | Description |
| ------------- | ------------- |
| 1.\*.\*  | Old version for vue2 |
| 2.\*.\*  | New version for vue2 |
| 3.\*.\*  | New version for vue3 |

## Install

[npm package](https://www.npmjs.com/package/vue-dadata)

```bash
$ npm install vue-dadata --save
$ npm install vue-dadata@2 --save
$ npm install vue-dadata@3 --save
```

[yarn package](https://yarnpkg.com/en/package/vue-dadata)
```bash
$ yarn add vue-dadata
$ yarn add vue-dadata@2
$ yarn add vue-dadata@3
```

## Usage

```html
<template>
  <div class="vue-truncate-html-example">
    <vue-dadata
      v-model="query"
      :token="token" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { VueDadata } from 'vue-dadata';
  import 'vue-dadata/dist/style.css';

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
```

### Properties

| Prop             | Required | Type       | Description                                                                                                    | Default                                                                                                                  |
|------------------|----------|------------|----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| token            | Yes      | `string`   | Auth token DaData.ru                                                                                           | -                                                                                                                        |
| modelValue       | Yes      | `string`   | v-model for query                                                                                              | -                                                                                                                        |
| suggestion       | No       | `object`   | v-model for [suggestion](https://github.com/ikloster03/vue-dadata/blob/master/src/types/suggestion.dto.ts#L24) | `undefined`                                                                                                              |
| placeholder      | No       | `string`   | Text placeholder                                                                                               | `''`                                                                                                                     |
| url              | No       | `string`   | special url for dadata api                                                                                     | `'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'`                                                 |
| debounceWait     | No       | `string`   | waiting time                                                                                                   | `'1000ms'`                                                                                                               |
| disabled         | No       | `boolean`  | disabled                                                                                                       | `false`                                                                                                                  |
| fromBound        | No       | `string`   | Dadata bound type FROM                                                                                         | `undefined`                                                                                                              |
| toBound          | No       | `string`   | Dadata bound type TO                                                                                           | `undefined`                                                                                                              |
| inputName        | No       | `string`   | Input name attribute                                                                                           | `'vue-dadata-input'`                                                                                                     |
| locationOptions  | No       | `object`   | Location options for choosing cities or countries                                                              | `undefined`                                                                                                              |
| classes          | No       | `object`   | classes                                                                                                        | [DEFAULT_CLASSES](https://github.com/ikloster03/vue-dadata/blob/master/src/const/classes.const.ts)                       |
| highlightOptions | No       | `object`   | highlight options for [vue-word-highlighter](https://github.com/kawamataryo/vue-word-highlighter)              | [DEFAULT_HIGHLIGHT_OPTIONS](https://github.com/ikloster03/vue-dadata/blob/master/src/const/highlight-options.const.ts)   |
| autocomplete     | No       | `boolean`  | can autocomplete query, after blur                                                                             | `undefined`                                                                                                              |


## Peer dependencies
- [vue](https://github.com/vuejs/vue)

## Dependencies
- [axios](https://github.com/axios/axios)
- [vue-debounce](https://github.com/dhershman1/vue-debounce)
- [vue-word-highlighter](https://github.com/kawamataryo/vue-word-highlighter)

Copyright (c) 2019 - 2022 Ivan Monastyrev <ikloster@yandex.ru>. Licensed under the [MIT license](https://github.com/ikloster03/vue-dadata/blob/master/LICENSE).
