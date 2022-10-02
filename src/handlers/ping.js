import { SERVICE_NAME } from '../constants'
import { initSentry } from '../helpers/sentry'
import {reportError} from '../helpers/errors';
import {logInfo, logMagenta} from '../helpers/print-log';
import {doSomething} from '../actions/do-something';

export const ping = async (evt) => {
  initSentry(SERVICE_NAME, ping.name)
  logInfo('Start with env: ' + process.env.STAGE)

  try {
    logMagenta('hello world!')
    logInfo(process.env.SENTRY_DSN)
    await doSomething(1, 2)
  } catch (error) {
    await reportError(JSON.stringify(error.message), error)
    throw error
  }
}
