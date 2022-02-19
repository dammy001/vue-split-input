import { App } from 'vue';
import VueSplitInput from './components/SplitInput.vue';

export type { SplitInputType, Prop } from './type';

const SplitInput = {
 install: (app: App, options = {}): void => {
  app.component('split-input', VueSplitInput);
 },
};

export default SplitInput;
