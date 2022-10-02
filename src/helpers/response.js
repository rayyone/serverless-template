import {logError} from './print-log';
import {reportError} from './errors';

function makeResponse (body, headers = {}, statusCode = 200, binary = false) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      ...headers
    },
    body: body,
    ...(binary ? { isBase64Encoded: true } : {})
  }
}

function jsonSuccessResponse (data, message = null, statusCode = 200) {
  return makeResponse(
    JSON.stringify({
      status: 'success',
      message,
      data
    }),
    { 'Content-Type': 'application/json' },
    statusCode
  )
}

function jsonErrorResponse (errorMessage = null, errors = [], statusCode = 422) {
  return makeResponse(
    JSON.stringify({
      status: 'error',
      message: errorMessage,
      errors: [errorMessage, ...errors]
    }),
    { 'Content-Type': 'application/json' },
    statusCode
  )
}

export const buildResponse = (data, message = null, statusCode = 200) => {
  return jsonSuccessResponse(data, message, statusCode)
}

export const buildErrorResponse = (errorMessage, errors) => {
  logError(errorMessage)
  return jsonErrorResponse(errorMessage, errors)
}

export const buildErrorStackResponse = async (error) => {
  const errors = [{
    errorType: error.constructor.name,
    stackTrace: error.stack.split('\n')
  }]
  await reportError(JSON.stringify(error.message), error)
  return jsonErrorResponse(error.message, errors)
}

export const buildUnauthorizedResponse = () => {
  return jsonErrorResponse('Unauthorized.', [], 401)
}
