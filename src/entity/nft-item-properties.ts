import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NftItem } from '.';

@Entity()
export class NftItemProperties {
  
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'int', comment: 'item id' })
  public itemId: number;

  @Column({ type: 'varchar', comment: 'trait type', length: 50 })
  public traitType: string;

  @Column({ type: 'varchar', comment: 'trait type', length: 50 })
  public value: string;

  @ManyToOne((type) => NftItem, item => item.properties, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'itemId', referencedColumnName: 'id' })
  public item: NftItem;
}