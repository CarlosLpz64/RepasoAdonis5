import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Movie from './Movie';

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public comment: string;

  @column()
  public movie_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
  //RELACIÓN M:1
  @belongsTo(() => Movie,{
    foreignKey: "id",
    localKey: "movie_id",
  })
  public movie: BelongsTo<typeof Movie>
}
