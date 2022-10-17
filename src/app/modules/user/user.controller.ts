import { Response, NextFunction } from 'express';
import * as service from './user.service';
import { CustomRequest, User } from '../../types/express';
import { CreateUserRequestBody } from './user.types';

export const getLoggedInUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req;
  try {
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};
export const getUsers = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await service.listUsers();
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};
export const upsertUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const requestBody: CreateUserRequestBody = req.body;
  try {
    const createdUser: User = await service.upsertUser({ requestBody });
    res.status(200).send(createdUser);
  } catch (e) {
    next(e);
  }
};

export const getSingleUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  try {
    const user: User = await service.getSingleUser({ id });
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  const admin = (req.query.admin === 'true');
  try {
    await service.updateUser({ id, admin });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  try {
    await service.deleteUser({ id });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
