import { getCurrentInstance } from 'vue';

export function useServiceProvider() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('useServiceProvider must be called inside a setup function');
  }

  return {
    getCategoriesService: () => instance.appContext.config.globalProperties.$serviceProvider.getCategoriesService()
  };
}
