import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface iRequest {
  id: string;
}
class ShowCustomerService {
  public async execute({ id }: iRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found');
    }
    return customer;
  }
}

export default ShowCustomerService;
