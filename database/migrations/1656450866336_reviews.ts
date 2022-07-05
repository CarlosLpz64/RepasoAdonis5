import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('comment', 254).notNullable();
      table
        .integer('movie_id')
        .unsigned()
        .references('id')
        .inTable('movies')
        .onDelete('CASCADE');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
