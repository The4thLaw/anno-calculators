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

const anno2070 = ref(new Game('2070', 'Anno 2070', 'png'))
const popEco = new PopulationCategory('Eco')
anno2070.value.addPopulationCategory(popEco)
const ecoWorkers = new Population('pop_eco_lvl_1', 'Workers')
popEco.population.push(ecoWorkers)
const ecoEmployees = new Population('pop_eco_lvl_2', 'Employees')
popEco.population.push(ecoEmployees)
const ecoEngineers = new Population('pop_eco_lvl_3', 'Engineers')
popEco.population.push(ecoEngineers)
const ecoExecutives = new Population('pop_eco_lvl_4', 'Executives')
popEco.population.push(ecoExecutives)

const popTycoon = new PopulationCategory('Tycoon')
anno2070.value.addPopulationCategory(popTycoon)
const tyWorkers = new Population('pop_tycoon_lvl_1', 'Workers')
popTycoon.population.push(tyWorkers)
const tyEmployees = new Population('pop_tycoon_lvl_2', 'Employees')
popTycoon.population.push(tyEmployees)
const tyEngineers = new Population('pop_tycoon_lvl_3', 'Engineers')
popTycoon.population.push(tyEngineers)
const tyExecutives = new Population('pop_tycoon_lvl_4', 'Executives')
popTycoon.population.push(tyExecutives)

const popTech = new PopulationCategory('Tech')
anno2070.value.addPopulationCategory(popTech)
const techLab = new Population('pop_tech_lvl_1', 'Lab assistants')
popTech.population.push(techLab)
const techResearchers = new Population('pop_tech_lvl_2', 'Researchers')
popTech.population.push(techResearchers)
const techGeniuses = new Population('pop_tech_lvl_3', 'Geniuses')
popTech.population.push(techGeniuses)

const ecoChains = new ChainCategory('Eco')
anno2070.value.chainCategories.push(ecoChains)

const tycoonChains = new ChainCategory('Tycoon')
anno2070.value.chainCategories.push(tycoonChains)

const techChains = new ChainCategory('Tech')
anno2070.value.chainCategories.push(techChains)

// Eco

{
	const prodFish = new Product('prod_fish')
	const prodFishChain = new Chain(prodFish)

	prodFishChain.addSupport(new PopulationSupport(ecoWorkers, 250))
	prodFishChain.addSupport(new PopulationSupport(ecoEmployees, 364))
	prodFishChain.addSupport(new PopulationSupport(ecoEngineers, 571))
	prodFishChain.addSupport(new PopulationSupport(ecoExecutives, 800))

	ecoChains.chains.push(prodFishChain)
}

{
	const prodTea = new Product('prod_tea')
	const prodTeaChain = new Chain(prodTea)

	prodTeaChain.addSupport(new PopulationSupport(ecoWorkers, 375))
	prodTeaChain.addSupport(new PopulationSupport(ecoEmployees, 375))
	prodTeaChain.addSupport(new PopulationSupport(ecoEngineers, 500))
	prodTeaChain.addSupport(new PopulationSupport(ecoExecutives, 750))

	ecoChains.chains.push(prodTeaChain)
}

{
	const prodHealthFood = new Product('prod_health_food')
	const prodHealthFoodChain = new Chain(prodHealthFood)
	const matVegetables = new IntermediateProduct('mat_vegetables', prodHealthFood, 2)
	prodHealthFoodChain.steps.push(matVegetables)

	const matRice = new IntermediateProduct('mat_rice', prodHealthFood, 1)
	prodHealthFoodChain.steps.push(matRice)

	prodHealthFoodChain.addSupport(new PopulationSupport(ecoEmployees, 667))
	prodHealthFoodChain.addSupport(new PopulationSupport(ecoEngineers, 857))
	prodHealthFoodChain.addSupport(new PopulationSupport(ecoExecutives, 1000))

	ecoChains.chains.push(prodHealthFoodChain)
}

