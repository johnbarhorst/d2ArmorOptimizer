import { User } from '../../../server';

export async function get(req, res, next) {
  const userId = req.session.userId;
  const data = await User.findById(userId);
  const userData = JSON.stringify(data);
  console.log('Response from getUser');
  console.log(data);
  console.log(userData);
  res.send(userData);

}