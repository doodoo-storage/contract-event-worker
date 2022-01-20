import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class NftTokenContract {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 10, comment: 'chain' })
  public chain: string;

  @Column({ type: 'varchar', comment: 'token type', length: 20 })
  public type: string;
  
  @Column({ type: 'varchar', comment: '주소', length: 70 })
  public address: string;

  @Column({ type: 'varchar', length: 70, comment: 'transaction hash', unique: true })
  public transactionHash: string;

  @Column({ type: 'varchar', comment: '이름', length: 128, nullable: true })
  public name: string;

  @Column({ type: 'varchar', comment: '심볼', length: 64, nullable: true })
  public symbol: string;

  @Column({ type: 'bigint', comment: '마지막 이벤트 조회 block number', default: 0 })
  public lastFetchedBlockNumber: number;

  @CreateDateColumn({ type: 'timestamp', comment: '생성 날짜' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정 날짜' })
  public updatedAt: Date;
}