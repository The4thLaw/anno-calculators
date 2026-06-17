<template>
	<div
		class="p-GameChains"
		:style="`background-image: url('${baseUrl}img/${game.id}/art.jpg');`"
	>
		<header>
			{{ game.name }}
		</header>
		<main>
			<!-- TODO: load/save/delete city -->
			<!-- TODO: styling: banner, population names, icons and cards -->

			round: <input type="checkbox" v-model="rounding" />
			<section>
				<h1 class="title is-4">Population</h1>
				<section v-for="cat of game.populationCategories" :key="cat.name">
					<h2 class="title is-5">{{ cat.name }}</h2>
					<div class="grid">
						<div v-for="pop in cat.population" :key="pop.id" class="card cell population">
							<div class="card-content">
								<label class="label" :for="pop.id">
									<img :src="`${baseUrl}img/${game.id}/${pop.id}.${game.imgExt}`" />
									{{ pop.name }}
								</label>
								<input v-model="pop.count" :id="pop.id" class="input" type="number" />
							</div>
						</div>
					</div>
				</section>
			</section>

			<section>
				<h1 class="title is-4">Chains</h1>
				<section class="grid is-col-min-12">
					<div v-for="chain of game.chains" :key="chain.id" class="cell chain">
						<div
							class="product"
							:class="{'no-need': requirements[chain.id]!.adjusted[chain.finalProduct.id] == 0}"
						>
							<img :src="`${baseUrl}img/${game.id}/${chain.finalProduct.id}.${game.imgExt}`" />
							{{ requirements[chain.id]!.adjusted[chain.finalProduct.id] }} @
							<input v-model="chain.finalProduct.efficiency" class="input efficiency" type="number" /> %
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

const baseUrl = import.meta.env.BASE_URL
const rounding = ref(false)

interface Requirement {
	adjusted: Record<string, number>
	efficiency100: Record<string, number>
}

const requirements = computed(() => {
	const ret: Record<string, Requirement> = {}
	for (const c of game.value.chains) {
		const round = (val: number) => {
			if (rounding.value) {
				return Math.ceil(val)
			}
			return Math.ceil(val * 100) / 100
		}
		const allReqs: Record<string, number> = {}
		const reqsAt100Eff: Record<string, number> = {}
		allReqs[c.finalProduct.id] = round(c.supports.map(p => p.population.count / p.limit).reduce((a, b) => a+b, 0) / (c.finalProduct.efficiency / 100))
		reqsAt100Eff[c.finalProduct.id] = c.supports.map(p => p.population.count / p.limit).reduce((a, b) => a+b, 0)
		ret[c.id] = {
			adjusted: allReqs,
			efficiency100: reqsAt100Eff
		}
		for (const s of c.steps) {
			const dependencyId = s.dependency.id
			// We need to make dependency computations based on the efficiency at 100% because an intermediate
			// factory running at half its efficiency doesn't mean that its dependencies need to work twice as much
			allReqs[s.id] = round(reqsAt100Eff[dependencyId]! * s.ratio / (s.efficiency / 100))
			reqsAt100Eff[s.id] = reqsAt100Eff[dependencyId]! * s.ratio
		}
	}
	return ret
})

const requirementSummary = computed(() => {
	const ret: Record<string, number> = {}
	for (const cid in requirements.value) {
		for (const pid in requirements.value[cid]!.adjusted) {
			if (!ret[pid]) {
				ret[pid] = requirements.value[cid]!.adjusted[pid] ?? 0
			} else {
				ret[pid] += requirements.value[cid]!.adjusted[pid] ?? 0
			}
		}
	}
	return ret
})

const route = useRoute()
const game = ref({} as Game)

function loadData() {
	const gameName = route.params.game as string
	game.value = games[gameName]?.value!
}

loadData()
watch(() => route.params, loadData)
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
		background-color: #fffffff6;
	}

	img {
		max-height: 40px;
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
