const SplitInput = {
 install(Vue, options = {}) {
  Vue.component('split-input', () => import('./components/SplitInput'));
 },
};

export default SplitInput;

if (typeof window !== 'undefined' && window.Vue) {
 window.Vue.use(SplitInput);
}
