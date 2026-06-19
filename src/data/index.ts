import type { Ref } from 'vue'
import anno1404 from './anno1404'
import anno1800 from './anno1800'
import anno2070 from './anno2070'
import type { Game } from '@/types/game'

// Note that all games are coded in JS so that it's easier to manage supports
// (we can use computed properties, which wouldn't be the case in YAML)

const games: Record<string, Ref<Game>> = {
	anno1404,
	anno1800,
	anno2070
}

export default games
