<template>
 <div
  v-for="i in inputNumber"
  :class="`grid grid-cols-${maxLength} gap-4`"
  :key="i"
 >
  <input
   :ref="
    (el) => {
     if (el) input[i] = el;
    }
   "
   :type="type"
   :class="className"
   v-on="computedListeners"
   :disabled="disabled"
   :maxlength="maxLength"
   :placeholder="currentPlaceholder"
   v-model="values[i - 1]"
   :data-index="`${i - 1}`"
  />
 </div>
</template>
<script lang="ts">
 import {
  defineComponent,
  reactive,
  PropType,
  watch,
  onMounted,
  toRefs,
  ref,
  computed,
  SetupContext,
  ComputedRef,
  onBeforeUpdate,
  Ref,
  nextTick,
  isRef,
  unref,
 } from 'vue';
 import { SplitInputType, Prop } from '../type';
 export default defineComponent({
  inheritAttrs: false,
  props: {
   modelValue: String,
   inputNumber: {
    type: Number,
    default: 6,
   },
   maxLength: {
    type: Number,
    default: 1,
   },
   type: {
    type: String as PropType<'text' | 'password' | 'tel'>,
    default: 'tel',
   },
   className: {
    type: String,
    default: '',
   },
   disabled: {
    type: Boolean,
    default: false,
   },
   placeholder: {
    type: String,
    default: '',
   },
   placeholders: {
    type: Array,
    default: null,
   },
  },
  emits: ['update:modelValue', 'focus'],
  setup: (props: Prop, { emit, attrs }: SetupContext) => {
   const data: SplitInputType = reactive({
    index: null,
    values: [],
   });

   const { inputNumber, modelValue, placeholders, placeholder } =
    toRefs<Prop>(props);

   const input: Ref<HTMLInputElement[]> = ref<HTMLInputElement[]>([]);

   const firstInput: ComputedRef<HTMLInputElement> = computed(
    () => input.value?.[0],
   );

   const lastInput: ComputedRef<HTMLInputElement> = computed(
    () => input.value?.[inputNumber.value - 1],
   );

   const joinedValues: ComputedRef<string | undefined> = computed(() =>
    data.values.join(''),
   );

   const nextInput: ComputedRef<HTMLInputElement> = computed(
    () => input.value?.[data.index + 1],
   );

   const currentInput: ComputedRef<HTMLInputElement> = computed(
    () => input.value?.[data.index],
   );

   const previousInput: ComputedRef<HTMLInputElement> = computed(
    () => input.value?.[data.index - 1],
   );

   const currentPlaceholder: ComputedRef<string> = computed(
    () =>
     ((isRef(placeholders) && unref(placeholders)?.[data.index]) ||
      unref(placeholder)) as string,
   );

   const computedListeners = {
    ...attrs,
    blur: (): any => (data.index = null),
    change: (): void => emit('update:modelValue', joinedValues.value),
    focus: (event: FocusEvent): void => {
     data.index = [...input.value].indexOf(event.target as HTMLInputElement);
     nextTick(() => emit('focus', event));
    },
    input: (event: InputEvent): void => {
     if (event.inputType === 'insertText') {
      navigate(nextInput.value);
     }
     emit('update:modelValue', joinedValues.value);
    },
    keydown: (event: any): void => {
     const cursorPosition = Number(event.target.dataset.index);
     const currentValue = data.values[cursorPosition];
     switch (event?.code || event?.key || event?.which || event?.keyCode) {
      case 'ArrowDown':
      case 40:
       navigate(lastInput.value);
       break;
      case 'ArrowLeft':
      case 37:
       if (cursorPosition === 0 || !currentValue) {
        navigate(previousInput.value);
       }
       break;
      case 'ArrowRight':
      case 39:
       if (cursorPosition === 1 || !currentValue) {
        navigate(nextInput.value);
       }
       break;
      case 'ArrowUp':
      case 38:
       navigate(firstInput.value);
       break;
      case 'Backspace':
      case 8:
       if (cursorPosition !== 0) {
        data.values[cursorPosition] = '';
        navigate(previousInput.value);
       }
       break;
      default:
       break;
     }
    },
    paste: (event: ClipboardEvent): void => {
     event.preventDefault();
     const pasteValues: string[] = (event.clipboardData as DataTransfer)
      .getData('text/plain')
      .split('')
      .slice(0, inputNumber.value);
     data.values = pasteValues;
     navigate(
      input.value[
       pasteValues.length < inputNumber.value
        ? pasteValues.length - 1
        : inputNumber.value - 1
      ],
     );
     emit('update:modelValue', joinedValues.value);
    },
   };

   watch(
    () => modelValue,
    (value: Ref<string | undefined> | undefined) => {
     if (value !== joinedValues.value) {
      mapModelData();
     }
    },
   );

   onBeforeUpdate(() => (input.value = []));

   onMounted(() => mapModelData());

   const mapModelData = (): string[] | undefined =>
    (data.values = modelValue?.value?.toString().split(''));

   const navigate = (input: HTMLInputElement): void => {
    if (input) {
     input.focus();
     input.select();
    }
   };

   const clearAllInput = (): void => {
    data.values = [];
    nextTick(() => emit('update:modelValue', joinedValues.value));
   };

   return {
    ...toRefs(data),
    input,
    computedListeners,
    currentPlaceholder,
    currentInput,
    clearAllInput,
   };
  },
 });
</script>

<style scoped>
 :disabled {
  pointer-events: none;
  opacity: 0.5;
 }
</style>
