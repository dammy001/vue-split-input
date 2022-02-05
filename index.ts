import { App, defineAsyncComponent } from 'vue';

export type { SplitInputType, Prop } from './type';

export default {
 install: (app: App, options = {}): void => {
  app.component(
   'split-input',
   defineAsyncComponent(() => import('./components/SplitInput.vue')),
  );
 },
};
