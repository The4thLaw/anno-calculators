export class Game {
	readonly id: string
	readonly name: string
	readonly imgExt: string
	readonly populationCategories: PopulationCategory[] = []
	readonly chainCategories: ChainCategory[] = []

	constructor(id: string, name: string, imgExt: string) {
		this.id = id
		this.name = name
		this.imgExt = imgExt
	}

	addPopulationCategory(pc: PopulationCategory) {
		this.populationCategories.push(pc)
	}
}

export class PopulationCategory {
	readonly name: string
	population: Population[] = []

	constructor(name: string) {
		this.name = name
	}
}

export class Population {
	readonly id: string
	readonly name: string
	count = 0

	constructor(id: string, name: string) {
		this.id = id
		this.name = name
	}
}

export class PopulationSupport {
	readonly population: Population
	readonly limit: number

	constructor(population: Population, limit: number) {
		this.population = population
		this.limit = limit
	}
}

export class ChainCategory {
	readonly name: string
	chains: Chain[] = []

	constructor(name: string) {
		this.name = name
	}
}

export class Chain {
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

	getAllProducts(): Product[] {
		return [this.finalProduct, ...this.steps]
	}
}

export class Product {
	readonly id: string
	efficiency = 100
	level: number = 0

	constructor(id: string) {
		this.id = id
	}
}

export class IntermediateProduct extends Product {
	readonly dependency: Product
	readonly ratio: number

	constructor(id: string, dependency: Product, ratio: number) {
		super(id)
		this.dependency = dependency
		this.ratio = ratio
		this.level = dependency.level + 1
	}
}
