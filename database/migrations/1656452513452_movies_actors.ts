import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'movies_actors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('actor_id').unsigned().references('actors.id');
      table.integer('movie_id').unsigned().references('movies.id');
      table.unique(['actor_id', 'movie_id']);
      table.string('character', 254).notNullable();
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
