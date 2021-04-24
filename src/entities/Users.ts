import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
@Entity("Users")
class User {
   
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  // O construtor sempre vai ser chamado qaundo der um new user
  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { User };