import { JsonController, Get, Post, Patch, Delete, Body, Param, NotFoundError } from 'routing-controllers';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { AppDataSource } from './data-source';
import { User } from './entity/User';


class UserBody {
  @IsString()
  @IsNotEmpty()
  user!: string;

  @IsEmail()
  email!: string;
}

@JsonController()
export class UserController {
  
  
  private userRepository = AppDataSource.getRepository(User);

  @Get('/')
  getAuthor() {
    return { author: 'Oleksandr Dubinskyi' };
  }

  
  @Get('/users')
  async getAll() {
    return await this.userRepository.find();
  }

  
  @Post('/users')
  async create(@Body() body: UserBody) {
    
    const newUser = this.userRepository.create({
        user: body.user,
        email: body.email
    });
    
    
    return await this.userRepository.save(newUser);
  }

  
  @Patch('/users/:id')
  async update(@Param('id') id: number, @Body() body: Partial<UserBody>) {
    
    const userToUpdate = await this.userRepository.findOneBy({ id });

    if (!userToUpdate) {
      throw new NotFoundError('User not found');
    }

    
    if (body.user) userToUpdate.user = body.user;
    if (body.email) userToUpdate.email = body.email;

    
    return await this.userRepository.save(userToUpdate);
  }

 
  @Delete('/users/:id')
  async delete(@Param('id') id: number) {
    const userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      throw new NotFoundError('User not found');
    }

   
    await this.userRepository.remove(userToRemove);
    return { message: 'User deleted' };
  }
}