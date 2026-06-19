import { Chain, ChainCategory, Game, IntermediateProduct, Population, PopulationCategory, PopulationSupport, Product } from '@/types/game'
import { ref } from 'vue'

const anno1404 = ref(new Game('1404', 'Anno 1404', 'png'))

const popOccident = new PopulationCategory('Occident')
anno1404.value.addPopulationCategory(popOccident)
const beggars = new Population('pop_beggar', 'Beggars')
popOccident.population.push(beggars)
const peasants = new Population('pop_peasant', 'Peasants')
popOccident.population.push(peasants)
const citizens = new Population('pop_citizen', 'Citizens')
popOccident.population.push(citizens)
const patricians = new Population('pop_patrician', 'Patricians')
popOccident.population.push(patricians)
const noblemen = new Population('pop_nobleman', 'Noblemen')
popOccident.population.push(noblemen)

const popOrient = new PopulationCategory('Occident')
anno1404.value.addPopulationCategory(popOrient)
const nomads = new Population('pop_nomad', 'Nomads')
popOrient.population.push(nomads)
const envoys = new Population('pop_envoy', 'Envoys')
popOrient.population.push(envoys)

const occidentChains = new ChainCategory('Occident')
anno1404.value.chainCategories.push(occidentChains)

const orientChains = new ChainCategory('Orient')
anno1404.value.chainCategories.push(orientChains)

// Occident

{
	const prodFish = new Product('prod_fish')
	const prodFishChain = new Chain(prodFish)

	prodFishChain.addSupport(new PopulationSupport(beggars, 286))
	prodFishChain.addSupport(new PopulationSupport(peasants, 200))
	prodFishChain.addSupport(new PopulationSupport(citizens, 500))
	prodFishChain.addSupport(new PopulationSupport(patricians, 909))
	prodFishChain.addSupport(new PopulationSupport(noblemen, 1250))

	occidentChains.chains.push(prodFishChain)
}

{
	const prodCider = new Product('prod_cider')
	const prodCiderChain = new Chain(prodCider)

	prodCiderChain.addSupport(new PopulationSupport(beggars, 500))
	prodCiderChain.addSupport(new PopulationSupport(peasants, 340))
	prodCiderChain.addSupport(new PopulationSupport(citizens, 340))
	prodCiderChain.addSupport(new PopulationSupport(patricians, 652))
	prodCiderChain.addSupport(new PopulationSupport(noblemen, 1153))

	occidentChains.chains.push(prodCiderChain)
}

{
	const prodSpice = new Product('prod_spice')
	const prodSpiceChain = new Chain(prodSpice)

	prodSpiceChain.addSupport(new PopulationSupport(citizens, 500))
	prodSpiceChain.addSupport(new PopulationSupport(patricians, 909))
	prodSpiceChain.addSupport(new PopulationSupport(noblemen, 1250))

	occidentChains.chains.push(prodSpiceChain)
}

{
	const prodLinenGarment = new Product('prod_linen_garment')
	const prodLinenGarmentChain = new Chain(prodLinenGarment)
	const matHemp = new IntermediateProduct('mat_hemp', prodLinenGarment, 2)
	prodLinenGarmentChain.steps.push(matHemp)

	prodLinenGarmentChain.addSupport(new PopulationSupport(citizens, 500))
	prodLinenGarmentChain.addSupport(new PopulationSupport(patricians, 909))
	prodLinenGarmentChain.addSupport(new PopulationSupport(noblemen, 1250))

	occidentChains.chains.push(prodLinenGarmentChain)
}

{
	const prodBread = new Product('prod_bread')
	const prodBreadChain = new Chain(prodBread)
	const matFlour = new IntermediateProduct('mat_flour', prodBread, 1)
	prodBreadChain.steps.push(matFlour)

	const matWheat = new IntermediateProduct('mat_wheat', matFlour, 2)
	prodBreadChain.steps.push(matWheat)

	prodBreadChain.addSupport(new PopulationSupport(patricians, 726))
	prodBreadChain.addSupport(new PopulationSupport(noblemen, 1020))

	occidentChains.chains.push(prodBreadChain)
}

