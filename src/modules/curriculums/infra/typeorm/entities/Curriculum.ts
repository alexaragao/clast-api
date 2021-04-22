import Login from '../../../../logins/infra/typeorm/entities/Login';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity('Curriculum')
class Curriculum{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  Country: string;

  @Column()
  State: string;

  @Column()
  City: string;

  @Column()
  LoginID: string;

  @OneToOne(() => Login)
  @JoinColumn({ name: 'LoginID' })
  Login: Login;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Curriculum;
