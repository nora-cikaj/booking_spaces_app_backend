import User from './user.model';

export const upsertUser = async ({ query, requestBody }) => {
  const user = await User.findOneAndUpdate(
    query,
    { $set: requestBody },
    { upsert: true, returnNewDocument: true, new: true },
  );
  return user;
};
