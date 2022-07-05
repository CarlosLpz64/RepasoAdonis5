import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MoviesActor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public actor_id: number

  @column()
  public movie_id: number

  @column()
  public character: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
