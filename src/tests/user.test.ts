import 'mocha';
import chai from 'chai';
import chaiHttp = require('chai-http');
// import { PrismaClient } from '@prisma/client';
import initServer from '../app/app';
import routes from '../app/constants/routes';

chai.use(chaiHttp);
const { expect } = chai;
// const prisma = new PrismaClient();

describe('Test suite for user endpoint', () => {
  let server = null;
  before(async () => {
    server = await initServer();
  });
  it('Should not list users while not authenticated', async () => {
    const response = await chai.request(server)
      .get(`${routes.BASE}${routes.USER}`);

    expect(response.status).to.equal(401);
  });
});
