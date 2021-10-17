import { App, defineAsyncComponent } from 'vue';
import { Prop } from './type';

export { Prop };

export default {
 install: (app: App, options = {}): void => {
  app.component(
   'split-input',
   defineAsyncComponent(() => import('./components/SplitInput.vue')),
  );
 },
};
