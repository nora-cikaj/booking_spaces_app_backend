import chai from 'chai';
import chaiHttp = require('chai-http');
import initServer from '../app/app';
import routes from '../app/constants/routes';
import 'mocha';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test suite for health endpoint', () => {
  let server = null;

  before(async () => {
    server = await initServer();
  });

  it('health should be of status ok', async () => {
    const response = await chai.request(server)
      .get(`${routes.BASE}${routes.HEALTH}`);
    expect(response.status).to.equal(200);
  });
});
