import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class NftTokenFactoryContract {
  
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 10, comment: 'chain' })
  public chain: 'KLAYTN' | 'ETHEREUM';

  @Column({ type: 'varchar', length: 70, comment: 'contract address' })
  public address: string;

  @Column({ type: 'int', comment: '지난 작업 시 조회한 block number' })
  public lastFetchedBlockNumber: number;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일' })
  public updatedAt: Date;
}