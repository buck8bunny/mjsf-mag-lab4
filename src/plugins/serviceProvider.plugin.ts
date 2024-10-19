import type { App } from 'vue';
import serviceProvider from '@/services';

const ServiceProviderPlugin = {
    install(app: App) {
        // Додаємо глобальну властивість $serviceProvider
        app.config.globalProperties.$serviceProvider = serviceProvider;
    }
};

export default ServiceProviderPlugin;