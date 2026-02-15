import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity() 
export class User {
    
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column() 
    user!: string;

    @Column()
    email!: string;
}