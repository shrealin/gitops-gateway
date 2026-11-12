import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import GatewayHome from './components/GatewayHome.vue'
import TaskNavigator from './components/TaskNavigator.vue'
import ArchitectureMap from './components/ArchitectureMap.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GatewayHome', GatewayHome)
    app.component('TaskNavigator', TaskNavigator)
    app.component('ArchitectureMap', ArchitectureMap)
  },
} satisfies Theme
