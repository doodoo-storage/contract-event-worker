import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class NftContract {
  
  @PrimaryColumn({ type: 'varchar', comment: '주소', length: 70 })
  public address: string;

  @Column({ type: 'varchar', comment: 'contract type', length: 20 })
  public type: string;

  @Column({ type: 'varchar', comment: '이름', length: 128, nullable: true })
  public name: string;

  @Column({ type: 'varchar', comment: '심볼', length: 64, nullable: true })
  public symbol: string;

  @Column({ type: 'bigint', comment: '마지막 이벤트 조회 block number', default: 0 })
  public lastBn: number;

  @CreateDateColumn({ type: 'timestamp', comment: '생성 날짜' })
  createdAt: Date;
}