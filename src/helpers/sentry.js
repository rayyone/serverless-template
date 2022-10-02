import * as Sentry from '@sentry/node'

export function initSentry(serviceName, funcName) {
  if (!['stage', 'prod'].includes(process.env.STAGE)) {
    return;
  }
  Sentry.init({ dsn: process.env.SENTRY_DSN })
  Sentry.configureScope(scope => {
    scope.setTag('service', serviceName)
    scope.setTag('function', funcName)
  })
}
