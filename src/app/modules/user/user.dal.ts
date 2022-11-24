import User from './user.model';
import { UpdateUserRequestBody } from './user.types';
import * as types from '../../types/express';
import mongoose from 'mongoose';

export const upsertUser = async ({ query, requestBody }) => {
  const user = await User.findOneAndUpdate(
    query,
    { $set: requestBody },
    { upsert: true, returnNewDocument: true, new: true },
  );
  return user;
};

export const updateUserEvents = async (
  userId: mongoose.Types.ObjectId,
  user: UpdateUserRequestBody,
) => {
  const updatedUser = await User.findByIdAndUpdate(userId, user, {
    new: true,
  });
  return updatedUser;
};

export const getUserByQuery = async (query: Partial<types.User>) => {
  const foundUser = await User.findOne(query).lean();
  return foundUser;
};

export const getAllActiveUsers = async () => {
  const users = await User.find({}, {}, { name: true }).lean();
  return users;
};
