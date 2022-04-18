/**
 * Superclass of Template Method
 */
export abstract class Reduce {
  /**
   * Constructor for Reduce
   * @param {number[]} _reduce Vector of numbers we are given to reduce
   */
  constructor(protected _reduce: number[]) {}

  /**
   * Run method that will execute our program
   * @return {string} Result that allow us to see the result of the reduce
   * method and which methos we use
   */
  public run(): string {
    this.selectedAddReduce();
    this.selectedSubReduce();
    this.selectedProdReduce();
    this.reduce();

    if (this.selectedAddReduce() !== undefined) {
      return `Result: ${this.reduce()}\n${this.selectedAddReduce()}`;
    }
    if (this.selectedSubReduce() !== undefined) {
      return `Result: ${this.reduce()}\n${this.selectedSubReduce()}`;
    }
    if (this.selectedProdReduce() !== undefined) {
      return `Result: ${this.reduce()}\n${this.selectedProdReduce()}`;
    }
  }

  protected abstract reduce(): number;
  /**
   * Hook that will let us know if we selected the AddReduce
   */
  protected selectedAddReduce() {}
  /**
   * Hook that will let us know if we selected the SubReduce
   */
  protected selectedSubReduce() {}
  /**
   * Hook that will let us know if we selected the ProdReduce
   */
  protected selectedProdReduce() {}
}

/**
 * Client function that allow us to execute our methods
 * @param {Reduce} reduce Reduce method we will use
 * @return {string} asd
 */
export function clientCode(reduce: Reduce): string {
  return reduce.run();
}
