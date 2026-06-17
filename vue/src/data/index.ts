import type { Ref } from 'vue'
import anno1800 from './anno1800'
import type { Game } from '@/types/game'

// Note that all games are coded in JS so that it's easier to manage supports
// (we can use computed properties, which wouldn't be the case in YAML)

const games: Record<string, Ref<Game>> = {
	'anno1800': anno1800
}

export default games
