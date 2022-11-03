import { auth, service } from '../../config/client/serviceAccountClient';

export const listUsers = async () => {
  const response = await service.users.list({
    auth: auth,
    domain: 'softup.co',
    customer: 'my_customer',
    orderBy: 'email',
  });
  return response.data;
};