{
	const prodCommunicator = new Product('prod_communicator')
	const prodCommunicatorChain = new Chain(prodCommunicator)
	const matChip = new IntermediateProduct('mat_chip', prodCommunicator, 1)
	prodCommunicatorChain.steps.push(matChip)

	const matCopper = new IntermediateProduct('mat_copper', matChip, 0.5)
	prodCommunicatorChain.steps.push(matCopper)

	const matSand = new IntermediateProduct('mat_sand', matChip, 0.3333333333)
	prodCommunicatorChain.steps.push(matSand)

	const matChipRecycled = new IntermediateProduct(
		'mat_chip_recycled',
		prodCommunicator,
		0.6666666666
	)
	prodCommunicatorChain.steps.push(matChipRecycled)

	prodCommunicatorChain.addSupport(new PopulationSupport(ecoEmployees, 571))
	prodCommunicatorChain.addSupport(new PopulationSupport(ecoEngineers, 800))
	prodCommunicatorChain.addSupport(new PopulationSupport(ecoExecutives, 1250))

	ecoChains.chains.push(prodCommunicatorChain)
}

{
	const prodBioDrink = new Product('prod_bio_drink')
	const prodBioDrinkChain = new Chain(prodBioDrink)
	const matFruit = new IntermediateProduct('mat_fruit', prodBioDrink, 2)
	prodBioDrinkChain.steps.push(matFruit)

	const matMilk = new IntermediateProduct('mat_milk', prodBioDrink, 1)
	prodBioDrinkChain.steps.push(matMilk)

	prodBioDrinkChain.addSupport(new PopulationSupport(ecoEngineers, 833))
	prodBioDrinkChain.addSupport(new PopulationSupport(ecoExecutives, 1136))

	ecoChains.chains.push(prodBioDrinkChain)
}

{
	const prodPastaDish = new Product('prod_pasta_dish')
	const prodPastaDishChain = new Chain(prodPastaDish)
	const matVegetables = new IntermediateProduct('mat_vegetables', prodPastaDish, 1)
	prodPastaDishChain.steps.push(matVegetables)

	const matPasta = new IntermediateProduct('mat_pasta', prodPastaDish, 0.5)
	prodPastaDishChain.steps.push(matPasta)

	const matWheat = new IntermediateProduct('mat_wheat', matPasta, 3)
	prodPastaDishChain.steps.push(matWheat)

	prodPastaDishChain.addSupport(new PopulationSupport(ecoEngineers, 667))
	prodPastaDishChain.addSupport(new PopulationSupport(ecoExecutives, 909))

	ecoChains.chains.push(prodPastaDishChain)
}

{
	const prod_3dProjector = new Product('prod_3d_projector')
	const prod_3dProjectorChain = new Chain(prod_3dProjector)
	const matDiamond = new IntermediateProduct('mat_diamond', prod_3dProjector, 0.5617977528)
	prod_3dProjectorChain.steps.push(matDiamond)

	const matRareEarth = new IntermediateProduct('mat_rare_earth', prod_3dProjector, 1.1235955056)
	prod_3dProjectorChain.steps.push(matRareEarth)

	const matManganese = new IntermediateProduct('mat_manganese', matRareEarth, 0.5)
	prod_3dProjectorChain.steps.push(matManganese)

	prod_3dProjectorChain.addSupport(new PopulationSupport(ecoExecutives, 750))

	ecoChains.chains.push(prod_3dProjectorChain)
}

