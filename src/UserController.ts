import { JsonController, Get, Post, Patch, Delete, Body, Param, NotFoundError, BadRequestError } from 'routing-controllers';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import fs from 'fs';
import path from 'path';


class UserBody {
  @IsString()
  @IsNotEmpty()
  user!: string;

  @IsEmail() 
  email!: string;
}


interface User {
  id: number;
  user: string;
  email: string;
}

const DB_FILE = path.join(__dirname, '..', 'users.json');


@JsonController()
export class UserController {

 
  private readUsers(): User[] {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([]));
      return [];
    }
    try {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')) || [];
    } catch {
      return [];
    }
  }

  private writeUsers(users: User[]) {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
  }


  @Get('/')
  getAuthor() {
    return { author: 'Oleksandr Dubinskyi' };
  }

  
  @Get('/users')
  getAll() {
    return this.readUsers();
  }

  
  @Post('/users')
  create(@Body() body: UserBody) {
    
    
    const users = this.readUsers();
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    
    const newUser: User = { 
      id: newId, 
      user: body.user, 
      email: body.email 
    };

    users.push(newUser);
    this.writeUsers(users);
    
    return newUser; 
  }

  
  @Patch('/users/:id')
  update(@Param('id') id: number, @Body() body: Partial<UserBody>) {
    const users = this.readUsers();
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
      throw new NotFoundError('User not found');
    }

  
    if (body.user) users[index].user = body.user;
    if (body.email) users[index].email = body.email;

    this.writeUsers(users);
    return users[index];
  }

  
  @Delete('/users/:id')
  delete(@Param('id') id: number) {
    let users = this.readUsers();
    const initialLength = users.length;
    
    users = users.filter(u => u.id !== id);

    if (users.length === initialLength) {
      throw new NotFoundError('User not found');
    }

    this.writeUsers(users);
    return { message: 'User deleted' };
  }
}