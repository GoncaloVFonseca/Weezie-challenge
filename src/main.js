import { createApp } from 'vue'
import App from './App.vue'
import OpenLayersMap from 'vue3-openlayers'

import './assets/main.css'

const app = createApp(App);
app.use(OpenLayersMap)

app.mount('#app')