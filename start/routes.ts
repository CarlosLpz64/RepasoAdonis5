/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(()=>{
Route.resource('/movies', 'MoviesController').apiOnly();
Route.resource('/categories', 'CategoriesController').apiOnly();
Route.resource('/reviews', 'ReviewsController').apiOnly();
Route.resource('/actors', 'ActorsController').apiOnly();
Route.resource('/movieactors', 'MovieActorsController').apiOnly();
}).middleware(['auth'])

Route.post('/register', 'Auth/AuthController.register')
Route.post('/login', 'Auth/AuthController.login')

Route.group(()=>{
  Route.get('/user', 'AuthController.userData')
  Route.post('/logout', 'AuthController.logout')
  Route.get('/index', 'AuthController.index')
}).namespace('App/Controllers/Http/Auth').prefix('auth/v1').middleware(['auth'])