{
	const prodRobot = new Product('prod_robot')
	const prodRobotChain = new Chain(prodRobot)
	const matChip = new IntermediateProduct('mat_chip', prodRobot, 0.5)
	prodRobotChain.steps.push(matChip)

	const matCopper = new IntermediateProduct('mat_copper', matChip, 0.5)
	prodRobotChain.steps.push(matCopper)

	const matSand = new IntermediateProduct('mat_sand', matChip, 0.3333333333)
	prodRobotChain.steps.push(matSand)

	const matChipRecycled = new IntermediateProduct('mat_chip_recycled', prodRobot, 0.3333333333)
	prodRobotChain.steps.push(matChipRecycled)

	const matBiopolymer = new IntermediateProduct('mat_biopolymer', prodRobot, 1)
	prodRobotChain.steps.push(matBiopolymer)

	const matAlga = new IntermediateProduct('mat_alga', matBiopolymer, 1)
	prodRobotChain.steps.push(matAlga)

	const matCorn = new IntermediateProduct('mat_corn', matBiopolymer, 2)
	prodRobotChain.steps.push(matCorn)

	prodRobotChain.addSupport(new PopulationSupport(ecoExecutives, 666))

	ecoChains.chains.push(prodRobotChain)
}

// Tycoon

{
	const prodFish = new Product('prod_fish')
	const prodFishChain = new Chain(prodFish)

	prodFishChain.addSupport(new PopulationSupport(tyWorkers, 250))
	prodFishChain.addSupport(new PopulationSupport(tyEmployees, 364))
	prodFishChain.addSupport(new PopulationSupport(tyEngineers, 571))
	prodFishChain.addSupport(new PopulationSupport(tyExecutives, 800))

	tycoonChains.chains.push(prodFishChain)
}

// Tech

{
	const prodFish = new Product('prod_fish')
	const prodFishChain = new Chain(prodFish)

	prodFishChain.addSupport(new PopulationSupport(techLab, 800))
	prodFishChain.addSupport(new PopulationSupport(techResearchers, 800))
	prodFishChain.addSupport(new PopulationSupport(techGeniuses, 1600))

	techChains.chains.push(prodFishChain)
}

{
	const prodFunctionalFood = new Product('prod_functional_food')
	const prodFunctionalFoodChain = new Chain(prodFunctionalFood)
	const matAlga = new IntermediateProduct('mat_alga', prodFunctionalFood, 1)
	prodFunctionalFoodChain.steps.push(matAlga)

	prodFunctionalFoodChain.addSupport(new PopulationSupport(techLab, 299))
	prodFunctionalFoodChain.addSupport(new PopulationSupport(techResearchers, 444))
	prodFunctionalFoodChain.addSupport(new PopulationSupport(techGeniuses, 1250))

	techChains.chains.push(prodFunctionalFoodChain)
}

{
	const prodFunctionalDrink = new Product('prod_functional_drink')
	const prodFunctionalDrinkChain = new Chain(prodFunctionalDrink)
	const matCaffeine = new IntermediateProduct('mat_caffeine', prodFunctionalDrink, 1)
	prodFunctionalDrinkChain.steps.push(matCaffeine)

	const matSugar = new IntermediateProduct('mat_sugar', prodFunctionalDrink, 1)
	prodFunctionalDrinkChain.steps.push(matSugar)

	prodFunctionalDrinkChain.addSupport(new PopulationSupport(techLab, 301))
	prodFunctionalDrinkChain.addSupport(new PopulationSupport(techResearchers, 735))
	prodFunctionalDrinkChain.addSupport(new PopulationSupport(techGeniuses, 1250))

	techChains.chains.push(prodFunctionalDrinkChain)
}

{
	const prodImmunityDrug = new Product('prod_immunity_drug')
	const prodImmunityDrugChain = new Chain(prodImmunityDrug)
	const matEnzyme = new IntermediateProduct('mat_enzyme', prodImmunityDrug, 1)
	prodImmunityDrugChain.steps.push(matEnzyme)

	const matCoral = new IntermediateProduct('mat_coral', prodImmunityDrug, 0.5)
	prodImmunityDrugChain.steps.push(matCoral)

	prodImmunityDrugChain.addSupport(new PopulationSupport(techResearchers, 500))
	prodImmunityDrugChain.addSupport(new PopulationSupport(techGeniuses, 667))

	techChains.chains.push(prodImmunityDrugChain)
}

