<template>
 <div>
  <template v-for="n in length">
   <div :key="n" class="px-1">
    <input
     v-on="listeners"
     ref="input"
     type="text"
     :class="{ 'is-invalid': isInvalid, customClass }"
     :placeholder="(placeholders && placeholders[n - 1]) || placeholder"
     :maxlength="maxLength"
     v-model="values[n - 1]"
    />
   </div>
  </template>
 </div>
</template>
<script>
 export default {
  model: {
   prop: 'value',
   event: 'change',
  },
  props: {
   isInvalid: {
    type: Boolean,
    default: false,
   },
   length: {
    type: Number,
    default: 6,
   },
   maxLength: {
    type: Number,
    default: 1,
   },
   placeholder: {
    type: String,
    default: '',
   },
   placeholders: {
    type: Array,
    default: () => [],
   },
   value: {
    type: String,
    default: '',
   },
   customClass: {
    type: String,
    default: '',
   },
  },
  data() {
   return {
    index: null,
    values: [],
   };
  },
  computed: {
   currentInput() {
    return this.$refs.input[this.index];
   },
   firstInput() {
    return this.$refs.input[0];
   },
   joinedValues() {
    return this.values.join('');
   },
   lastInput() {
    return this.$refs.input[this.length - 1];
   },
   listeners() {
    const vm = this;
    return {
     blur: () => {
      this.index = null;
     },
     change: () => {
      vm.$emit('change', this.joinedValues);
     },
     focus: (event) => {
      this.index = [...this.$refs.input].indexOf(event.target);
     },
     input: (event) => {
      if (event.inputType === 'insertText') {
       this.navigate(this.nextInput);
      }
      vm.$emit('change', this.joinedValues);
     },
     keydown: (event) => {
      const cursorPosition = this.currentInput.selectionEnd;
      const currentValue = this.currentInput.value;
      switch (event.code) {
       case 'ArrowDown':
        this.navigate(this.lastInput);
        break;
       case 'ArrowLeft':
        if (cursorPosition === 0 || !currentValue) {
         this.navigate(this.previousInput);
        }
        break;
       case 'ArrowRight':
        if (cursorPosition === 1 || !currentValue) {
         this.navigate(this.nextInput);
        }
        break;
       case 'ArrowUp':
        this.navigate(this.firstInput);
        break;
       case 'Backspace':
        if (cursorPosition === 0) {
         this.navigate(this.previousInput);
        }
        break;
       default:
        break;
      }
     },
     paste: (event) => {
      event.preventDefault();
      const pasteValue = event.clipboardData.getData('text/plain');
      const pasteValues = [];
      let newValues = [...this.values];
      for (let i = 0; i < this.length - this.index; i += 1) {
       const char = pasteValue[i];
       if (char) {
        pasteValues.push(char);
       }
      }
      newValues.splice(this.index, this.length - this.index + 1);
      newValues = newValues.concat(pasteValues);
      this.values = newValues;
      const lastIndex = newValues.length - 1;
      this.navigate(this.$refs.input[lastIndex]);
      this.$emit('change', this.joinedValues);
     },
    };
   },
   nextInput() {
    return this.$refs.input[this.index + 1];
   },
   previousInput() {
    return this.$refs.input[this.index - 1];
   },
  },
  mounted() {
   this.mapData();
  },
  watch: {
   value(value) {
    if (value !== this.joinedValues) {
     this.mapData();
    }
   },
  },
  methods: {
   mapData() {
    this.values = this.value?.toString().split('');
   },
   navigate(input) {
    if (input) {
     input.focus();
     input.select();
    }
   },
   input(event, index) {
    const { value } = event.target;
    if (event.inputType === 'insertText') {
     if (value.length === this.maxLength && index < this.length) {
      this.$refs.input[index]?.focus();
     }
    } else if (event.inputType.match(/delete/i)) {
     if (value.length === 0 && this.$refs.input[index - 2]) {
      this.$refs.input[index - 2]?.focus();
     }
    }
    this.$emit('change', this.value);
   },
   keydown(event, index) {
    const currentInput = event.target;
    const cursorPos = currentInput.selectionEnd;
    if (event.code === 'ArrowRight') {
     if (index < this.length && cursorPos === this.maxLength) {
      this.$refs.input[index]?.focus();
     }
    } else if (event.code === 'ArrowLeft') {
     if (index > 1 && cursorPos === 0) {
      this.$refs.input[index - 2]?.focus();
     }
    } else if (event.code === 'Backspace') {
     const input = this.$refs.input[index - 1];
     if (!input.value) {
      this.$refs.input[index - 2]?.focus();
     }
    }
   },
   displayData(value) {
    if (value) {
     const data = value.toString();
     let index = 0;
     this.$refs.input.forEach((input) => {
      const inputField = input;
      inputField.value = '';
     });
     for (let i = 0; i < this.length; i += 1) {
      for (let j = 0; j < this.maxLength; j += 1) {
       this.$refs.input[i].value += data[index] ? data[index] : '';
       index += 1;
      }
     }
    }
   },
  },
 };
</script>
