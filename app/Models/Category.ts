import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Movie from './Movie';

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //RELACIÓN 1:1
  @belongsTo(() => Movie,{
    foreignKey: "category_id",
    localKey: "id",
  })
  public movie: BelongsTo<typeof Movie>
}
