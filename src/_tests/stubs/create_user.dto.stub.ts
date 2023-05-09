import { CreateUserDto } from '../../_dtos/create_user.dto';

export const CreateUserDtoStub = (): CreateUserDto => {
  return {
    email: 'manojsethi@manojsethi.com',
    name: 'Manoj Sethi',
    password: 'testingpassword',
  };
};
