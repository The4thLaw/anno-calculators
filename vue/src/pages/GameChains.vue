<template>
	<div
		class="p-GameChains"
		:style="`background-image: url('${baseUrl}img/${game.id}/art.jpg');`"
	>
		<header>
			{{ game.name }}
		</header>
		<main>
			<section>
				<div class="select mr-4">
					<select v-model="selectedSave">
						<option />
						<option v-for="(save, name) in gameSaves" :key="name">{{name}}</option>
					</select>
				</div>
				<button class="button is-primary mr-4" @click="loadCity">Load</button>
				<button class="button is-primary mr-4" @click="saveCity">Save</button>
				<button class="button is-danger" @click="deleteCity">Delete</button>

				<label class="checkbox">
					<input type="checkbox" v-model="rounding" />
					Round requirements
				</label>
			</section>

			<section>
				<h1 class="title is-4">Population</h1>
				<section v-for="cat of game.populationCategories" :key="cat.name">
					<h2 class="title is-5">{{ cat.name }}</h2>
					<div class="fixed-grid has-5-cols has-5-cols-widescreen has-3-cols-tablet has-1-cols-mobile">
						<div class="grid">
							<div v-for="pop in cat.population" :key="pop.id" class="card cell population">
								<div class="card-content">
									<label class="label" :for="pop.id">
										<img :src="`${baseUrl}img/${game.id}/${pop.id}.${game.imgExt}`" />
										{{ pop.name }}
									</label>
									<input v-model="pop.count" :id="pop.id" class="input" type="number" min="0" />
								</div>
							</div>
						</div>
					</div>
				</section>
			</section>

			<section>
				<h1 class="title is-4">Chains</h1>
				<section v-for="(cc, i) of game.chainCategories" :key="i">
					<h2 class="title is-5">{{ cc.name }}</h2>
					<section class="grid is-col-min-12">
						<div v-for="chain of cc.chains" :key="chain.id" class="cell chain">
							<div
								class="product"
								:class="{'no-need': requirements[chain.id]!.adjusted[chain.finalProduct.id] == 0}"
							>
								<img :src="`${baseUrl}img/${game.id}/${chain.finalProduct.id}.${game.imgExt}`" />
								{{ requirements[chain.id]!.adjusted[chain.finalProduct.id] }} @
								<input v-model="chain.finalProduct.efficiency" class="input efficiency" type="number" min="1" /> %
							</div>
							<div
								v-for="step of chain.steps" :key="step.id"
								:style="`margin-left: ${step.level}em`" class="product"
								:class="{'no-need': requirements[chain.id]!.adjusted[step.id] == 0}"
							>
								<img :src="`${baseUrl}img/${game.id}/${step.id}.${game.imgExt}`" />
								{{ requirements[chain.id]!.adjusted[step.id] }} @
								<input v-model="step.efficiency" class="input efficiency" type="number" /> %
							</div>
						</div>
					</section>
				</section>
			</section>

			<section>
				<h1 class="title is-4">Requirements summary</h1>
				<div class="grid">
					<div
						v-for="(qty, prod) in requirementSummary" :key="prod"
						:class="{'no-need': qty == 0}"
					>
						<img :src="`${baseUrl}img/${game.id}/${prod}.${game.imgExt}`" />
						{{ +(qty.toFixed(2)) }}
					</div>
				</div>
			</section>
		</main>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import games from '@/data'
import type { Game } from '@/types/game'
import { useStorage } from '@vueuse/core'

const LOCAL_STORAGE_ROOT = 'anno-calculators'

const baseUrl = import.meta.env.BASE_URL
const rounding = useStorage(`${LOCAL_STORAGE_ROOT}.roundRequirements`, true)

interface Requirement {
	adjusted: Record<string, number>
	unrounded: Record<string, number>
	efficiency100: Record<string, number>
}

interface SaveGames {
	saves: Record<string, Record<string, SaveData>>
}

interface SaveData {
	name: string
	population: Record<string, number>
	efficiency: Record<string, Record<string, Record<string, number>>>
}

const round = (val: number) => {
	if (rounding.value) {
		return Math.ceil(val)
	}
	return Math.ceil(val * 100) / 100
}

const requirements = computed(() => {
	const ret: Record<string, Requirement> = {}
	for (const cat of game.value.chainCategories) {
		for (const c of cat.chains) {
			const allReqs: Record<string, number> = {}
			const unrounded: Record<string, number> = {}
			const reqsAt100Eff: Record<string, number> = {}
			allReqs[c.finalProduct.id] = round(c.supports.map(p => p.population.count / p.limit).reduce((a, b) => a+b, 0) / (c.finalProduct.efficiency / 100))
			unrounded[c.finalProduct.id] = c.supports.map(p => p.population.count / p.limit).reduce((a, b) => a+b, 0) / (c.finalProduct.efficiency / 100)
			reqsAt100Eff[c.finalProduct.id] = c.supports.map(p => p.population.count / p.limit).reduce((a, b) => a+b, 0)
			ret[c.id] = {
				adjusted: allReqs,
				unrounded: unrounded,
				efficiency100: reqsAt100Eff
			}
			for (const s of c.steps) {
				const dependencyId = s.dependency.id
				// We need to make dependency computations based on the efficiency at 100% because an intermediate
				// factory running at half its efficiency doesn't mean that its dependencies need to work twice as much
				allReqs[s.id] = round(reqsAt100Eff[dependencyId]! * s.ratio / (s.efficiency / 100))
				unrounded[s.id] = reqsAt100Eff[dependencyId]! * s.ratio / (s.efficiency / 100)
				reqsAt100Eff[s.id] = reqsAt100Eff[dependencyId]! * s.ratio
			}
		}
	}
	return ret
})

