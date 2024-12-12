export class Product {
    constructor(
      public name: string,      // name of product
      public tags?: string[],   // an optional list of tags
      public likes?: number     // num of counts, optional
    ) {}
  }