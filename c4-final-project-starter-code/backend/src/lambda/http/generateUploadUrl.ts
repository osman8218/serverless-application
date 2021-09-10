import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

//import { createAttachmentPresignedUrl } from '../../businessLogic/todos'
//couldn't figure out how to use the createattachmenturl kept failing.
//From knowledge center got  from Gonazalo a way to split it up.
import { getUploadUrl, updateUrl } from '../../businessLogic/todos'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
//import { url } from 'inspector'
//import { getMaxListeners } from 'process'

const logger = createLogger('generateUploadUrl');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    // logger.info(`Created upload URL ${Url}`)

    // const userId = getUserId(event)
    // const attachmentId = Url.split("?")[0]

    // //const Url = await getUploadUrl(todoId)
    // const Url = await createAttachmentPresignedUrl(todoId, userId)
    
    // //await updateUrl(userId, todoId, attachmentId)
    
    const userId = getUserId(event)         //https://knowledge.udacity.com/questions/659234
    const Url = await getUploadUrl(todoId)
    const attachmentId = Url.split("?")[0]

    logger.info(`Created upload URL ${Url}`)

    await updateUrl(userId, todoId, attachmentId)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        item: Url
      })
    }
  })

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
