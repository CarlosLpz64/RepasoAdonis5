import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category';
import Review from './Review';
import Actor from './Actor';

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public duration: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //RELACIÓN 1:1
  @hasOne(() => Category,{
    foreignKey: "id",
    localKey: "id",
  })
  public category_id: HasOne<typeof Category>

  //RELACIÓN 1:M
  @hasMany(() => Review,{
    foreignKey: "movie_id",
    localKey: "id",
  })
  public reviews: HasMany<typeof Review>

  //RELACIÓN M:N
  @manyToMany(() => Actor, {
    localKey: 'id',
    pivotForeignKey: 'movie_id',//movie_id
    relatedKey: 'id',
    pivotRelatedForeignKey: 'actor_id',//actor_id
    pivotTable: 'movies_actors',
    pivotColumns: ['character']
  })
  public actors: ManyToMany<typeof Actor>
}
