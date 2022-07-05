import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserSeeder from './UserSeeder'

export default class extends BaseSeeder {
  public async run () {
    await UserSeeder.runSeed()
  }
}
