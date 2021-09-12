import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
//import { TodoItem } from '../../models/TodoItem'
//import { TodoUpdate } from '../../models/TodoUpdate'
//import { DocumentClient } from 'aws-sdk/clients/dynamodb'
//import { createLogger } from '../../utils/logger'

//const logger = createLogger('TodoAccess')

//70893.kowledge center
const XAWS = AWSXRay.captureAWS(AWS)


// TODO: Implement the fileStogare logic4+
export class AttachmentUtils {

  constructor(
      private readonly s3 = new XAWS.S3({ signatureVersion: 'v4' }),
      private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
      private readonly urlExpiration = Number(process.env.SIGNED_URL_EXPIRATION)
      ) {
  }

  async getUploadUrl(attachmentId: string): Promise<string> {

      return this.s3.getSignedUrl('putObject', {
          Bucket: this.bucketName,
          Key: attachmentId,
          Expires: this.urlExpiration
      })
  }


  async getAttachmentUrl(attachmentId: string): Promise<string> {
      return `https://${this.bucketName}.s3.amazonaws.com/${attachmentId}`
  }   
  
}
// const bucketName = process.env.ATTACHMENT_S3_BUCKET

// const urlExpiration = process.env.SIGNED_URL_EXPIRATION
// const s3 = new XAWS.S3({ signatureVersion: 'v4' })
 

// export async function getUploadUrl(userId: string, todoId: string): Promise<string> {

//   logger.info(`attachmentUtils data: create pre-signed uploadurl for ${userId} and ${todoId}` )

//   logger.info(`attachmentUtils data: create pre-signed uploadurl Values: Bucket=${bucketName}, ${urlExpiration}` )

 

//   return s3.getSignedUrl('putObject', {

//       Bucket: bucketName,

//       Key: todoId,

//       Expires: this.urlExpiration,

//      // Expires: parseInt(urlExpiration)

  //})   

//}