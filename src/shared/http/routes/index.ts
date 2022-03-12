import { Router } from 'express';
import productsRoutes from '@modules/products/routes/products.routes';
import sessionsRoutes from '@modules/users/routes/sessions.routes';
import usersRoutes from '@modules/users/routes/users.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import userProfileRouter from '@modules/users/routes/userProfile.routes';
import customersRoutes from '@modules/customers/routes/customers.routes';
import ordersRoutes from '@modules/orders/routes/orders.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordRouter);
routes.use('/profile', userProfileRouter);
routes.use('/customers', customersRoutes);
routes.use('/orders', ordersRoutes);

export default routes;
