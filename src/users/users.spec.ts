import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserSchema } from '../_schemas/user.schema';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../_tests/utils/mongo/mongo_in_memory';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();
    usersController = app.get<UsersController>(UsersController);
  });
  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
  afterAll(async () => {
    await closeInMongodConnection();
  });
});