{
	const prodNeuroImplant = new Product('prod_neuro_implant')
	const prodNeuroImplantChain = new Chain(prodNeuroImplant)
	const matSponge = new IntermediateProduct('mat_sponge', prodNeuroImplant, 1)
	prodNeuroImplantChain.steps.push(matSponge)

	const matChip = new IntermediateProduct('mat_chip', prodNeuroImplant, 0.5)
	prodNeuroImplantChain.steps.push(matChip)

	const matCopper = new IntermediateProduct('mat_copper', matChip, 0.5)
	prodNeuroImplantChain.steps.push(matCopper)

	const matSand = new IntermediateProduct('mat_sand', matChip, 0.3333333333)
	prodNeuroImplantChain.steps.push(matSand)

	const matChipRecycled = new IntermediateProduct('mat_chip_recycled', prodNeuroImplant, 0.3333333333)
	prodNeuroImplantChain.steps.push(matChipRecycled)

	prodNeuroImplantChain.addSupport(new PopulationSupport(techResearchers, 500))
	prodNeuroImplantChain.addSupport(new PopulationSupport(techGeniuses, 667))

	techChains.chains.push(prodNeuroImplantChain)
}

{
	const prodLabInstrument = new Product('prod_lab_instrument')
	const prodLabInstrumentChain = new Chain(prodLabInstrument)
	const matPlatinum = new IntermediateProduct('mat_platinum', prodLabInstrument, 1)
	prodLabInstrumentChain.steps.push(matPlatinum)

	const matIron = new IntermediateProduct('mat_iron', prodLabInstrument, 1)
	prodLabInstrumentChain.steps.push(matIron)

	const matIronOre = new IntermediateProduct('mat_iron_ore', matIron, 1)
	prodLabInstrumentChain.steps.push(matIronOre)

	const matCoal = new IntermediateProduct('mat_coal', matIron, 0.5)
	prodLabInstrumentChain.steps.push(matCoal)

	prodLabInstrumentChain.addSupport(new PopulationSupport(techGeniuses, 444))

	techChains.chains.push(prodLabInstrumentChain)
}

{
	const prodBionicSuit = new Product('prod_bionic_suit')
	const prodBionicSuitChain = new Chain(prodBionicSuit)
	const matBiopolymer = new IntermediateProduct('mat_biopolymer', prodBionicSuit, 1)
	prodBionicSuitChain.steps.push(matBiopolymer)

	const matAlga = new IntermediateProduct('mat_alga', matBiopolymer, 1)
	prodBionicSuitChain.steps.push(matAlga)

	const matCorn = new IntermediateProduct('mat_corn', matBiopolymer, 2)
	prodBionicSuitChain.steps.push(matCorn)

	const matExoskeleton = new IntermediateProduct('mat_exoskeleton', prodBionicSuit, 1)
	prodBionicSuitChain.steps.push(matExoskeleton)

	const matPlatinum = new IntermediateProduct('mat_platinum', matExoskeleton, 1)
	prodBionicSuitChain.steps.push(matPlatinum)

	const matElectroliteCell = new IntermediateProduct('mat_electrolite_cell', matExoskeleton, 1)
	prodBionicSuitChain.steps.push(matElectroliteCell)

	const matLithium = new IntermediateProduct('mat_lithium', matElectroliteCell, 2)
	prodBionicSuitChain.steps.push(matLithium)

	const matOmegaAcid = new IntermediateProduct('mat_omega_acid', matElectroliteCell, 2)
	prodBionicSuitChain.steps.push(matOmegaAcid)

	prodBionicSuitChain.addSupport(new PopulationSupport(techGeniuses, 1481))

	techChains.chains.push(prodBionicSuitChain)
}

export default anno2070
