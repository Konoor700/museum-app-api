import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './UserController';
import { AppDataSource } from './data-source';

const PORT = 3000;

const app = createExpressServer({
  cors: true,
  controllers: [UserController],
});


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized! ");
        
        
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT} `);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });