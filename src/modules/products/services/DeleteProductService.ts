import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';
interface IRequest {
  id: string;
}

class DeleteProductsService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found.');
    }
    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    await productsRepository.remove(product);
  }
}

export default DeleteProductsService;
