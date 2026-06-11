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
      <img :src="`img/${anno1800.id}/${chain.finalProduct.id}.${anno1800.imgExt}`" />
			{{ requirements[chain.id].adjusted[chain.finalProduct.id]}} @
			<input v-model="chain.finalProduct.efficiency" type="number" /> %
			<div :style="`margin-left: ${step.level}em`" v-for="step of chain.steps">
				<h3>{{ step.id }}</h3>
        <img :src="`img/${anno1800.id}/${step.id}.${anno1800.imgExt}`" />
				{{ requirements[chain.id].adjusted[step.id] }} @
				<input v-model="step.efficiency" type="number" /> %
			</div>
		</section>
	</section>
	<pre>{{ anno1800 }}</pre>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import anno1800 from '@/data/anno1800'

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

</script>

<style scoped></style>
