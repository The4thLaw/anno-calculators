import { Chain, Game, IntermediateProduct, Population, PopulationCategory, PopulationSupport, Product } from '@/types/game'
import { ref } from 'vue'

const anno1800 = ref(new Game('1800', 'Anno 1800', 'webp'))
const popOldWorld = new PopulationCategory('Old World')
anno1800.value.addPopulationCategory(popOldWorld)
const owFarmers = new Population('pop_old_world_lvl_1', 'Farmers')
popOldWorld.population.push(owFarmers)
const owWorkers = new Population('pop_old_world_lvl_2', 'Workers')
popOldWorld.population.push(owWorkers)
const owArtisans = new Population('pop_old_world_lvl_3', 'Artisans')
popOldWorld.population.push(owArtisans)
const owEngineers = new Population('pop_old_world_lvl_4', 'Engineers')
popOldWorld.population.push(owEngineers)
const owInvestors = new Population('pop_old_world_lvl_5', 'Investors')
popOldWorld.population.push(owInvestors)

// Level 1: farmers

{
	const prodFish = new Product('prod_fish')
	const prodFishChain = new Chain(prodFish)


	prodFishChain.addSupport(new PopulationSupport(owFarmers, 80))
	prodFishChain.addSupport(new PopulationSupport(owWorkers, 40))

	anno1800.value.chains.push(prodFishChain)
}

{
	const prodWorkClothes = new Product('prod_work_clothes')
	const prodWorkClothesChain = new Chain(prodWorkClothes)

	const matWool = new IntermediateProduct('mat_wool', prodWorkClothes, 1)
	prodWorkClothesChain.steps.push(matWool)

	prodWorkClothesChain.addSupport(new PopulationSupport(owFarmers, 65))
	prodWorkClothesChain.addSupport(new PopulationSupport(owWorkers, 32.5))

	anno1800.value.chains.push(prodWorkClothesChain)
}

{
	const prodSchnapps = new Product('prod_schnapps')
	const prodSchnappsChain = new Chain(prodSchnapps)

	const matPotato = new IntermediateProduct('mat_potato', prodSchnapps, 1)
	prodSchnappsChain.steps.push(matPotato)

	prodSchnappsChain.addSupport(new PopulationSupport(owFarmers, 60))
	prodSchnappsChain.addSupport(new PopulationSupport(owWorkers, 30))

	anno1800.value.chains.push(prodSchnappsChain)
}

{
	const matFlour = new Product('mat_flour')
	const matFlourChain = new Chain(matFlour)

	const matGrain = new IntermediateProduct('mat_grain', matFlour, 2)
	matFlourChain.steps.push(matGrain)

	matFlourChain.addSupport(new PopulationSupport(owFarmers, 41.67))

	anno1800.value.chains.push(matFlourChain)
}

{
	const matSugar = new Product('mat_sugar')
	const matSugarChain = new Chain(matSugar)

	const matSugarCane = new IntermediateProduct('mat_sugar_cane', matSugar, 1)
	matSugarChain.steps.push(matSugarCane)

	matSugarChain.addSupport(new PopulationSupport(owFarmers, 83.33))

	anno1800.value.chains.push(matSugarChain)
}

{
	const prodJam = new Product('prod_jam')
	const prodJamChain = new Chain(prodJam)


	prodJamChain.addSupport(new PopulationSupport(owFarmers, 50))

	anno1800.value.chains.push(prodJamChain)
}

{
	const prodSoap = new Product('prod_soap')
	const prodSoapChain = new Chain(prodSoap)

	const matTallow = new IntermediateProduct('mat_tallow', prodSoap, 2)
	prodSoapChain.steps.push(matTallow)

	const matPigs = new IntermediateProduct('mat_pigs', matTallow, 1)
	prodSoapChain.steps.push(matPigs)

	prodSoapChain.addSupport(new PopulationSupport(owFarmers, 285.71))
	prodSoapChain.addSupport(new PopulationSupport(owWorkers, 240))
	prodSoapChain.addSupport(new PopulationSupport(owArtisans, 120))

	anno1800.value.chains.push(prodSoapChain)
}

