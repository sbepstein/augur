import {
	assert
} from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import testState from '../../testState';

let markets;
describe(`modules/markets/selectors/markets.js`, () => {
	proxyquire.noPreserveCache().noCallThru();
	const middlewares = [thunk];
	const mockStore = configureMockStore(middlewares);
	let store, selector, out, test;
	let state = Object.assign({}, testState, {
		selectedMarketsHeader: 'pending reports',
		pagination: {
			numPerPage: 5,
			selectedPageNum: 1
		}
	});
	store = mockStore(state);
	let mockSelectors = {
		unpaginatedMarkets: [{
			id: 'test1',
			isFavorite: true,
			isPendingReport: false,
			positionsSummary: {
				qtyShares: {
					value: 5
				}
			},
			description: 'test 1',
			tags: ['testtag', 'test']
		}, {
			id: 'test2',
			isFavorite: false,
			isPendingReport: true,
			positionsSummary: {
				qtyShares: {
					value: 10
				}
			},
			description: 'test 2',
			tags: ['testtag', 'test']
		}, {
			id: 'test3',
			isFavorite: true,
			isPendingReport: false,
			positionsSummary: {
				qtyShares: {
					value: 5
				}
			},
			description: 'test 3',
			tags: ['testtag', 'test']
		}, {
			id: 'test4',
			isFavorite: false,
			isPendingReport: true,
			description: 'test 4',
			tags: ['testtag', 'test']
		}, {
			id: 'test5',
			isFavorite: true,
			isPendingReport: false,
			positionsSummary: {
				qtyShares: {
					value: 5
				}
			},
			description: 'test 5',
			tags: ['testtag', 'test']
		}, {
			id: 'test6',
			isFavorite: false,
			isPendingReport: true,
			positionsSummary: {
				qtyShares: {
					value: 10
				}
			},
			description: 'test 6',
			tags: ['testtag', 'test']
		}]
	};

	selector = proxyquire('../../../src/modules/markets/selectors/markets.js', {
		'../../../store': store,
		'../../../selectors': mockSelectors
	});

	markets = selector;

	beforeEach(() => {
		store.clearActions();
	});

	afterEach(() => {
		store.clearActions();
	});

	it(`should return unpaginatedMarkets if selectedMarketsHeader is PENDING_REPORTS`, () => {
		test = selector.default();
		assert.deepEqual(test, mockSelectors.unpaginatedMarkets, `Didn't return the expected markets`);
	});

	it(`should return unpaginatedMarkets if activePage is POSITIONS`, () => {
		state.activePage = 'positions';
		test = selector.default();
		assert.deepEqual(test, mockSelectors.unpaginatedMarkets, `Didn't return all markets with positions as expected`);
	});

	it(`should return paginated markets`, () => {
		state.activePage = testState.activePage;
		state.selectedMarketsHeader = 'test';
		test = selector.default();
		out = [{
			id: 'test1',
			isFavorite: true,
			isPendingReport: false,
			positionsSummary: {
				qtyShares: {
					value: 5
				}
			},
			description: 'test 1',
			tags: ['testtag', 'test']
		}, {
			id: 'test2',
			isFavorite: false,
			isPendingReport: true,
			positionsSummary: {
				qtyShares: {
					value: 10
				}
			},
			description: 'test 2',
			tags: ['testtag', 'test']
		}, {
			id: 'test3',
			isFavorite: true,
			isPendingReport: false,
			positionsSummary: {
				qtyShares: {
					value: 5
				}
			},
			description: 'test 3',
			tags: ['testtag', 'test']
		}, {
			id: 'test4',
			isFavorite: false,
			isPendingReport: true,
			description: 'test 4',
			tags: ['testtag', 'test']
		}, {
			id: 'test5',
			isFavorite: true,
			isPendingReport: false,
			positionsSummary: {
				qtyShares: {
					value: 5
				}
			},
			description: 'test 5',
			tags: ['testtag', 'test']
		}];

		assert.deepEqual(test, out, `Didn't return only markets that are pending reports`);
	});
});

export default markets;
