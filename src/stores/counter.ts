import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { getMatrixClient, TMatrixClient } from '@/utils/matrix'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }



  const matrix: Ref<TMatrixClient | null> = ref(null)

  const connect = async () => {
    // matrix.value = getMatrixClient()
  }
  return { count, doubleCount, matrix, increment, connect }
})
