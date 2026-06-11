console.debug([...document.querySelectorAll('.chain')].map(ce => {
	const snakeToCamel = str =>
		str.toLowerCase().replace(/([-_][a-z])/g, group =>
			group
			.toUpperCase()
			.replace('-', '')
			.replace('_', '')
		);
	const chainId = ce.querySelector(':scope .product').classList[1]
	const mainProdName = snakeToCamel(chainId)
  return `{
  const ${mainProdName} = new Product('${chainId}')
  const ${mainProdName}Chain = new Chain(${mainProdName})

  // TODO: intermediate products

  // TODO: supports for the chain

  anno1800.value.chains.push(${mainProdName}Chain)
}
`
}).join('\n'))