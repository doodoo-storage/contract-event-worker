import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NftItemProperties } from './nft-item-properties';

@Entity()
export class NftItem {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', comment: 'chain' })
  public chain: string;

  @Column({ type: 'varchar', comment: 'image uri' })
  public imageUrl: string;

  @Column({ type: 'varchar', comment: 'image uri' })
  public metadataUrl: string;

  @Column({ type: 'varchar', comment: 'token명', length: 200 })
  public name: string;

  @Column({ type: 'varchar', comment: '설명', nullable: true })
  public description: string;

  @Column({ type: 'int', comment: 'edition 갯수' })
  public edition: number;

  @Column({ type: 'int', comment: 'collection id', nullable: true })
  public collectionId: number;

  @Column({ type: 'boolean', comment: '민감성 콘텐츠 여부' })
  public sensitive: boolean;

  @Column({ type: 'boolean', comment: '리스트 여부', default: false })
  public list: boolean;

  @Column({ type: 'varchar', comment: 'item의 상태', length: 50, default: 'CREATED' })
  public status: string;

  @CreateDateColumn({ type: 'timestamp', comment: '등록일' })
  public regDate: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일' })
  public updateDate: Date;

  @OneToMany((type) => NftItemProperties, properties => properties.item)
  public properties: NftItemProperties[];
}