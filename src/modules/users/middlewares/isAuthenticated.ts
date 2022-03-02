import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

export default function isAuthenticated(
  request: Request,
  responde: Response,
  next: NextFunction,
): void {
  const authTHeader = request.headers.authorization;

  if (!authTHeader) {
    throw new AppError('JWT Token is missing.');
  }
  const [, token] = authTHeader.split(' ');

  try {
    // const decodeToken =
    verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new AppError('Invalid JWT Token');
  }
}
