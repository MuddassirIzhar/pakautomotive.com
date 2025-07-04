import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, type Relation, ManyToOne, JoinColumn } from "typeorm";
import { Model } from "./model.entity";



@Entity ("model_cons")
export class ModelCons extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
        
    @ManyToOne(() => Model)
    @JoinColumn({name: 'model_id'})
    model!: Relation<Model>;

    @Column({ nullable: true })
    value!: string;
}
