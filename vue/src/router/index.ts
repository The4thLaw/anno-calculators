import GameChains from '@/pages/GameChains.vue'
import GameList from '@/pages/GameList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: 'GameList',
			path: '/',
			component: GameList
		},
		{
			name: 'GameChains',
			path: '/games/:game',
			component: GameChains
		}
	]
})

export default router
