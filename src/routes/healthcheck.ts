import { createRouter, Response } from './createRouter';

export default createRouter([
  {
    path: '/healthcheck',
    method: 'get',
    handler: (_, res: Response) => {
      res.status(200).json({
        status: 'OK'
      });
    }
  }
]);