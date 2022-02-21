import { Request, Response } from 'express';
import ListProductsService from '../services/ListProductsService';

export default class ProductsController {
  public async index(request: Request, response: Response) {
    const listProducts = new ListProductsService();
    const products = listProducts.execute();
    return response.json(products);
  }
}
