import { createRouter, createWebHistory } from 'vue-router'

// Public
import * as Public from '@/views/public'

// Admin
import * as Admin from '@/views/admin'

// Login
import Login from '@/components/Login.vue'

// Not found
import NotFound from '../components/NotFound.vue'

// Auth-Guard
import { authGuard } from '@/_helpers/auth_guard' 

const routes = [
  // Routes public
  {
    path: '/',
    name: 'home',
    component: Public.PublicHome,
    children: [
      { path: '/products', name: 'products', component: Public.Products },
      { path: '/realizations', name: 'realizations', component: Public.Realizations },
      { path: '/contact', name: 'contact', component: Public.Contact },
      
    ]
  },

  // Routes Admin
    {
      path: '/admin',
      name: 'AdminHome',
      component: Admin.AdminHome,
      children: [
        { path: 'addProduct', name:'addProduct', component: Admin.AddProduct },
        { path: 'addRealization', name:'addRealization', component: Admin.AddRealization },
        { path: 'orders', name:'orders', component: Admin.Orders },
        { path: 'bills', name:'bills', component: Admin.Bills },
        { path: 'stocks', name:'stocks', component: Admin.Stocks },
        { path: 'editProduct/:id(\\d+)', name:'editProduct', component: Admin.EditProduct, props:true },
        { path: 'editRealization/:id(\\d+)', name:'editRealization', component: Admin.EditRealization, props:true },
        { path: '/:pathMatch(.*)*', redirect: '/admin'}
      ]
    },

  // Route Login
  { path: '/login', name: 'login', component: Login },
  // Route not found  
  {
    path: '/:pathMatch(.*)*', 
    //redirect:'/',
    name: 'notFound',
    component: NotFound
    
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Protection des routes Admin

router.beforeEach((to, from, next)=> {
  console.log('from:', from.path); 
  console.log('to:', to);
  if (to.path.match('/admin')) {
    authGuard()
  }
  next()
})


export default router
