<template>
	round: <input type="checkbox" v-model="rounding" />
	<section>
		<h1>Population</h1>
		<section v-for="cat of anno1800.populationCategories">
			<h2>{{ cat.name }}</h2>
			<div v-for="pop in cat.population">
				{{ pop.id }}: <input v-model="pop.count" type="number" />
			</div>
		</section>
	</section>

	<section>
		<h1>Chains</h1>
		<pre>{{ requirements }}</pre>
		<hr>
		<pre>{{ requirementSummary }}</pre>
		<hr>
		<section v-for="chain of anno1800.chains">
			<h2>{{ chain.finalProduct.id }}</h2>
			{{ requirements[chain.id].adjusted[chain.finalProduct.id]}} @
			<input v-model="chain.finalProduct.efficiency" type="number" /> %
			<div :style="`margin-left: ${step.level}em`" v-for="step of chain.steps">
				<h3>{{ step.id }}</h3>
				{{ requirements[chain.id].adjusted[step.id]}} @
				<input v-model="step.efficiency" type="number" /> %
			</div>
		</section>
	</section>
	<pre>{{ anno1800 }}</pre>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'

const rounding = ref(false)

const requirements = computed(() => {
	const ret = {}
	for (const c of anno1800.value.chains) {
		const round = (val: number) => {
			if (rounding.value) {
				return Math.ceil(val)
			}
			return Math.ceil(val * 100) / 100
		}
		const allReqs = {}
		const reqsAt100Eff = {}
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
			// TODO: rounding
			allReqs[s.id] = round(reqsAt100Eff[dependencyId] * s.ratio / (s.efficiency / 100))
			reqsAt100Eff[s.id] = reqsAt100Eff[dependencyId] * s.ratio
		}
	}
	return ret
})

const requirementSummary = computed(() => {
	const ret: Record<string, number> = {}
	for (const cid in requirements.value) {
		for (const pid in requirements.value[cid].adjusted) {
			if (!ret[pid]) {
				ret[pid] = requirements.value[cid].adjusted[pid]
			} else {
				ret[pid] += requirements.value[cid].adjusted[pid]
			}
		}
	}
	return ret
})

class Game {
	readonly id: string
	readonly populationCategories: PopulationCategory[] = []
	readonly chains: Chain[] = []

	constructor(id: string) {
		this.id = id
	}

	addPopulationCategory(pc: PopulationCategory) {
		this.populationCategories.push(pc)
	}
}

class PopulationCategory {
	readonly name: string
	population: Population[] = []

	constructor(name: string) {
		this.name = name
	}
}

class Population {
	readonly id: string
	readonly count = 110

	constructor(id: string) {
		this.id = id
	}
}

class PopulationSupport {
	readonly population: Population
	readonly limit: number

	constructor(population: Population, limit: number) {
		this.population = population
		this.limit = limit
	}
}

class Chain {
	readonly id: string
	readonly supports: PopulationSupport[] = []
	readonly finalProduct: Product
	readonly steps: IntermediateProduct[] = []

	constructor(finalProduct: Product) {
		this.id = `c_${finalProduct.id}_${crypto.randomUUID()}`
		this.finalProduct = finalProduct
	}

	addSupport(support: PopulationSupport) {
		this.supports.push(support)
	}
}

class Product {
	readonly id: string
	efficiency = 100
	level: number = 0

	constructor(id: string) {
		this.id = id
	}
}

class IntermediateProduct extends Product {
	readonly dependency: Product
	readonly ratio: number

	constructor(id: string, dependency: Product, ratio: number) {
		super(id)
		this.dependency = dependency
		this.ratio = ratio
		this.level = dependency.level + 1
	}
}

const anno1800 = ref(new Game('1800'))
const popOldWorld = new PopulationCategory('Old World')
anno1800.value.addPopulationCategory(popOldWorld)
const owFarmers = new Population('pop_old_world_lvl_1')
popOldWorld.population.push(owFarmers)
const owWorkers = new Population('pop_old_world_lvl_2')
popOldWorld.population.push(owWorkers)

{
	const fishP = new Product('prod_fish')
	const fishC = new Chain(fishP)
	fishC.addSupport(new PopulationSupport(owFarmers, 80))
	fishC.addSupport(new PopulationSupport(owWorkers, 40))
	anno1800.value.chains.push(fishC)
}

{
	const breadP = new Product('prod_bread')
	const breadC = new Chain(breadP)
	const flourP = new IntermediateProduct('mat_flour', breadP, 0.5)
	breadC.steps.push(flourP)
	const grainP = new IntermediateProduct('mat_grain', flourP, 2)
	breadC.steps.push(grainP)

	breadC.addSupport(new PopulationSupport(owWorkers, 55))
	anno1800.value.chains.push(breadC)
}
</script>

<style scoped></style>
