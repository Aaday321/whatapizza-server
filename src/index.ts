import 'dotenv/config';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { Settings } from './config/settings.js'
import DoordashController from './controllers/DoordashController.js'
const app = new Hono()
const doordashController = new DoordashController()

app.get('/', (context) => {
  console.log(
    "We got a request!"
  );
  
  context.status(202)
  return context.text('What up, world!')
})

app.get('/pizza', doordashController.placePizzaOrder.bind(doordashController))

serve({
  fetch: app.fetch,
  port: Settings.PORT || 3000,
}, (info) => {
  console.log(`${Settings.SERVICE_NAME} is running on http://localhost:${info.port}`)
})
