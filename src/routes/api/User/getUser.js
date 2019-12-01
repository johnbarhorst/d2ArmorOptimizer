import { User } from '../../../server';

export async function get(req, res, next) {
  const userId = req.session.userId;
  const userData = await User.findById(userId);
  console.log(userData);
  res.send(userData);

}