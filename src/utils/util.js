

export const generateModelForRequest = (
	amountInSourceCoin,
	amountInTargetCoin,
	exchange,
	operationType,
	pair,
	price,
	orderT,
	profileID,
) => {
	const id = +profileID
	return {
		amountInSourceCoin,
		amountInTargetCoin,
		exchange,
		operations: [
			{
				operation: operationType,
				pair,
				price,
			},
		],
		// orderType,
		profileID: id,
	};
};

export  const getPairForBackend = (pair: Array<string>) : string => {
	return `${pair[0].toLowerCase()}/${pair[1].toLowerCase()}`
}
