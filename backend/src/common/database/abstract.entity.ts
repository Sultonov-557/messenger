import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', select: false })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', select: false })
  updated_at: Date;

  @BeforeInsert()
  private _() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  private __() {
    this.updated_at = new Date();
  }
}
