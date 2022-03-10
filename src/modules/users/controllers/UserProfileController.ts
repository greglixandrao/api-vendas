import { Request, Response } from 'express';
import ShowUserProfileService from '../services/ShowUserProfileService';
import UpdateUserProfileService from '../services/UpdateUserProfileService';

export default class UserProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showUserProfile = new ShowUserProfileService();
    const user_id = request.user.id;

    const user = await showUserProfile.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateUserProfile = new UpdateUserProfileService();

    const user = await updateUserProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}
