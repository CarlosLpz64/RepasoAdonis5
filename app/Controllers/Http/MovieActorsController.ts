import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Movie from 'App/Models/Movie';
import MoviesActor from 'App/Models/MoviesActor';
import { schema } from '@ioc:Adonis/Core/Validator'


export default class MovieActorsController {
    public async index({  }: HttpContextContract)
    {
        const movies = await Movie
        .query()
        .preload('actors', (query) => {
            query.pivotColumns(['character'])
        })

        movies.forEach((movie) => {
            movie.actors.forEach((actor) => {
                console.log(actor.$extras.pivot_character)
                //console.log(actor)
            })
        })
        return movies;
    }

    public async store({ response, request }: HttpContextContract)
    {
        const newMovieActorSchema = schema.create({
            actor_id: schema.number(),
            movie_id: schema.number(),
            character: schema.string({trim: true})
        });

        const payload = await request.validate({schema: newMovieActorSchema});

        const movieActor = await MoviesActor.create(payload);
        response.status(201)
        return {
            message: 'Creado correctamente',
            data: movieActor
        }
        /* await MoviesActor.create(request.all())

        response.ok(
            {
                message: "Se inserto Correctamente",
            }
        ) */
    }

    
}
