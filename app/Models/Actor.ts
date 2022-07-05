import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Movie from './Movie';

export default class Actor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Movie, {
    localKey: 'id',
    pivotForeignKey: 'actor_id', //actor_id
    relatedKey: 'id',
    pivotRelatedForeignKey: 'movie_id', //movie_id
    pivotTable: 'movies_actors',
    pivotColumns: ['character']
  })
  public actors: ManyToMany<typeof Movie>
}
