// import express, { Request, Response } from 'express';
// import fs from 'fs';
// import path from 'path';
// import cors from 'cors';
// import bodyParser from 'body-parser';

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(bodyParser.json());


// const DB_FILE = path.join(__dirname, '..', 'users.json');


// interface User {
//   id: number;
//   user: string; 
//   email: string;
// }



// const readUsers = (): User[] => {
//   if (!fs.existsSync(DB_FILE)) {
    
//     fs.writeFileSync(DB_FILE, JSON.stringify([]));
//     return [];
//   }
//   const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
//   try {
//     return JSON.parse(fileContent) || [];
//   } catch (e) {
//     return [];
//   }
// };

// const writeUsers = (users: User[]) => {
//   fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
// };




// app.get('/', (req: Request, res: Response) => {
  
//   res.json({ author: 'Oleksandr Dubinskyi' });
// });


// app.get('/users', (req: Request, res: Response) => {
//   const users = readUsers();
//   res.json(users);
// });


// app.post('/users', (req: Request, res: Response) => {
//   const { user, email } = req.body;

//   if (!user || !email) {
//     res.status(400).json({ message: 'Fields "user" and "email" are required' });
//     return;
//   }

//   const users = readUsers();
  
  
//   const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  
//   const newUser: User = { id: newId, user, email };
  
//   users.push(newUser);
//   writeUsers(users);

//   res.status(201).json(newUser);
// });


// app.patch('/users/:id', (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   const { user, email } = req.body;

//   let users = readUsers();
//   const index = users.findIndex((u) => u.id === id);

//   if (index === -1) {
//     res.status(404).json({ message: 'User not found' });
//     return;
//   }

  
//   if (user) users[index].user = user;
//   if (email) users[index].email = email;

//   writeUsers(users);

//   res.json(users[index]);
// });


// app.delete('/users/:id', (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   let users = readUsers();

//   const initialLength = users.length;
  
//   users = users.filter((u) => u.id !== id);

//   if (users.length === initialLength) {
//     res.status(404).json({ message: 'User not found' });
//     return;
//   }

//   writeUsers(users);
//   res.json({ message: `User with id ${id} deleted` });
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './UserController';

const PORT = 3000;

const app = createExpressServer({
  cors: true,        
  controllers: [UserController], 
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});