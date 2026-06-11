import { ref } from 'vue'

// TODO: support chain categories

class Game {
	readonly id: string
	readonly imgExt: string
	readonly populationCategories: PopulationCategory[] = []
	readonly chains: Chain[] = []

	constructor(id: string, imgExt: string) {
		this.id = id
		this.imgExt = imgExt
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

const anno1800 = ref(new Game('1800', 'webp'))
const popOldWorld = new PopulationCategory('Old World')
anno1800.value.addPopulationCategory(popOldWorld)
const owFarmers = new Population('pop_old_world_lvl_1')
popOldWorld.population.push(owFarmers)
const owWorkers = new Population('pop_old_world_lvl_2')
popOldWorld.population.push(owWorkers)
const owArtisans = new Population('pop_old_world_lvl_3')
popOldWorld.population.push(owArtisans)
const owEngineers = new Population('pop_old_world_lvl_4')
popOldWorld.population.push(owEngineers)
const owInvestors = new Population('pop_old_world_lvl_5')
popOldWorld.population.push(owInvestors)

// Level 1: farmers

{
	const fishP = new Product('prod_fish')
	const fishC = new Chain(fishP)
	fishC.addSupport(new PopulationSupport(owFarmers, 80))
	fishC.addSupport(new PopulationSupport(owWorkers, 40))
	anno1800.value.chains.push(fishC)
}

{
	const clothesP = new Product('prod_work_clothes')
	const clothesC = new Chain(clothesP)
	const woolP = new IntermediateProduct('mat_wool', clothesP, 1)
	clothesC.steps.push(woolP)

	clothesC.addSupport(new PopulationSupport(owFarmers, 65))
	clothesC.addSupport(new PopulationSupport(owWorkers, 32.5))
	anno1800.value.chains.push(clothesC)
}

/*
<div class="cell chain">
								<div class="product prod_schnapps" data-supports="60,30,0,0,0"></div>
								<div class="material mat_potato chain--level-1" data-ratio="1" data-factory="prod_schnapps"></div>
							</div>

							<div class="cell chain">
								<div class="product mat_flour" data-supports="41.67,0,0,0,0"></div>
								<div class="material mat_grain chain--level-1" data-ratio="2" data-factory="mat_flour"></div>
							</div>
							<div class="cell chain">
								<div class="product mat_sugar" data-supports="83.33,0,0,0,0"></div>
								<div class="material mat_sugar_cane chain--level-1" data-ratio="1" data-factory="mat_sugar"></div>
							</div>
							<div class="cell chain">
								<div class="product prod_jam" data-supports="50,0,0,0,0"></div>
							</div>
							<div class="cell chain">
								<div class="product prod_soap" data-supports="285.71,240,120"></div>
								<div class="material mat_tallow chain--level-1" data-ratio="2" data-factory="prod_soap"></div>
								<div class="material mat_pigs chain--level-2" data-ratio="1" data-factory="mat_tallow"></div>
							</div>
							<div class="cell chain">
								<div class="product mat_herbs" data-supports="58.82,0,0,0,0"></div>
							</div>
							<div class="cell chain">
								<div class="product mat_hibiscus_petals" data-supports="100,0,0,0,0"></div>
							</div>
							<!-- Level 2: workers -->
							<div class="cell chain">
								<div class="product prod_sausage" data-supports="0,50,25,0,0"></div>
								<div class="material mat_pigs chain--level-1" data-ratio="1" data-factory="prod_sausage"></div>
							</div>
              */
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
/*
							<div class="cell chain">
								<div class="product prod_beer" data-supports="0,65,32.5,0,0"></div>
								<div class="material mat_malt chain--level-1" data-ratio="0.5" data-factory="prod_beer"></div>
								<div class="material mat_grain chain--level-2" data-ratio="2" data-factory="mat_malt"></div>
								<div class="material mat_hops chain--level-1" data-ratio="1.5" data-factory="prod_beer"></div>
							</div>

							<div class="cell chain">
								<div class="product prod_rum" data-supports="0,50,35,17.5,0"></div>
								<div class="material mat_sugar_cane chain--level-1" data-ratio="1" data-factory="prod_rum"></div>
								<div class="material mat_wood chain--level-1" data-ratio="0.5" data-factory="prod_rum"></div>
							</div>

							<div class="cell chain">
								<!-- workers consumption:
								 	0.0001333333 ton per residence per second
									20 workers per residence
									X is number of residences we want to sustain
									F is the number of factories (1)
									factory produces 2 / min or, or 1/30 per second
									0.0001333333 * 20 * X = 1 * 1/30
									X = 0.0001333333 * 20 / (1/30)
								-->
								<div class="product prod_high_wheeler" data-supports="0,125,0,80,40"></div>
								<div class="material mat_caoutchouc chain--level-1" data-ratio="2" data-factory="prod_high_wheeler"></div>
								<div class="material mat_steel chain--level-1" data-ratio="1" data-factory="prod_high_wheeler"></div>
								<div class="material mat_coal chain--level-2" data-ratio="0.5" data-factory="mat_steel"></div>
								<div class="material mat_iron chain--level-2" data-ratio="0.5" data-factory="mat_steel"></div>
							</div>
							<!-- TODO: penny fathings, hot sauce, beef, soccer balls, clay pipes -->
              */

export default anno1800