{
	const prodBeer = new Product('prod_beer')
	const prodBeerChain = new Chain(prodBeer)
	const matHerb = new IntermediateProduct('mat_herb', prodBeer, 1)
	prodBeerChain.steps.push(matHerb)

	const matWheat = new IntermediateProduct('mat_wheat', prodBeer, 1)
	prodBeerChain.steps.push(matWheat)

	prodBeerChain.addSupport(new PopulationSupport(patricians, 625))
	prodBeerChain.addSupport(new PopulationSupport(noblemen, 1071))

	occidentChains.chains.push(prodBeerChain)
}

{
	const prodLeatherJerkin = new Product('prod_leather_jerkin')
	const prodLeatherJerkinChain = new Chain(prodLeatherJerkin)
	const matSalt = new IntermediateProduct('mat_salt', prodLeatherJerkin, 0.5)
	prodLeatherJerkinChain.steps.push(matSalt)

	const matBrine = new IntermediateProduct('mat_brine', matSalt, 1)
	prodLeatherJerkinChain.steps.push(matBrine)

	const matCoal = new IntermediateProduct('mat_coal', matSalt, 1)
	prodLeatherJerkinChain.steps.push(matCoal)

	const matAnimalHide = new IntermediateProduct('mat_animal_hide', prodLeatherJerkin, 2)
	prodLeatherJerkinChain.steps.push(matAnimalHide)

	prodLeatherJerkinChain.addSupport(new PopulationSupport(patricians, 1425))
	prodLeatherJerkinChain.addSupport(new PopulationSupport(noblemen, 2500))

	occidentChains.chains.push(prodLeatherJerkinChain)
}

{
	const prodBook = new Product('prod_book')
	const prodBookChain = new Chain(prodBook)
	const matIndigo = new IntermediateProduct('mat_indigo', prodBook, 2)
	prodBookChain.steps.push(matIndigo)

	const matPaper = new IntermediateProduct('mat_paper', prodBook, 0.5)
	prodBookChain.steps.push(matPaper)

	const matWood = new IntermediateProduct('mat_wood', matPaper, 2)
	prodBookChain.steps.push(matWood)

	prodBookChain.addSupport(new PopulationSupport(patricians, 1875))
	prodBookChain.addSupport(new PopulationSupport(noblemen, 3333))

	occidentChains.chains.push(prodBookChain)
}

{
	const prodCandlestick = new Product('prod_candlestick')
	const prodCandlestickChain = new Chain(prodCandlestick)
	const matCandle = new IntermediateProduct('mat_candle', prodCandlestick, 1.5)
	prodCandlestickChain.steps.push(matCandle)

	const matBeeswax = new IntermediateProduct('mat_beeswax', matCandle, 2)
	prodCandlestickChain.steps.push(matBeeswax)

	const matHemp = new IntermediateProduct('mat_hemp', matCandle, 1)
	prodCandlestickChain.steps.push(matHemp)

	const matBrass = new IntermediateProduct('mat_brass', prodCandlestick, 0.75)
	prodCandlestickChain.steps.push(matBrass)

	const matCopperOre = new IntermediateProduct('mat_copper_ore', matBrass, 1)
	prodCandlestickChain.steps.push(matCopperOre)

	const matCoal = new IntermediateProduct('mat_coal', matBrass, 0.6666666666)
	prodCandlestickChain.steps.push(matCoal)

	prodCandlestickChain.addSupport(new PopulationSupport(patricians, 2500))
	prodCandlestickChain.addSupport(new PopulationSupport(noblemen, 3333))

	occidentChains.chains.push(prodCandlestickChain)
}