const requirementSummary = computed(() => {
	const ret: Record<string, number> = {}
	for (const cid in requirements.value) {
		for (const pid in requirements.value[cid]!.unrounded) {
			if (!ret[pid]) {
				ret[pid] = requirements.value[cid]!.unrounded[pid] ?? 0
			} else {
				ret[pid] += requirements.value[cid]!.unrounded[pid] ?? 0
			}
		}
	}

	for (const pid in ret) {
		ret[pid] = round(ret[pid]!)
	}

	return ret
})

const route = useRoute()
const game = ref({} as Game)

function loadGameData() {
	const gameName = route.params.game as string
	game.value = games[gameName]?.value!
}

function getSaveData(): SaveData | undefined {
	const name = prompt('Save name:', selectedSave.value)
	if (!name) {
		return undefined
	}

	const population: Record<string, number> = {}
	for (const cat of game.value.populationCategories) {
		for (const pop of cat.population) {
			population[pop.id] = pop.count
		}
	}

	const efficiency: Record<string, Record<string, Record<string, number>>> = {}
	for (const cat of game.value.chainCategories) {
		const catEff: Record<string, Record<string, number>> = {}
		for (const chain of cat.chains) {
			const chainEff: Record<string, number> = {}
			for (const product of chain.getAllProducts()) {
				chainEff[product.id] = product.efficiency
			}
			catEff[chain.finalProduct.id] = chainEff
		}
		efficiency[cat.name] = catEff
	}

	const save = {
		name,
		population,
		efficiency
	}
	console.debug('Saving:', save)
	return save
}

const selectedSave = ref('')
const saveGames = ref({ saves: {}} as SaveGames)
function loadSaves(): void {
	let jsonSaves = localStorage.getItem(`${LOCAL_STORAGE_ROOT}.cities`)
	if (!jsonSaves) {
		jsonSaves = '{ "saves": {} }'
	}

	const parsedSaves = JSON.parse(jsonSaves) as SaveGames

	for (const game in games) {
		const key = games[game]!.value.name
		if (!parsedSaves.saves[key]) {
			parsedSaves.saves[key] = {}
		}
	}

	console.debug('Loaded saves:', parsedSaves)

	saveGames.value = parsedSaves
}
loadSaves()

const gameSaves = computed(() => saveGames.value.saves[game.value.name]!)

function loadCity(): void {
	if (!selectedSave.value) {
		return
	}
	const save = gameSaves.value[selectedSave.value]!

	for (const spop in save.population) {
		for (const cat of game.value.populationCategories) {
			const found = cat.population.find(p => p.id === spop)
			if (found) {
				found.count = save.population[spop]!
			}
		}
	}

	for (const chainCatName in save.efficiency) {
		const chainCat = game.value.chainCategories.find(c => c.name === chainCatName)
		if (chainCat) {
			const saveCatChain = save.efficiency[chainCatName]!
			for (const chainName in saveCatChain) {
				const chain = chainCat.chains.find(c => c.finalProduct.id === chainName)
				if (chain) {
					const saveChain = saveCatChain[chainName]
					for (const productName in saveChain) {
						const product = chain.getAllProducts().find(p => p.id === productName)
						if (product) {
							product.efficiency = saveChain[productName]!
						}
					}
				}
			}
		}
	}
}

function saveCity(): void {
	loadSaves()
	const data = getSaveData()
	if (data) {
		const gameKey = game.value.name
		if (!saveGames.value.saves[gameKey]) {
			saveGames.value.saves[gameKey] = {}
		}
		saveGames.value.saves[gameKey]![data?.name] = data
	}
	writeSaves()
}

function deleteCity(): void {
	if (selectedSave.value && confirm('Are you sure you want to delete this city?')) {
		delete saveGames.value.saves[game.value.name]![selectedSave.value]
		writeSaves()
		selectedSave.value = ''
	}
}

function writeSaves(): void {
	localStorage.setItem(`${LOCAL_STORAGE_ROOT}.cities`, JSON.stringify(saveGames.value))
	loadSaves()
}

loadGameData()
watch(() => route.params, loadGameData)
</script>

<style lang="scss">
.p-GameChains {
	background-size: cover;
	background-attachment: fixed;

	header {
		text-align: center;
		text-shadow: 0px 0px 5px black;
		color: white;
		font-weight: bold;
		font-size: 300%;
		box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 1);
	}

	main {
		background-color: #fffffff0;
	}

	img {
		max-height: 40px;
	}

	.checkbox {
		display: block;
		margin: 1em 0;
	}

	.population {
		text-align: center;
		margin-bottom: var(--bulma-block-spacing);
	}

	.input.efficiency {
		display: inline;
		width: 5.5em;
	}

	.product {
		display: flex;
		align-items: center;
	}

	.no-need {
		opacity: 0.25;
	}

	.cell.chain {
		min-width: 10em;
		margin-bottom: 2em;
	}
}
</style>
