import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NftEventUpdateHistory {
  
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', comment: '주소', length: 70 })
  public address: string;

  @Column({ type: 'bigint', comment: '이벤트 조회 시작 block number' })
  public toBlockBn: number;

  @Column({ type: 'bigint', comment: '이벤트 조회 종료 block number' })
  public fromBlockBn: number;

  @Column({ type: 'int', comment: '이벤트 갯수' })
  public count: number;

  @Column({ type: 'boolean', comment: '이벤트 조회 성공 여부' })
  public success: boolean;

  @CreateDateColumn({ type: 'timestamp', comment: '생성 날짜' })
  createdAt: Date;
}