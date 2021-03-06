// import {
//   assert
// } from 'chai';
// import proxyquire from 'proxyquire';
// import sinon from 'sinon';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import testState from '../../testState';
//
// describe(`modules/markets/actions/load-market.js`, () => {
//   proxyquire.noPreserveCache();
//   const middlewares = [thunk];
//   const mockStore = configureMockStore(middlewares);
//   let store, action, out;
//   let state = Object.assign({}, testState);
//   store = mockStore(state);
//   let mockAugurJS = {};
//   mockAugurJS.loadMarket = sinon.stub();
//   mockAugurJS.loadMarket.yields(null, {
//     _id: 'test',
//     test: 'info',
//     example: 'test info'
//   });
//
//   action = proxyquire('../../../src/modules/markets/actions/load-market', {
//     '../../../services/augurjs': mockAugurJS
//   });
//
//   it(`should be able to load a market given an marketID`, () => {
//     out = [{
//       type: 'UPDATE_MARKETS_DATA',
//       test: {
//         _id: 'test',
//         test: 'info',
//         example: 'test info'
//       }
//     }];
//     store.dispatch(action.loadMarket('test'));
//     assert(mockAugurJS.loadMarket.calledOnce, `AugurJS.loadMarket() wasn't called.`);
//     assert.deepEqual(store.getActions(), out, `Didn't properly dispatch an update markets data action`);
//   });
//
// });
