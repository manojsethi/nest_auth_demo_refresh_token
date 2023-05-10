import { CreateUserDto } from '../../_dtos/create_user.dto';

export const CreateUserDtoStub = (): CreateUserDto => {
  return {
    email: 'manoj.sethi@manojsethi.com',
    name: 'Manoj Sethi',
    password: 'testingpassword',
  };
};
