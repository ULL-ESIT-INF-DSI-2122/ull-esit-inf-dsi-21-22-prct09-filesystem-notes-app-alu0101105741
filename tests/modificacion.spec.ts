/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';
import {AddReduce} from '../src/templateMethod/addReduce';
import {SubReduce} from '../src/templateMethod/subReduce';
import {ProdReduce} from '../src/templateMethod/prodReduce';
import {clientCode} from '../src/templateMethod/Reduce';

describe('Test block on modification (Template Method pattern)', () => {
  const toReduce: number[] = [7, 9, 23, 5, 7, 4, 65, 3];

  it('addReduce([7, 9, 23, 5, 7, 4, 65, 3])', () => {
    expect(clientCode(new AddReduce(toReduce))).to.equal('Result: 123\nYou selected AddReduce');
  });

  it('subReduce([7, 9, 23, 5, 7, 4, 65, 3])', () => {
    expect(clientCode(new SubReduce(toReduce))).to.equal('Result: -123\nYou selected SubReduce');
  });

  it('prodReduce([7, 9, 23, 5, 7, 4, 65, 3])', () => {
    expect(clientCode(new ProdReduce(toReduce))).to.equal('Result: 39557700\nYou selected ProdReduce');
  });
});
