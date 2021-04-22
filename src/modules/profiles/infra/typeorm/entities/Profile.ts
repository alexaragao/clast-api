import Login from '../../../../logins/infra/typeorm/entities/Login';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity('Profile')
class Profile{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  CPF: string;

  @Column()
  Birthday: Date;

  @Column()
  Picture: string;

  @Column()
  Facebook: string;

  @Column()
  LinkedIn: string;

  @Column()
  Instagram: string;

  @Column()
  Twitter: string;

  @Column()
  LoginID: string;

  @OneToOne(() => Login)
  @JoinColumn({ name: 'LoginID' })
  Login: Login;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'picture_url' })
  getPictureUrl(): string | null {
    return this.Picture ? `${process.env.APP_API_URL}/files/${this.Picture}` : null;
  }
}

export default Profile;
