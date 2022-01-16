# Split Input Component for Vue 3.x

Used for otps, transaction pin, passwords etc

### Install

#### NPM

```bash
//with npm
npm i vue-split-input --save

//with yarn
yarn add vue-split-input

//with pnpm
pnpm i vue-split-input
```

### Usage

```
import { createApp } from 'vue';
import Root from './App.vue'
import SplitInput from 'vue-split-input';

const app = createApp(App)

app.use(SplitInput)

app.mount('#app')
```

###### Props

|    Props    |                     #Type                     | #default |
| :---------: | :-------------------------------------------: | :------: |
| inputNumber |                    Number                     |    6     |
|    type     | String as PropType<'tel', 'password', 'text'> |  'tel'   |
|  className  |                    String                     |    ''    |

###### SplitInput.vue Usage

```vue
<template>
 <split-input
  v-model="input"
  class-name="w-12 h-8 rounded-sm p-5 font-bold text-lg"
  :input-number="4"
 />
</template>
```

###### Or

```vue
<script lang="ts">
 export default defineComponent({
  template: `
            <split-input
            v-model="input"
            class-name="w-12 h-8 rounded-sm p-5 font-bold text-lg"
            :input-number="4"
            />
        `,
 });
</script>
```

Thanks!
Damilare.
