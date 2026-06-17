import {
	Chain,
	ChainCategory,
	Game,
	IntermediateProduct,
	Population,
	PopulationCategory,
	PopulationSupport,
	Product
} from '@/types/game'
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

const oldWorldChains = new ChainCategory('Old world')
anno1800.value.chainCategories.push(oldWorldChains)

// Level 1: farmers

{
	const prodFish = new Product('prod_fish')
	const prodFishChain = new Chain(prodFish)

	prodFishChain.addSupport(new PopulationSupport(owFarmers, 80))
	prodFishChain.addSupport(new PopulationSupport(owWorkers, 40))

	oldWorldChains.chains.push(prodFishChain)
}

{
	const prodWorkClothes = new Product('prod_work_clothes')
	const prodWorkClothesChain = new Chain(prodWorkClothes)

	const matWool = new IntermediateProduct('mat_wool', prodWorkClothes, 1)
	prodWorkClothesChain.steps.push(matWool)

	prodWorkClothesChain.addSupport(new PopulationSupport(owFarmers, 65))
	prodWorkClothesChain.addSupport(new PopulationSupport(owWorkers, 32.5))

	oldWorldChains.chains.push(prodWorkClothesChain)
}

{
	const prodSchnapps = new Product('prod_schnapps')
	const prodSchnappsChain = new Chain(prodSchnapps)

	const matPotato = new IntermediateProduct('mat_potato', prodSchnapps, 1)
	prodSchnappsChain.steps.push(matPotato)

	prodSchnappsChain.addSupport(new PopulationSupport(owFarmers, 60))
	prodSchnappsChain.addSupport(new PopulationSupport(owWorkers, 30))

	oldWorldChains.chains.push(prodSchnappsChain)
}

// Lifestyle
/*
{
	const matFlour = new Product('mat_flour')
	const matFlourChain = new Chain(matFlour)

	const matGrain = new IntermediateProduct('mat_grain', matFlour, 2)
	matFlourChain.steps.push(matGrain)

	matFlourChain.addSupport(new PopulationSupport(owFarmers, 41.67))

	oldWorldChains.chains.push(matFlourChain)
}
*/

// Lifestyle
/*
{
	const matSugar = new Product('mat_sugar')
	const matSugarChain = new Chain(matSugar)

	const matSugarCane = new IntermediateProduct('mat_sugar_cane', matSugar, 1)
	matSugarChain.steps.push(matSugarCane)

	matSugarChain.addSupport(new PopulationSupport(owFarmers, 83.33))

	oldWorldChains.chains.push(matSugarChain)
}
*/

// Lifestyle
/*
{
	const prodJam = new Product('prod_jam')
	const prodJamChain = new Chain(prodJam)

	prodJamChain.addSupport(new PopulationSupport(owFarmers, 50))

	oldWorldChains.chains.push(prodJamChain)
}
*/

{
	const prodSoap = new Product('prod_soap')
	const prodSoapChain = new Chain(prodSoap)

	const matTallow = new IntermediateProduct('mat_tallow', prodSoap, 2)
	prodSoapChain.steps.push(matTallow)

	const matPigs = new IntermediateProduct('mat_pigs', matTallow, 1)
	prodSoapChain.steps.push(matPigs)

	// Lifestyle
	// prodSoapChain.addSupport(new PopulationSupport(owFarmers, 285.71))
	prodSoapChain.addSupport(new PopulationSupport(owWorkers, 240))
	prodSoapChain.addSupport(new PopulationSupport(owArtisans, 120))

	oldWorldChains.chains.push(prodSoapChain)
}

// Lifestyle
/*
{
	const matHerbs = new Product('mat_herbs')
	const matHerbsChain = new Chain(matHerbs)

	matHerbsChain.addSupport(new PopulationSupport(owFarmers, 58.82))

	oldWorldChains.chains.push(matHerbsChain)
}
*/

// Lifestyle
/*
{
	const matHibiscusPetals = new Product('mat_hibiscus_petals')
	const matHibiscusPetalsChain = new Chain(matHibiscusPetals)

	matHibiscusPetalsChain.addSupport(new PopulationSupport(owFarmers, 100))

	oldWorldChains.chains.push(matHibiscusPetalsChain)
}
*/

// Level 2: Workers

{
	const prodSausage = new Product('prod_sausage')
	const prodSausageChain = new Chain(prodSausage)

	const matPigs = new IntermediateProduct('mat_pigs', prodSausage, 1)
	prodSausageChain.steps.push(matPigs)

	prodSausageChain.addSupport(new PopulationSupport(owWorkers, 50))
	prodSausageChain.addSupport(new PopulationSupport(owArtisans, 25))

	oldWorldChains.chains.push(prodSausageChain)
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

	oldWorldChains.chains.push(prodBreadChain)
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

	oldWorldChains.chains.push(prodBeerChain)
}

