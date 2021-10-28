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
   :maxlength="maxLength"
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
  },
  emits: ['update:modelValue'],
  setup: (props: Prop, { emit, attrs }: SetupContext) => {
   const data: SplitInputType = reactive({
    index: null,
    values: [],
   });

   const { inputNumber, modelValue } = toRefs(props);

   const input = ref<any>([]);

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

   const previousInput: ComputedRef<HTMLInputElement> = computed(
    () => input.value?.[data.index - 1],
   );

   const computedListeners = {
    ...attrs,
    blur: (): any => (data.index = null),
    change: (): void => emit('update:modelValue', joinedValues.value),
    focus: (event: FocusEvent): void => {
     data.index = [...input.value].indexOf(event.target);
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
     switch (event?.code) {
      case 'ArrowDown':
       navigate(lastInput.value);
       break;
      case 'ArrowLeft':
       if (cursorPosition === 0 || !currentValue) {
        navigate(previousInput.value);
       }
       break;
      case 'ArrowRight':
       if (cursorPosition === 1 || !currentValue) {
        navigate(nextInput.value);
       }
       break;
      case 'ArrowUp':
       navigate(firstInput.value);
       break;
      case 'Backspace':
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
     const pasteValue = event.clipboardData.getData('text/plain');
     const pasteValues = [];

     let newValues = [...data.values];
     for (let i = 0; i < inputNumber.value - data.index; i += 1) {
      const char = pasteValue[i];
      if (char) {
       pasteValues.push(char);
      }
     }

     newValues.splice(data.index, inputNumber.value - data.index + 1);
     newValues = newValues.concat(pasteValues);
     data.values = newValues;
     const lastIndex = newValues.length - 1;

     navigate(input.value[lastIndex]);
     emit('update:modelValue', joinedValues.value);
    },
   };

   watch(
    () => modelValue,
    (value: any) => {
     if (value !== joinedValues.value) {
      mapModelData();
     }
    },
   );

   onBeforeUpdate(() => (input.value = []));

   onMounted(() => mapModelData());

   const mapModelData = (): string[] =>
    (data.values = modelValue?.value?.toString().split(''));

   const navigate = (input: HTMLInputElement): void => {
    if (input) {
     input.focus();
     input.select();
    }
   };

   return {
    ...toRefs(data),
    input,
    computedListeners,
   };
  },
 });
</script>
