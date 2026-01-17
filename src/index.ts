import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (context) => {
  console.log(
    "We got a request!"
  );
  
  context.status(202)
  return context.text('What up, world!')
})

serve({
  fetch: app.fetch,
  port: 3126
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
