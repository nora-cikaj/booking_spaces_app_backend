import { auth, service } from '../../config/client/serviceAccountClient';

export const listResources = async () => {
  const response = await service.resources.calendars.list({
    auth: auth,
    customer: 'my_customer',
  });
  return response.data;
};
