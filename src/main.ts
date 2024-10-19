import '@/assets/main.scss'

import { createApp } from 'vue';
import {createPinia} from 'pinia'
import directivesPlugin from '@/plugins/directives';
import App from './App.vue'
import router from './router'
import ServiceProviderPlugin from '@/plugins/serviceProvider.plugin';
import tooltipDirective from './directives/tooltip.directive';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(directivesPlugin);

app.use(ServiceProviderPlugin);
app.directive('tooltip', tooltipDirective);
app.mount('#app')
