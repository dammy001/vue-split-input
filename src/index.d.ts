export type { SplitInputType, Prop } from './type';
import { App as VueApp, Plugin } from 'vue';

export declare const App: VueApp;

export declare const plugin: Plugin;

declare module 'vue' {
 export interface GlobalComponents {
  SplitInput: typeof import('./components/SplitInput.vue')['default'];
 }
}

declare function install(): void;

export { install };
