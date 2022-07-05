import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Movie from 'App/Models/Movie';
import { schema } from '@ioc:Adonis/Core/Validator'

export default class MoviesController {

    public async index(){

        const movies = await Movie.query()
        .preload('category_id')
        .preload('reviews')
        .preload('actors', (query) => {
            query.pivotColumns(['character'])
          })
        //Movie.all();

/*         movies.forEach((movie) => {
            console.log(movie)
        }) */

        return movies;
    }

    public async store({request, response}: HttpContextContract){
        const newMovieSchema = schema.create({
            name: schema.string({trim: true}),
            duration: schema.number(),
            category_id: schema.number()
        });

        const payload = await request.validate({schema: newMovieSchema});

        const movie = await Movie.create(payload);
        response.status(201)
        return {
            message: 'Creado correctamente',
            data: movie
        }
    }

    public async show({params}: HttpContextContract){
        return Movie.findOrFail(params.id);
    }

    public async update({params, request}: HttpContextContract){
        const body = request.body();
        const movie = await Movie.findOrFail(params.id);
        movie.name = body.name;
        return movie.save();
    }

    public async destroy({params, response}: HttpContextContract){
        response.status(204)
        const movie = await Movie.findOrFail(params.id);
        await movie.delete();
        return movie;
    }

}