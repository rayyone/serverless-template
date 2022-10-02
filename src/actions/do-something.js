import {reportError} from '../helpers/errors';

export const doSomething = async (arg1, arg2) => {
  try {
    return Number(arg1) + Number(arg2)
  } catch (e) {
    await reportError(JSON.stringify(e.message), e)
    return -1
  }
}
