import minimist from 'minimist'
import {logError} from './helpers/print-log';
import {ping} from './handlers/ping';
import {setEnvFromConfig} from './helpers/functions/setEnvFromConfig';

setEnvFromConfig()

const args = minimist(process.argv.slice(2), {
  string: ['function'],
  alias: { f: 'function' }
})

if (!args.f) {
  logError('func name is required')
  process.exit(9)
}

const funcList = { ping }
const func = funcList[args.f]
if (!func) {
  logError('func name not existed')
  process.exit(9)
}

func()
