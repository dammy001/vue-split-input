import type { App, Plugin } from 'vue'
import VueSplitInput from './components/SplitInput.vue'

export * from './type'

const SplitInput: any = {
  install: (app: App, options = {}) => {
    app.component('SplitInput', VueSplitInput)
  },
}

export default SplitInput
