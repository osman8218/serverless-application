import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
//error:get todo? import { getTodo } from '../../businessLogic/todos'
//Change line below: import { getAllTodos } from '../../businessLogic/todos'
//import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
import { getTodos as getTodos } from '../../businessLogic/todos'
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger';

const logger = createLogger('getTodo');

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
   logger.info(`Processing event: ${event}`)
   //const todos = event.pathParameters.todoId
   const userId = getUserId(event)
   const items = await getTodos(userId)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        items
      })    
    }
  })

handler.use(
  cors({
    credentials: true
  })
)