{
	const matHerbs = new Product('mat_herbs')
	const matHerbsChain = new Chain(matHerbs)


	matHerbsChain.addSupport(new PopulationSupport(owFarmers, 58.82))

	anno1800.value.chains.push(matHerbsChain)
}

{
	const matHibiscusPetals = new Product('mat_hibiscus_petals')
	const matHibiscusPetalsChain = new Chain(matHibiscusPetals)


	matHibiscusPetalsChain.addSupport(new PopulationSupport(owFarmers, 100))

	anno1800.value.chains.push(matHibiscusPetalsChain)
}

{
	const prodSausage = new Product('prod_sausage')
	const prodSausageChain = new Chain(prodSausage)

	const matPigs = new IntermediateProduct('mat_pigs', prodSausage, 1)
	prodSausageChain.steps.push(matPigs)

	prodSausageChain.addSupport(new PopulationSupport(owWorkers, 50))
	prodSausageChain.addSupport(new PopulationSupport(owArtisans, 25))

	anno1800.value.chains.push(prodSausageChain)
}

{
	const prodBread = new Product('prod_bread')
	const prodBreadChain = new Chain(prodBread)

	const matFlour = new IntermediateProduct('mat_flour', prodBread, 0.5)
	prodBreadChain.steps.push(matFlour)

	const matGrain = new IntermediateProduct('mat_grain', matFlour, 2)
	prodBreadChain.steps.push(matGrain)

	prodBreadChain.addSupport(new PopulationSupport(owWorkers, 55))
	prodBreadChain.addSupport(new PopulationSupport(owArtisans, 27.5))

	anno1800.value.chains.push(prodBreadChain)
}

{
	const prodBeer = new Product('prod_beer')
	const prodBeerChain = new Chain(prodBeer)

	const matMalt = new IntermediateProduct('mat_malt', prodBeer, 0.5)
	prodBeerChain.steps.push(matMalt)

	const matGrain = new IntermediateProduct('mat_grain', matMalt, 2)
	prodBeerChain.steps.push(matGrain)

	const matHops = new IntermediateProduct('mat_hops', prodBeer, 1.5)
	prodBeerChain.steps.push(matHops)

	prodBeerChain.addSupport(new PopulationSupport(owWorkers, 65))
	prodBeerChain.addSupport(new PopulationSupport(owArtisans, 32.5))

	anno1800.value.chains.push(prodBeerChain)
}

{
	const prodRum = new Product('prod_rum')
	const prodRumChain = new Chain(prodRum)

	const matSugarCane = new IntermediateProduct('mat_sugar_cane', prodRum, 1)
	prodRumChain.steps.push(matSugarCane)

	const matWood = new IntermediateProduct('mat_wood', prodRum, 0.5)
	prodRumChain.steps.push(matWood)

	prodRumChain.addSupport(new PopulationSupport(owWorkers, 50))
	prodRumChain.addSupport(new PopulationSupport(owArtisans, 35))
	prodRumChain.addSupport(new PopulationSupport(owEngineers, 17.5))

	anno1800.value.chains.push(prodRumChain)
}

{
	const prodHighWheeler = new Product('prod_high_wheeler')
	const prodHighWheelerChain = new Chain(prodHighWheeler)

	const matCaoutchouc = new IntermediateProduct('mat_caoutchouc', prodHighWheeler, 2)
	prodHighWheelerChain.steps.push(matCaoutchouc)

	const matSteel = new IntermediateProduct('mat_steel', prodHighWheeler, 1)
	prodHighWheelerChain.steps.push(matSteel)

	const matCoal = new IntermediateProduct('mat_coal', matSteel, 0.5)
	prodHighWheelerChain.steps.push(matCoal)

	const matIron = new IntermediateProduct('mat_iron', matSteel, 0.5)
	prodHighWheelerChain.steps.push(matIron)

	prodHighWheelerChain.addSupport(new PopulationSupport(owWorkers, 125))
	prodHighWheelerChain.addSupport(new PopulationSupport(owEngineers, 80))
	prodHighWheelerChain.addSupport(new PopulationSupport(owInvestors, 40))

	anno1800.value.chains.push(prodHighWheelerChain)
}

export default anno1800
