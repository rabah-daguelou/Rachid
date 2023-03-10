import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Importer Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css';

// Importer Fontawesome
    // La librairie
    import { library } from '@fortawesome/fontawesome-svg-core'
    
    // component 
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    // Importer les icones à utiliser 
    import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
    import { faPhone } from '@fortawesome/free-solid-svg-icons'

    // Ajouter les icones dans la librairie
    library.add(faUserSecret)
    library.add(faPhone);

// Ajouter le composant fontawesome
createApp(App)
.use(store)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
