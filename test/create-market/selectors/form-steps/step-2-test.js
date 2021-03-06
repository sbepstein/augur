import {
	assert
} from 'chai';
import {
	BINARY,
	CATEGORICAL,
	SCALAR,
	COMBINATORIAL
} from '../../../../src/modules/markets/constants/market-types';
import * as selector from '../../../../src/modules/create-market/selectors/form-steps/step-2';

describe(`modules/create-market/selectors/form-steps/step-2.js`, () => {
	let formState1, formState2, formState3, formState4, out1, out2, out3, out4;

	it('should handle selecting type of market and return correct data', () => {
		formState1 = {
			type: BINARY
		};
		formState2 = {
			type: CATEGORICAL
		};
		formState3 = {
			type: SCALAR,
			scalarSmallNum: 10,
			scalarBigNum: 100
		};
		formState4 = {
			type: COMBINATORIAL
		};
		out1 = {
			descriptionPlaceholder: 'Will "Batman v Superman: Dawn of Justice" take more than $150 million box in office receipts opening weekend?',
			descriptionMinLength: 1,
			descriptionMaxLength: 256
		};
		out2 = {
			descriptionPlaceholder: 'Who will win the Four Nations Rugby Championship in 2016?',
			descriptionMinLength: 1,
			descriptionMaxLength: 256,
			categoricalOutcomesMinNum: 2,
			categoricalOutcomesMaxNum: 8,
			categoricalOutcomeMaxLength: 250
		};
		out3 = {
			descriptionPlaceholder: 'What will the temperature (in degrees Fahrenheit) be in San Francisco, California, on July 1, 2016?',
			descriptionMinLength: 1,
			descriptionMaxLength: 256,
			scalarSmallNum: 10,
			scalarBigNum: 100
		};
		out4 = {
			descriptionPlaceholder: 'Combinatorial',
			descriptionMinLength: 1,
			descriptionMaxLength: 256
		};


		assert.deepEqual(selector.select(formState1), out1, `Didn't produce the expected object`);
		assert.deepEqual(selector.select(formState2), out2, `Didn't produce the expected object`);
		assert.deepEqual(selector.select(formState3), out3, `Didn't produce the expected object`);
		assert.deepEqual(selector.select(formState4), out4, `Didn't produce the expected object`);
	});

	it('should handle calling initialFairPrices and return correct data', () => {
		formState1 = {
			type: BINARY
		};
		formState2 = {
			type: CATEGORICAL
		};
		formState3 = {
			type: SCALAR
		};
		out1 = {
			initialFairPrices: {
				type: BINARY,
				values: [],
				raw: []
			}
		};
		out2 = {
			initialFairPrices: {
				type: CATEGORICAL,
				values: [],
				raw: []
			}
		};
		out3 = {
			initialFairPrices: {
				type: SCALAR,
				values: [],
				raw: []
			}
		};

		assert.deepEqual(selector.initialFairPrices(formState1), out1, `Didn't produce the expected object`);
		assert.deepEqual(selector.initialFairPrices(formState2), out2, `Didn't produce the expected object`);
		assert.deepEqual(selector.initialFairPrices(formState3), out3, `Didn't produce the expected object`);
	});

	it(`should handle validation of step 2`, () => {
		formState1 = {
			type: BINARY,
			descriptionPlaceholder: 'Will "Batman v Superman: Dawn of Justice" take more than $150 million box in office receipts opening weekend?',
			descriptionMinLength: 1,
			descriptionMaxLength: 256
		};

		formState2 = {
			descriptionPlaceholder: 'Who will win the Four Nations Rugby Championship in 2016?',
			descriptionMinLength: 1,
			descriptionMaxLength: 256,
			categoricalOutcomesMinNum: 2,
			categoricalOutcomesMaxNum: 8,
			categoricalOutcomeMaxLength: 250
		};

		formState3 = {
			descriptionPlaceholder: 'What will the temperature (in degrees Fahrenheit) be in San Francisco, California, on July 1, 2016?',
			descriptionMinLength: 1,
			descriptionMaxLength: 256,
			scalarSmallNum: 10,
			scalarBigNum: 100
		};

		formState4 = {
			descriptionPlaceholder: 'Combinatorial',
			descriptionMinLength: 1,
			descriptionMaxLength: 256
		};

		assert(!selector.isValid(formState1), `Didn't properly invalidate a formstate without description`);
		formState1.description = 'test1234 this is a description';
		assert(!selector.isValid(formState1), `Didn't properly invalidate a formState without a valid endDate`);
		formState1.endDate = Date('01/01/3000');
		assert(selector.isValid(formState1), `Didn't properly validate a BINARY form state`);

		formState2.description = 'test1234 this is a description';
		formState2.endDate = Date('01/01/3000');
		formState3.description = 'test1234 this is a description';
		formState3.endDate = Date('01/01/3000');
		formState4.description = 'test1234 this is a description';
		formState4.endDate = Date('01/01/3000');

		assert(selector.isValid(formState2), `Didn't properly validate a CATEGORICAL form state`);
		assert(selector.isValid(formState3), `Didn't properly validate a SCALAR form state`);
		assert(selector.isValid(formState4), `Didn't properly validate a COMBINATORIAL form state`);
	});

	it(`should handle errors in step 2`, () => {
		formState1 = {
			type: BINARY,
			description: '',
			endDate: 'notadate'
		};
		formState2 = {
			type: CATEGORICAL,
			categoricalOutcomes: [1]
		};
		formState3 = {
			type: SCALAR,
			scalarSmallNum: 200,
			scalarBigNum: 1
		};
		out1 = {
			description: 'Please enter your question',
			endDate: null
		};
		out2 = {
			categoricalOutcomes: ['Answer cannot be blank']
		};
		out3 = {
			scalarSmallNum: 'Minimum must be less than maximum',
			scalarBigNum: 'Maximum must be greater than minimum'
		};

		assert.deepEqual(selector.errors(formState1), out1, `Didn't catch the expected errors for BINARY forms`);
		assert.deepEqual(selector.errors(formState2), out2, `Didn't catch the expected errors for SCALAR forms`);
		assert.deepEqual(selector.errors(formState3), out3, `Didn't catch the expected errors for CATEGORICAL forms`);

	});
});
