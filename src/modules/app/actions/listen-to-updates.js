import * as AugurJS from '../../../services/augurjs';

import { updateAssets } from '../../auth/actions/update-assets';
import { updateBlockchain } from '../../app/actions/update-blockchain';
import { loadMarket } from '../../market/actions/load-market';
import { updateOutcomePrice } from '../../markets/actions/update-outcome-price';

export function listenToUpdates() {
	return (dispatch, getState) => {
		AugurJS.listenToUpdates(

			// new block
			() => {
				dispatch(updateAssets());
				dispatch(updateBlockchain());
			},

			// transactions involving augur contracts
			() => {
				// console.log('augur contracts:', filtrate)
			},

			// outcome price update, { marketId, outcome (id), price }
			(errNone, outcomePriceChange) => {
				if (!outcomePriceChange || !outcomePriceChange.marketId || !outcomePriceChange.outcome || !outcomePriceChange.price) {
					return;
				}
				dispatch(updateOutcomePrice(outcomePriceChange.marketId, outcomePriceChange.outcome, parseFloat(outcomePriceChange.price)));
			},

			// new market, result = { blockNumber, marketId }
			(errNone, result) => {
				if (!result.marketId) {
					return;
				}
				dispatch(loadMarket(result.marketId));
			}
		);
	};
}
