import { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';

export const createRequestLogger = (pool: Pool) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    res.on('finish', async () => {
      const responseTime = Date.now() - startTime;
      const logEntry = {
        method: req.method,
        path: req.path,
        status: res.statusCode,
        timestamp: new Date().toISOString(),
        responseTime: responseTime,
        ip: req.ip,
        userAgent: req.get('User-Agent') || 'unknown'
      };

      await pool.query(`INSERT INTO request_logs 
                (method, path, status, timestamp, response_time, ip, user_agent) 
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        logEntry.method,
        logEntry.path,
        logEntry.status,
        logEntry.timestamp,
        logEntry.responseTime,
        logEntry.ip,
        logEntry.userAgent
      ]);
    });


    next();
  };
};