import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../dataLayer/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
//import * as createError from 'http-errors'

const todosAccess = new TodosAccess()
const attachmentUtils = new AttachmentUtils()
const logger = createLogger('todos')


// TODO: Implement businessLogic :fixing gettdo,getalltodos,gettodos
// export async function getAllTodos(userId: string): Promise<TodoItem[]>{
//   return todoAccess.getAllTodos(userId)
// }

// export async function getTodo(userId: string, todoId: string): Promise<TodoItem[]>{
//   return todoAccess.getTodo(userId, todoId)
// }

// export async function getTodos(user: string): Promise<TodoItem[]> {
//   loggger.info('GetTodos ', user)
//   return await todoAccess.getAllTodo(user)


// TODOACCESS from lesson 6

export const getTodos = async (userId: string): Promise<TodoItem[]> => {
    
    logger.info(`Getting todos for ${userId}`)

    return await todosAccess.getTodos(userId);
}

export async function createTodo(
    createTodoRequest: CreateTodoRequest,
    userId: string
  ): Promise<TodoItem> {
  
    logger.info(`Creating todo for ${userId}`)
    const todoId = uuid.v4()
  
    return await todosAccess.createTodo({
      todoId: todoId,
      userId: userId,
      done: false,
      attachmentUrl: "",
      createdAt: new Date().toISOString(),
      name: createTodoRequest.name,
      dueDate: createTodoRequest.dueDate
    })
  }

export const getTodo = async (todoId: string, userId: string): Promise<TodoItem> => {

    logger.info(`Getting todo ${todoId}`)

    return await todosAccess.getTodo(todoId, userId);
    }

    // thanks to feedback from https://knowledge.udacity.com/questions/659234
export async function updateTodo(userId: string, todoId: string, updateTodoRequest: UpdateTodoRequest) {
    
    logger.info(`Update todo ${todoId} for user ${userId}`)
    // this function was here without the userId, then I realized I needed to use userId so I had to get it there. So the check is not not necessary
    const item = await todosAccess.getTodo(todoId, userId)
    
    if (item.userId !== userId) {
        logger.error(`Update denied, not your todo`)
        throw new Error('Update denied, not your todo')  
      }    
       
    return await todosAccess.updateTodo(todoId, updateTodoRequest, userId);
    }

export async function updateUrl(userId: string, todoId: string, attachmentURL: string) {

    logger.info(`Updating URL of ${todoId} with ${attachmentURL} for user ${userId}`)

    const item = await todosAccess.getTodo(todoId, userId)
    
    if (item.userId !== userId) {
        logger.error(`Update URL denied, not your todo`)
        throw new Error('Update URL denied, not your todo')  
        }    
        
    return await todosAccess.updateUrl(todoId, attachmentURL, userId);
    }

export async function deleteTodo(userId: string, todoId: string) {

    logger.info(`Deleting ${todoId} from ${userId}`)

    const item = await todosAccess.getTodo(todoId, userId)
    
    if (item.userId !== userId) {
        logger.error(`Deletion denied, not your todo`)
        throw new Error('Deletion denied, not your todo')  
        }    
        
    return await todosAccess.deleteTodo(todoId, userId);
    }

export const getUploadUrl = (attachmentId: string) => attachmentUtils.getUploadUrl(attachmentId);

export const getAttachmentUrl = (attachmentId: string) => attachmentUtils.getAttachmentUrl(attachmentId)


// Got attachment util from BRian Pryor knowledge center