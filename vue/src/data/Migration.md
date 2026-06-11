	console.debug(
		[...document.querySelectorAll('.chain')]
			.map((ce) => {
				const snakeToCamel = (str) =>
					str
						.toLowerCase()
						.replace(/([-\_][a-z])/g, (group) =>
							group.toUpperCase().replace('-', '').replace('\_', ''),
						)

				const chainId = ce.querySelector(':scope .product').classList[1]
				const mainProdName = snakeToCamel(chainId)

				const intermediate = [...(ce.querySelectorAll(':scope .material') ?? [])]
						.map((ie) => {
							const intermediateId = ie.classList[1]
							const intermediateName = snakeToCamel(intermediateId)
							const ratio = ie.dataset['ratio']
							const dependent = snakeToCamel(ie.dataset['factory'])

							return `\tconst ${intermediateName} = new IntermediateProduct('${intermediateId}', ${dependent}, ${ratio})
	\t${mainProdName}Chain.steps.push(${intermediateName})
	`
						})
						.join('\n')

				return `{
	\tconst ${mainProdName} = new Product('${chainId}')
	\tconst ${mainProdName}Chain = new Chain(${mainProdName})

	${intermediate}

	// TODO: supports for the chain

	\tanno1800.value.chains.push(${mainProdName}Chain)
	}
	`
			})
			.join('\n'),
	)

	/*
		const flourP = new IntermediateProduct('mat_flour', breadP, 0.5)
		breadC.steps.push(flourP)
		const grainP = new IntermediateProduct('mat_grain', flourP, 2)
		breadC.steps.push(grainP)
	*/
