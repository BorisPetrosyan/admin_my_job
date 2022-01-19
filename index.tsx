// /* eslint-disable */
// // @flow
//
// import React, { useState, useEffect, useCallback } from 'react';
// import { useFormik } from 'formik';
// import ReactTooltip from 'react-tooltip';
// // @ts-ignore
// import { number, object } from 'yup';
// import styles from '@me/containers/DashboardsNew/DashboardsWrapper/styles.module.scss';
// import { Button, HorizontalInput } from '@base/components';
// import ExchangeSlider from '@base/components/ExchangeSlider/ExchangeSlider';
// import HeaderForm from '@me/containers/DashboardsNew/Forms/headerForm';
// import { generateModelForRequest , getPairForBackend  } from '@me/containers/DashboardsNew/DashboardsWrapper/util';
//
// export type exchangeToDotType = {
// 	amountInSourceCoin: number | string
// 	amountInTargetCoin?: string,
// 	exchange:string,
// 	operations:Array<any>,
// 	price: number | string
// 	total: number
// 	sliderPercent: number
// 	orderType?: number | string
// 	profileID?: number
// };
//
// export enum TAB_TYPES {
// 	LIMIT = 'limit',
// 	MARKET = 'market'
// }
//
//
// const ExchangeBuy = ({ onSubmit, pairOptions, wallet, coinName, profileID, limit, nameOfAccountCoin }: any) => {
//
// 	const initialValues: any = {
// 		amountInSourceCoin: '',
// 		total: 0,
// 		price: 0,
// 		sliderPercent: 0,
// 	};
//
// 	const initialValuesLimit: any = {
// 		prevLimitAmount: '',
// 		prevLimitTotal: 0,
// 		prevLimitPrice: 0
// 	}
//
// 	const initialValuesMarket: any = {
// 		prevMarketAmount: '',
// 		prevMarketTotal: 0,
// 	}
//
// 	const [marketTabValues, setMarketTabValues] = useState<any>(initialValuesMarket)
// 	const [limitTabValues, setLimitTabValues] = useState<any>(initialValuesLimit)
// 	const [coinPrice, setCoinPrice] = useState(0)
// 	const [walletCount , setWalletCount] =  useState<number>(0);
// 	const [walletName , setWalletName] =  useState('');
// 	const [focusAmount, setFocusAmount] = useState<boolean>(false);
// 	const [focusPrice, setFocusPrice] = useState<boolean>(false);
// 	const [ amountTooltipMessage, setAmountTooltipMessage] = useState<string>('');
// 	const [ priceTooltipMessage, setAPriceTooltipMessage] = useState<string>('');
// 	const [ pairSymbol, setPairSymbol ] = useState([]);
// 	let inputAmountRef: any= React.useRef(null);
// 	let inputPriceRef: any= React.useRef(null);
//
//
//
// 	useEffect(() => {
// 		if(!wallet.forSellPrice) {
// 			setWalletCount(0)
// 			setWalletName(coinName.forSell)
// 			return
// 		}
// 		setWalletCount(wallet.forSellPrice.value)
// 		setWalletName(wallet.forSellPrice.label)
// 	},[wallet,coinName])
//
//
// 	const validationSchema = object().shape({
// 		amountInSourceCoin: number()
// 			.positive( 'Please enter a amount')
// 			.max(walletCount, `Max Amount ${walletCount}`)
// 			.required('Please enter a amount'),
// 		price: number()
// 			.min(coinPrice, `the minimal price is ${coinPrice}`)
// 			.required('Please enter a price'),
// 	});
//
// 	const {
// 		resetForm,
// 		handleChange,
// 		handleSubmit,
// 		values,
// 		errors,
// 		validateForm,
// 		setErrors,
// 		setValues,
// 		setFieldValue,
// 		touched
// 	} = useFormik<exchangeToDotType>({
// 		initialValues: initialValues,
// 		validateOnChange: true,
// 		validateOnBlur: true,
// 		onSubmit: ({ amountInSourceCoin , price, total }) => onSubmit(
// 			generateModelForRequest(
// 				amountInSourceCoin,
// 				0,
// 				Object.keys(nameOfAccountCoin)[0],
// 				'buy',
// 				getPairForBackend(pairSymbol),
// 				price,
// 				limit,
// 				+profileID
// 			),
// 		),
// 		validationSchema,
// 		validateOnMount: false,
// 	});
//
//
//
// 	const onFocusAmount = (): void => {
// 		setFocusAmount(true);
// 		setFocusPrice(false);
// 	};
//
// 	const onFocusPrice = (): void => {
// 		setFocusAmount(false);
// 		setFocusPrice(true);
// 	};
//
// 	const onBlur = (): void => {
// 		setFocusAmount(false);
// 		setFocusPrice(false);
// 	};
//
// 	const getPriceCalculatedValue = () => {
// 		return '';
// 	}
//
// 	const getAmountCalculatedValue = () => {
// 		return '';
// 	}
//
// 	useEffect(() => {
// 		setLimitTabValues(initialValuesLimit)
// 		setMarketTabValues(initialValuesMarket)
// 	},[pairOptions])
//
// 	useEffect(() => {
// 		resetForm()
// 		if (!Object.keys(pairOptions).length) return;
// 		setCoinPrice(pairOptions.price)
// 		setPairSymbol(pairOptions?.symbol.split('-'));
// 		setFieldValue('price', pairOptions.price ? +pairOptions.price  : 0);
//
//
// 	}, [pairOptions,limit]);
//
// 	useEffect(()=> {
// 		if(limit === TAB_TYPES.LIMIT) {
// 			setFieldValue('amountInSourceCoin', limitTabValues.prevLimitAmount );
// 			setFieldValue('total', limitTabValues.prevLimitTotal);
// 		}
// 		if(limit === TAB_TYPES.MARKET) {
// 			setFieldValue('amountInSourceCoin', marketTabValues.prevMarketAmount );
// 			setFieldValue('total', marketTabValues.prevMarketTotal);
// 		}
// 		if(limitTabValues.prevLimitPrice && limit === TAB_TYPES.LIMIT) {
// 			setFieldValue('price', limitTabValues.prevLimitPrice);
// 		}
// 	},[limit,limitTabValues])
//
//
// 	useEffect(() => {
// 		errors && errors.amountInSourceCoin ? setAmountTooltipMessage(errors.amountInSourceCoin) : setAmountTooltipMessage(getAmountCalculatedValue())
// 	}, [errors, amountTooltipMessage])
//
//
// 	useEffect(() => {
// 		errors && errors.price ? setAPriceTooltipMessage(errors.price) : setAPriceTooltipMessage(getPriceCalculatedValue())
// 	}, [errors, priceTooltipMessage])
//
// 	// @ts-ignore
// 	const handleSliderChanges = useCallback((e: any) => {
// 		const amount = ((e * walletCount ) / 100);
// 		setFieldValue('sliderPercent', e)
// 		setFieldValue('amountInSourceCoin', amount)
// 		// @ts-ignore
// 		setFieldValue('total', values.price * amount)
// 		validateForm().then(res => {
// 			setErrors(res)
// 		})
// 	})
//
//
// 	const handleAmountChanges = (e: any): void => {
// 		if (!pairOptions) return;
// 		// // @ts-ignore
// 		if (pairOptions.price) {
// 			const price = (e.target.value * +values.price)
// 			if(limit === TAB_TYPES.LIMIT) {
// 				setLimitTabValues({
// 					...limitTabValues,
// 					prevLimitAmount: e.target.value,
// 					prevLimitTotal: price
// 				})
// 			}
// 			if(limit === TAB_TYPES.MARKET) {
// 				setMarketTabValues({
// 					...marketTabValues,
// 					prevMarketAmount: e.target.value,
// 					prevMarketTotal: price
// 				})
// 			}
// 			const amount = e.target.value;
// 			// @ts-ignore
// 			setFieldValue('sliderPercent', (amount / walletCount) * 100);
// 			// @ts-ignore
// 			setFieldValue('total', amount * values.price);
// 		}
// 	};
//
// 	const handleTotalChanges = (e: any): void => {
// 		if (!pairOptions) return;
// 		if (pairOptions.price) {
// 			const price = e.target.value / +values.price
// 			if(limit === TAB_TYPES.LIMIT) {
// 				setLimitTabValues({
// 					...limitTabValues,
// 					prevLimitAmount: price,
// 					prevLimitTotal: e.target.value
// 				})
// 			}
// 			if(limit === TAB_TYPES.MARKET) {
// 				setMarketTabValues({
// 					...marketTabValues,
// 					prevMarketAmount: price,
// 					prevMarketTotal: e.target.value
// 				})
// 			}
// 			// @ts-ignore
// 			setFieldValue('amountInSourceCoin', price);
// 		}
// 	};
//
// 	const handlePriceChanges = (e: any): void => {
// 		const price = e.target.value;
// 		const val = values.total / price
// 		if (price <= 0) {
// 			setValues(initialValues);
// 			setLimitTabValues(initialValuesLimit)
// 		} else {
// 			setFieldValue('price', price);
// 			if (values.amountInSourceCoin > 0) {
// 				setFieldValue('amountInSourceCoin', val);
// 			}
// 			if (values.total > 0) {
// 				setFieldValue('total', val);
// 			}
// 			setLimitTabValues({
// 				...limitTabValues,
// 				prevLimitAmount: val,
// 				prevLimitPrice: +price
// 			})
// 		}
// 	};
// 	return (
// 		<div className={styles.newOrderContent}>
// 			<HeaderForm
// 				pairOptions={pairOptions}
// 				walletCount={walletCount}
// 				walletName={walletName}
// 				exChangeBuy
// 			/>
// 			<form onSubmit={handleSubmit}>
// 				<ReactTooltip
// 					globalEventOff="click"
// 					id="amount-input"
// 					place={'top'}
// 					effect	='solid'
// 					className={styles.customTooltip}
// 					offset={{left: 0}}
// 					getContent={() => amountTooltipMessage}
// 					ref={(el) => inputAmountRef = el}
// 				/>
//
// 				<div className={styles.inputWrapper}
// 						 data-for="amount-input" data-tip
// 						 data-event="click"
// 						 data-effect	='solid'>
// 					<HorizontalInput
// 						focus={focusAmount}
// 						enableTooltip={true}
// 						error={errors.amountInSourceCoin && touched.amountInSourceCoin? errors.amountInSourceCoin : null}
// 						type='number'
// 						label='Amount'
// 						name='amountInSourceCoin'
// 						labelSuffix={pairSymbol[0]}
// 						value={values.amountInSourceCoin}
// 						onChange={(e: any) => {
// 							handleAmountChanges(e);
// 							handleChange(e);
// 						}}
// 						onFocus={() => { onFocusAmount(); ReactTooltip.hide(inputPriceRef.current);} }
// 						onBlur={onBlur}
// 					/>
// 				</div>
//
// 				<ReactTooltip
// 					globalEventOff="click"
// 					id="price-input"
// 					place={'top'}
// 					effect='solid'
// 					className={styles.customTooltip}
// 					offset={{left: 0}}
// 					getContent={() => priceTooltipMessage}
// 					ref={(el) => inputPriceRef = el}
// 				/>
// 				<div className={styles.inputWrapper}
// 						 data-for="price-input"
// 						 data-tip
// 						 data-event="click"
// 						 data-effect	='solid'>
// 					<HorizontalInput
// 						disabled={limit === TAB_TYPES.MARKET}
// 						focus={focusPrice}
// 						enableTooltip={true}
// 						error={errors.price && touched.price? errors.price : null}
// 						type='number'
// 						label='Price'
// 						name='price'
// 						labelSuffix={pairSymbol[1]}
// 						value={values.price}
// 						onChange={(e: any) => {handleChange(e); handlePriceChanges(e)}}
// 						onFocus={() => {onFocusPrice(); ReactTooltip.hide(inputAmountRef.current)}}
// 						onBlur={onBlur}
// 					/>
// 				</div>
// 				<ExchangeSlider exchangeDot={values.sliderPercent}  handleSliderChanges={(e: any) => handleSliderChanges(e)} />
// 				<div className={styles.inputWrapper}>
// 					<HorizontalInput
// 						type='number'
// 						label='Total'
// 						name='total'
// 						labelSuffix='BTC'
// 						onBlur={onBlur}
// 						value={values.total}
// 						onChange={(e: any) => {handleTotalChanges(e); handleChange(e)}}
// 					/>
// 				</div>
// 				<Button
// 					type='submit'
// 					theme='green'
// 					fluid
// 				>BUY {pairSymbol[0]}</Button>
// 			</form>
// 		</div>
// 	);
// };
//
// export default ExchangeBuy;
