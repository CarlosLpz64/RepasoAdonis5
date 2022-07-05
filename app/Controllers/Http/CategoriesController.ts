import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class CategoriesController {
  public async index({}: HttpContextContract) {
    const categories = Category.all()
    return categories
  }

  public async store({ request, response }: HttpContextContract) {
    const newCategorySchema = schema.create({
      name: schema.string({ trim: true }),
    })

    const payload = await request.validate({ schema: newCategorySchema })

    const category = await Category.create(payload)
    response.status(201)
    return {
      message: 'Creado correctamente',
      data: category,
    }
  }

  public async show({ params }: HttpContextContract) {
    return Category.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const category = await Category.findOrFail(params.id)
    category.name = body.name
    return category.save()
  }

  public async destroy({ params, response }: HttpContextContract) {
    response.status(204)
    const category = await Category.findOrFail(params.id)
    await category.delete()
    return category
  }
}
