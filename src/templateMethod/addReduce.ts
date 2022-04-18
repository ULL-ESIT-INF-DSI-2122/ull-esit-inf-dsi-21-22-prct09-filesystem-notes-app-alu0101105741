import {Reduce} from './Reduce';

/**
 * AddReduce class (Extends from Reduce using Template Method)
 */
export class AddReduce extends Reduce {
  /**
   * Constructor for AddReduce
   * @param {number[]} _reduce Vector of numbers we are given to reduce
   */
  constructor(protected _reduce: number[]) {
    super(_reduce);
  }

  /**
   * Reduce method
   * @return {number} Result of the reduce method
   */
  reduce(): number {
    let result: number = 0;
    this._reduce.forEach((number) => {
      result += number;
    });

    return result;
  }

  /**
   * Function that allow us to know which method we selected
   * @return {string} String saying which method we selected
   */
  protected selectedAddReduce() {
    return 'You selected AddReduce';
  }
}
