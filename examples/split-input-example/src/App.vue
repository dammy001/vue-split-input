<script setup lang="ts">
import { ref } from 'vue'
import type { Ref, ComponentPublicInstance } from 'vue'
import type { Prop } from 'vue-split-input'

const model: Ref<string> = ref('')

const splitInputRef = ref<ComponentPublicInstance<Prop> | null>(null)

const clear = () => splitInputRef.value?.clearAllInput()
</script>
<template>
  <div class="flex justify-center">
    <div class="flex gap-1">
      <split-input
        ref="splitInputRef"
        v-model="model"
        :disabled="false"
        class-name="w-10 h-14 bg-gray-200 text-black font-bold text-2xl text-center border-b-2 focus:select-all focus:outline-none focus:border-red-500 border-white/50"
        :input-number="6"
        placeholder="*"
        :placeholders="['-', '-', '-']"
      />
    </div>
    <button
      type="button"
      class="px-6 bg-blue-500 text-white text-xs ml-2"
      @click="clear"
    >
      CLEAR ALL
    </button>
  </div>
</template>
