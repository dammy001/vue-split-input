import { App, defineAsyncComponent } from 'vue';
import type { Prop } from './type';

export type { Prop };

export default {
 install: (app: App, options = {}): void => {
  app.component(
   'split-input',
   defineAsyncComponent(() => import('./components/SplitInput.vue')),
  );
 },
};
