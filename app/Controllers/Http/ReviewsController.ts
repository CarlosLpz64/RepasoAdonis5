import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Review from 'App/Models/Review';
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ReviewsController {
    public async index(){
        return Review.all();
    }

    public async store({request, response}: HttpContextContract){
        const newReviewSchema = schema.create({
            comment: schema.string({trim: true}),
            movie_id: schema.number()
        });

        const payload = await request.validate({schema: newReviewSchema});

        const review = await Review.create(payload);
        response.status(201)
        return {
            message: 'Creado correctamente',
            data: review
        }
    }
}