{
	const prodMeat = new Product('prod_meat')
	const prodMeatChain = new Chain(prodMeat)
	const matCattle = new IntermediateProduct('mat_cattle', prodMeat, 2)
	prodMeatChain.steps.push(matCattle)

	const matSalt = new IntermediateProduct('mat_salt', prodMeat, 0.5)
	prodMeatChain.steps.push(matSalt)

	const matBrine = new IntermediateProduct('mat_brine', matSalt, 1)
	prodMeatChain.steps.push(matBrine)

	const matCoal = new IntermediateProduct('mat_coal', matSalt, 1)
	prodMeatChain.steps.push(matCoal)

	prodMeatChain.addSupport(new PopulationSupport(noblemen, 726))

	occidentChains.chains.push(prodMeatChain)
}

{
	const prodWine = new Product('prod_wine')
	const prodWineChain = new Chain(prodWine)
	const matGrape = new IntermediateProduct('mat_grape', prodWine, 3)
	prodWineChain.steps.push(matGrape)

	const matBarrel = new IntermediateProduct('mat_barrel', prodWine, 1)
	prodWineChain.steps.push(matBarrel)

	const matWood = new IntermediateProduct('mat_wood', matBarrel, 1)
	prodWineChain.steps.push(matWood)

	const matIron = new IntermediateProduct('mat_iron', matBarrel, 0.5)
	prodWineChain.steps.push(matIron)

	const matIronOre = new IntermediateProduct('mat_iron_ore', matIron, 1)
	prodWineChain.steps.push(matIronOre)

	const matCoal = new IntermediateProduct('mat_coal', matIron, 1)
	prodWineChain.steps.push(matCoal)

	prodWineChain.addSupport(new PopulationSupport(noblemen, 1000))

	occidentChains.chains.push(prodWineChain)
}

{
	const prodFurCoat = new Product('prod_fur_coat')
	const prodFurCoatChain = new Chain(prodFurCoat)
	const matSalt = new IntermediateProduct('mat_salt', prodFurCoat, 0.3333333333)
	prodFurCoatChain.steps.push(matSalt)

	const matBrine = new IntermediateProduct('mat_brine', matSalt, 1)
	prodFurCoatChain.steps.push(matBrine)

	const matCoal = new IntermediateProduct('mat_coal', matSalt, 1)
	prodFurCoatChain.steps.push(matCoal)

	const matFur = new IntermediateProduct('mat_fur', prodFurCoat, 1)
	prodFurCoatChain.steps.push(matFur)

	prodFurCoatChain.addSupport(new PopulationSupport(noblemen, 1562))

	occidentChains.chains.push(prodFurCoatChain)
}

{
	const prodBrocadeRobe = new Product('prod_brocade_robe')
	const prodBrocadeRobeChain = new Chain(prodBrocadeRobe)
	const matSilk = new IntermediateProduct('mat_silk', prodBrocadeRobe, 2)
	prodBrocadeRobeChain.steps.push(matSilk)

	const matGold = new IntermediateProduct('mat_gold', prodBrocadeRobe, 1)
	prodBrocadeRobeChain.steps.push(matGold)

	const matCoal = new IntermediateProduct('mat_coal', matGold, 0.75)
	prodBrocadeRobeChain.steps.push(matCoal)

	const matGoldOre = new IntermediateProduct('mat_gold_ore', matGold, 1)
	prodBrocadeRobeChain.steps.push(matGoldOre)

	prodBrocadeRobeChain.addSupport(new PopulationSupport(noblemen, 2112))

	occidentChains.chains.push(prodBrocadeRobeChain)
}

