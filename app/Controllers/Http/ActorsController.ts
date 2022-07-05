import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Actor from 'App/Models/Actor';
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ActorsController {
    public async index(){
        return Actor.all();
    }

    public async store({request, response}: HttpContextContract){
        const newActorSchema = schema.create({
            name: schema.string({trim: true})
        });

        const payload = await request.validate({schema: newActorSchema});

        const actor = await Actor.create(payload);
        response.status(201)
        return {
            message: 'Creado correctamente',
            data: actor
        }
    }
}
