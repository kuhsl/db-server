import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PublicMain from '../views/PublicMain.vue'
import FinancialMain from '../views/FinancialMain.vue'
import MedicalMain from '../views/MedicalMain.vue'
import PublicRegister from '../views/PublicRegister.vue'
import FinancialRegister from '../views/FinancialRegister.vue'
import MedicalRegister from '../views/MedicalRegister.vue'
import PublicAuthorize from '../views/PublicAuthorize.vue'
import FinancialAuthorize from '../views/FinancialAuthorize.vue'
import MedicalAuthorize from '../views/MedicalAuthorize.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/public',
    name: 'PublicMain',
    component: PublicMain
  },
  {
    path: '/financial',
    name: 'FinancialMain',
    component: FinancialMain
  },
  {
    path: '/medical',
    name: 'MedicalMain',
    component: MedicalMain
  },
  {
    path: '/public/register',
    name: 'PublicRegister',
    component: PublicRegister
  },
  {
    path: '/financial/register',
    name: 'FinancialRegister',
    component: FinancialRegister
  },
  {
    path: '/medical/register',
    name: 'MedicalRegister',
    component: MedicalRegister
  },
  {
    path: '/public/authorize',
    name: 'PublicAuthorize',
    component: PublicAuthorize
  },
  {
    path: '/financial/authorize',
    name: 'FinancialAuthorize',
    component: FinancialAuthorize
  },
  {
    path: '/medical/authorize',
    name: 'MedicalAuthorize',
    component: MedicalAuthorize
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router