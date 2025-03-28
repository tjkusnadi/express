import { createRouter, Response } from './createRouter';

export default createRouter([
  {
    path: '/healthcheck',
    method: 'get',
    handler: (_, res: Response) => {
      res.json({
        status: 'OK'
      });
    }
  }
]);