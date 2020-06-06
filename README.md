# Vue Dadata

![Publish](https://github.com/ikloster03/vue-dadata/workflows/Publish/badge.svg)
[![gitlocalized ](https://gitlocalize.com/repo/3342/whole_project/badge.svg)](https://gitlocalize.com/repo/3342/whole_project?utm_source=badge)

It's a vue component for hinting addresses using [DaData.ru](https://dadata.ru).

[Link to RU documentation](https://github.com/ikloster03/vue-dadata/tree/master/ru/README.md)

## Install

[npm package](https://www.npmjs.com/package/vue-dadata)

```bash
$ npm install vue-dadata --save
```

[yarn package](https://yarnpkg.com/en/package/vue-dadata)
```bash
$ yarn add vue-dadata
```

## Usage

### Global

```js
import VueDadata from 'vue-dadata'

Vue.use(VueDadata)
```

### Local

```html
<template>
  <div id="app">
    <vue-dadata token="dadata_api_key"></vue-dadata>
  </div>
</template>

<script>
import VueDadata from 'vue-dadata'

export default {
  name: 'VueDadataTest',
  components: {
    'vue-dadata': VueDadata
  }
}
</script>
```

### Properties

| Prop  | Required | Type | Description |
| ------------- | ------------- | ------------- | ------------- |
| token  | Yes  | string  | Auth token DaData.ru  |
| placeholder  | No  | string  | Text placeholder  |
| query  | No  | string  | Initial state input field  |
| autoload  | No  | boolean  | If `true`, then a request for tips will be initialed in the background in the created hook  |
| onChange  | No  | function(suggestion: DadataSuggestion) -> void  | Function called when selecting a tooltip  |
| autocomplete  | No  |  string  |  Autocomplete field |
| defaultClass  | No  |  string  |  Default class ofr component, default value - `vue-dadata` |
| classes  | No  |  string  |  Extra classes |
| inputName  | No  |  string  |  Input name attribute |
| fromBound  | No  |  string  |  Dadata bound type FROM |
| toBound  | No  |  string  |  Dadata bound type TO |
| highlightClassName  | No  |  string  |  CSS class name applied to highlighted text |
| unhighlightClassName  | No  |  string  |  CSS class name applied to unhighlighted text |
| highlightTag  | No  |  string  |  Type of tag to wrap around highlighted matches; defaults to `mark` but can also be a component |
| locationOptions  | No  |  object  |  Location options for choosing cities or countries |


## Dependencies

- [axios](https://github.com/axios/axios)
- [core-js](https://github.com/zloirock/core-js)
- [vue](https://github.com/vuejs/vue)
- [vue-class-component](https://github.com/vuejs/vue-class-component)
- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
- [vue-highlight-words](https://github.com/Astray-git/vue-highlight-words)
- [vue-debounce-decorator](https://github.com/trepz/vue-debounce-decorator)

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository [issues section](https://github.com/ikloster03/vue-dadata/issues).

## ToDo

[Show project Vue Dadata](https://github.com/ikloster03/vue-dadata/projects/1)

## Milestones

[Show milestones](https://github.com/ikloster03/vue-dadata/milestones)

## Contact me

- Site: [ikloster.ru](http://ikloster.ru)
- E-mail: <ikloster@yandex.ru>
- Twitter: [twitter.com/IvanMonastyrev](https://twitter.com/IvanMonastyrev)

## Contributors

- [Valery Roshett](https://github.com/Roshett)
- [Ilya Kiselev](https://github.com/kiselev-webdev)

## [CHANGELOG](https://github.com/ikloster03/vue-dadata/blob/master/CHANGELOG.md)

## [CONTRIBUTING](https://github.com/ikloster03/vue-dadata/blob/master/CONTRIBUTING.md)

## [LICENSE](https://github.com/ikloster03/vue-dadata/blob/master/LICENSE)

Copyright (c) 2019 Ivan Monastyrev <ikloster@yandex.ru>. Licensed under the [MIT license](https://github.com/ikloster03/vue-dadata/blob/master/LICENSE).
