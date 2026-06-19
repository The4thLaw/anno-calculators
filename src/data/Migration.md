# Migration

Migrating data from the old HTML calculators can be assisted with the following code.

```js
console.debug(
	[...document.querySelectorAll('.chain')]
		.map((ce) => {
			const snakeToCamel = (str) =>
				str
					.toLowerCase()
					.replace(/([-\_][a-z])/g, (group) =>
						group.toUpperCase().replace('-', '').replace('\_', ''),
					)

			const product = ce.querySelector(':scope .product')
			const chainId = product.classList[1]
			const mainProdName = snakeToCamel(chainId)

			const intermediate = [...(ce.querySelectorAll(':scope .material') ?? [])]
				.map((ie) => {
					const intermediateId = ie.classList[1]
					const intermediateName = snakeToCamel(intermediateId)
					const ratio = ie.dataset['ratio']
					const dependent = snakeToCamel(ie.dataset['factory'])

					return `\tconst ${intermediateName} = new IntermediateProduct('${intermediateId}', ${dependent}, ${ratio})
	${mainProdName}Chain.steps.push(${intermediateName})
	`
				})
				.join('\n')

			const popSupports = []
			product.dataset['supports']
				.split(',')
				.forEach((v, k) => {
					if (v > 0) {
						popSupports.push(`\t${mainProdName}Chain.addSupport(new PopulationSupport(popCat${k+1}, ${v}))`)
					}
				})

			return `{
	const ${mainProdName} = new Product('${chainId}')
	const ${mainProdName}Chain = new Chain(${mainProdName})
${intermediate}
${popSupports.join('\n')}

	anno1800.value.chains.push(${mainProdName}Chain)
}
	`
		})
		.join('\n'),
)
```
