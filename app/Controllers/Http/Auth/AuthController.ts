import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
    
    public async register({ request, response, auth }: HttpContextContract){
        const newUserSchema = schema.create({
            email: schema.string({trim: true}),
            password: schema.string({trim: true}),
        });
        const payload = await request.validate({schema: newUserSchema});
        const d = await User.create(payload)
        const token = await auth.use('api').attempt(d.email, payload.password)
        response.created({message: "Se creo el usuario correctamente", token: token, dataUser: auth.user})
    }

    public async login({ request, response, auth }: HttpContextContract){
        try{
            const email = request.input('email')
            const password = request.input('password')

            const token = await auth.use('api').attempt(email, password,{
                expiresIn: '30mins'
            })
            response.ok({message: "Se inicio correctamente", token: token, dataUser: auth.user})

        }
        catch(error){
            response.badRequest('Invalid credentials')
        }
    }

    public async logout({ auth, response }: HttpContextContract){
        try{

            await auth.use('api').revoke()
            return {
                revoked: true
            }
        }
        catch(error){
            response.internalServerError({message: "Ocurrio un error"})
        }
    }

    public async userData({ auth, response }: HttpContextContract){
        try{
            response.ok({message: "consulta correcta", data: auth.user})
        }
        catch(error){
            response.badRequest({message: "ocurrio un error"})
        }
    }

    public async index({  }: HttpContextContract){
        return User.all();
    }
}
