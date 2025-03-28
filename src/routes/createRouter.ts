import { Router, Request, Response, RequestHandler } from 'express';

interface RouteConfig {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    handler: RequestHandler
}

export function createRouter(routes: RouteConfig[]) {
  const router = Router();

  routes.forEach(({ path, method, handler }) => {
    router[method](path, handler);
  });

  return router;
}

export { Request, Response };