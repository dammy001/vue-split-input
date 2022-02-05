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

|    Props     |                     #Type                     | #default |                  #description                  |
| :----------: | :-------------------------------------------: | :------: | :--------------------------------------------: |
| inputNumber  |                    Number                     |    6     |           Number for input rendered            |
|     type     | String as PropType<'tel', 'password', 'text'> |  'tel'   | Input type. Optional value: `password`, `text` |
|  className   |                    String                     |    ''    |       Custom class/style for each input        |
|   disabled   |                    Boolean                    |  false   |               Disabled all input               |
| placeholder  |                    String                     |    ''    |       Default description for each input       |
| placeholders |                     Array                     |   null   |       Default description for all inputs       |

###### Events

| Name  |                          #Description                          |
| :---: | :------------------------------------------------------------: |
| focus | custom focus method that passes the input event as an argument |

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

You can also pass a ref to access the component dom and objects directly

```vue
<script setup lang="ts">
 import { ref } from 'vue';
 import type { ComponentPublicInstance } from 'vue';
 import type { Prop } from 'vue-split-input';

 const input = ref<ComponentPublicInstance<Prop> | null>(null);
 const clear = () => input.value?.clearAllInput();
</script>

<template>
 <split-input
  ref="input"
  v-model="input"
  class-name="w-12 h-8 rounded-sm p-5 font-bold text-lg"
  :input-number="4"
 />
 <button
  type="button"
  @click="clear"
  class="px-6 bg-blue-500 text-white text-xs ml-2"
 >
  CLEAR ALL
 </button>
</template>
```

Thanks!
Damilare.
