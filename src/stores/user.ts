import { ref, } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const isSubMenu: Ref<boolean> = ref(false)
  function setIsSubMenu(flag: boolean) {
    isSubMenu.value = flag
  }

  return { isSubMenu, setIsSubMenu }
})
