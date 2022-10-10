'use strict';

const { app } = require('egg-mock/bootstrap');

describe('organism -personnew', () => {
  it('oranism index', () => {
    return app.httpRequest().get('/testpang').expect(200)
      .expect('<h2>zhsdawd</h2>');
    // expect是你需要的东西
  });
});