{
	const prodGlasses = new Product('prod_glasses')
	const prodGlassesChain = new Chain(prodGlasses)
	const matQuartz = new IntermediateProduct('mat_quartz', prodGlasses, 0.75)
	prodGlassesChain.steps.push(matQuartz)

	const matBrass = new IntermediateProduct('mat_brass', prodGlasses, 0.75)
	prodGlassesChain.steps.push(matBrass)

	const matCopperOre = new IntermediateProduct('mat_copper_ore', matBrass, 1)
	prodGlassesChain.steps.push(matCopperOre)

	const matCoal = new IntermediateProduct('mat_coal', matBrass, 0.6666666666)
	prodGlassesChain.steps.push(matCoal)

	prodGlassesChain.addSupport(new PopulationSupport(noblemen, 1709))

	occidentChains.chains.push(prodGlassesChain)
}

// Orient


{
	const prodDate = new Product('prod_date')
	const prodDateChain = new Chain(prodDate)

	prodDateChain.addSupport(new PopulationSupport(nomads, 450))
	prodDateChain.addSupport(new PopulationSupport(envoys, 600))

	orientChains.chains.push(prodDateChain)
}

{
	const prodMilk = new Product('prod_milk')
	const prodMilkChain = new Chain(prodMilk)

	prodMilkChain.addSupport(new PopulationSupport(nomads, 450))
	prodMilkChain.addSupport(new PopulationSupport(envoys, 600))

	orientChains.chains.push(prodMilkChain)
}

{
	const prodCarpet = new Product('prod_carpet')
	const prodCarpetChain = new Chain(prodCarpet)
	const matSilk = new IntermediateProduct('mat_silk', prodCarpet, 1)
	prodCarpetChain.steps.push(matSilk)

	const matIndigo = new IntermediateProduct('mat_indigo', prodCarpet, 1)
	prodCarpetChain.steps.push(matIndigo)

	prodCarpetChain.addSupport(new PopulationSupport(nomads, 900))
	prodCarpetChain.addSupport(new PopulationSupport(envoys, 1500))

	orientChains.chains.push(prodCarpetChain)
}

{
	const prodMarzipan = new Product('prod_marzipan')
	const prodMarzipanChain = new Chain(prodMarzipan)
	const matAlmond = new IntermediateProduct('mat_almond', prodMarzipan, 2)
	prodMarzipanChain.steps.push(matAlmond)

	const matSugar = new IntermediateProduct('mat_sugar', prodMarzipan, 1)
	prodMarzipanChain.steps.push(matSugar)

	const matSugarCane = new IntermediateProduct('mat_sugar_cane', matSugar, 2)
	prodMarzipanChain.steps.push(matSugarCane)

	prodMarzipanChain.addSupport(new PopulationSupport(envoys, 2453))

	orientChains.chains.push(prodMarzipanChain)
}

{
	const prodCoffee = new Product('prod_coffee')
	const prodCoffeeChain = new Chain(prodCoffee)
	const matCoffeeBean = new IntermediateProduct('mat_coffee_bean', prodCoffee, 2)
	prodCoffeeChain.steps.push(matCoffeeBean)

	prodCoffeeChain.addSupport(new PopulationSupport(envoys, 1000))

	orientChains.chains.push(prodCoffeeChain)
}

{
	const prodPearlNecklace = new Product('prod_pearl_necklace')
	const prodPearlNecklaceChain = new Chain(prodPearlNecklace)
	const matPearl = new IntermediateProduct('mat_pearl', prodPearlNecklace, 1)
	prodPearlNecklaceChain.steps.push(matPearl)

	prodPearlNecklaceChain.addSupport(new PopulationSupport(envoys, 1040))

	orientChains.chains.push(prodPearlNecklaceChain)
}

{
	const prodPerfume = new Product('prod_perfume')
	const prodPerfumeChain = new Chain(prodPerfume)
	const matRoseOil = new IntermediateProduct('mat_rose_oil', prodPerfume, 3)
	prodPerfumeChain.steps.push(matRoseOil)

	prodPerfumeChain.addSupport(new PopulationSupport(envoys, 1250))

	orientChains.chains.push(prodPerfumeChain)
}


export default anno1404
