import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
export function useSpin() {
  const showLoading = ({ text = '加载中...' } = {}) => {
    userStore.setGlobalLoading({
      loading: true,
      tip: text,
    })
  }

  const closeLoading = () => {
    userStore.setGlobalLoading({
      loading: false,
    })
  }

  return {
    showLoading,
    closeLoading,
  }
}