{
	const prodRum = new Product('prod_rum')
	const prodRumChain = new Chain(prodRum)

	const matSugarCane = new IntermediateProduct('mat_sugar_cane', prodRum, 1)
	prodRumChain.steps.push(matSugarCane)

	const matWood = new IntermediateProduct('mat_wood', prodRum, 0.5)
	prodRumChain.steps.push(matWood)

	// Lifestyle
	//prodRumChain.addSupport(new PopulationSupport(owWorkers, 50))
	prodRumChain.addSupport(new PopulationSupport(owArtisans, 35))
	prodRumChain.addSupport(new PopulationSupport(owEngineers, 17.5))

	oldWorldChains.chains.push(prodRumChain)
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

	/*
		0.0001333333 ton per residence per second
		20 workers per residence
		X is number of residences we want to sustain
		F is the number of factories (1)
		factory produces 2 / min or, or 1/30 per second
		0.0001333333 * 20 * X = 1 * 1/30
		X = 0.0001333333 * 20 / (1/30)
	*/
	// Lifestyle
	//prodHighWheelerChain.addSupport(new PopulationSupport(owWorkers, 125))
	prodHighWheelerChain.addSupport(new PopulationSupport(owEngineers, 80))
	prodHighWheelerChain.addSupport(new PopulationSupport(owInvestors, 40))

	oldWorldChains.chains.push(prodHighWheelerChain)
}

// Lifestyle
/*
{
	const prodBeef = new Product('mat_beef')
	const prodBeefChain = new Chain(prodBeef)

	prodBeefChain.addSupport(new PopulationSupport(owWorkers, 200))

	oldWorldChains.chains.push(prodBeefChain)
}
*/

// Level 3: Artisans

{
	const prodCanned = new Product('prod_canned_food')
	const prodCannedChain = new Chain(prodCanned)

	const matIron = new IntermediateProduct('mat_iron', prodCanned, 1 / 6)
	prodCannedChain.steps.push(matIron)

	const matGoulash = new IntermediateProduct('mat_goulash', prodCanned, 8 / 6)
	prodCannedChain.steps.push(matGoulash)

	const matBeef = new IntermediateProduct('mat_beef', matGoulash, 1)
	prodCannedChain.steps.push(matBeef)

	const matRedPepper = new IntermediateProduct('mat_red_pepper', matGoulash, 1)
	prodCannedChain.steps.push(matRedPepper)

	prodCannedChain.addSupport(new PopulationSupport(owArtisans, 390 / 6))
	prodCannedChain.addSupport(new PopulationSupport(owEngineers, 195 / 6))

	oldWorldChains.chains.push(prodCannedChain)
}

{
	const prodSewing = new Product('prod_sewing_machine')
	const prodSewingChain = new Chain(prodSewing)

	const matSteel = new IntermediateProduct('mat_steel', prodSewing, 1)
	prodSewingChain.steps.push(matSteel)

	const matWood = new IntermediateProduct('mat_wood', prodSewing, 0.5)
	prodSewingChain.steps.push(matWood)

	const matCoal = new IntermediateProduct('mat_coal', matSteel, 0.5)
	prodSewingChain.steps.push(matCoal)

	const matIron = new IntermediateProduct('mat_iron', matSteel, 0.5)
	prodSewingChain.steps.push(matIron)

	prodSewingChain.addSupport(new PopulationSupport(owArtisans, 140 / 2))
	prodSewingChain.addSupport(new PopulationSupport(owEngineers, 70 / 2))

	oldWorldChains.chains.push(prodSewingChain)
}

{
	const prodFurCoat = new Product('prod_fur_coat')
	const prodFurCoatChain = new Chain(prodFurCoat)

	const matFabric = new IntermediateProduct('mat_cotton_fabric', prodFurCoat, 1)
	prodFurCoatChain.steps.push(matFabric)

	const matCotton = new IntermediateProduct('mat_cotton', matFabric, 2)
	prodFurCoatChain.steps.push(matCotton)

	const matFur = new IntermediateProduct('mat_fur', prodFurCoat, 2)
	prodFurCoatChain.steps.push(matFur)

	prodFurCoatChain.addSupport(new PopulationSupport(owArtisans, 75))
	prodFurCoatChain.addSupport(new PopulationSupport(owEngineers, 37.5))

	oldWorldChains.chains.push(prodFurCoatChain)
}

// Level 4: Engineers

{
	const prodGlasses = new Product('prod_glasses')
	const prodGlassesChain = new Chain(prodGlasses)

	const matGlass = new IntermediateProduct('mat_glass', prodGlasses, 1/3)
	prodGlassesChain.steps.push(matGlass)

	const matSand = new IntermediateProduct('mat_sand', matGlass, 1)
	prodGlassesChain.steps.push(matSand)

	const matBrass = new IntermediateProduct('mat_brass', prodGlasses, 2/3)
	prodGlassesChain.steps.push(matBrass)

	const matCopper = new IntermediateProduct('mat_copper', matBrass, 1/2)
	prodGlassesChain.steps.push(matCopper)

	const matZinc = new IntermediateProduct('mat_zinc', matBrass, 1/2)
	prodGlassesChain.steps.push(matZinc)

	prodGlassesChain.addSupport(new PopulationSupport(owEngineers, 225 / 3))
	prodGlassesChain.addSupport(new PopulationSupport(owInvestors, 112.5 / 3))

	oldWorldChains.chains.push(prodGlassesChain)
}

// TODO: coffee https://anno1800.fandom.com/wiki/Coffee
// TODO: light bulbs https://anno1800.fandom.com/wiki/Light_Bulbs
// TODO: pocket watches https://anno1800.fandom.com/wiki/Pocket_Watches

// Level 5: Investors

// TODO: champagne https://anno1800.fandom.com/wiki/Champagne
// TODO: cigars https://anno1800.fandom.com/wiki/Cigars
// TODO: chocolate https://anno1800.fandom.com/wiki/Chocolate
// TODO: steam carriages https://anno1800.fandom.com/wiki/Steam_Carriages
// TODO: Jewellery https://anno1800.fandom.com/wiki/Jewellery
// TODO: gramophones https://anno1800.fandom.com/wiki/Gramophones

export default anno1800
