import * as core from '@actions/core'
import * as fs from 'fs'
import parseEnv from 'parse-env-string'

const input = (input: string, required: boolean = false) => {
  return core.getInput(input, { required })
}

const getPortainerConfig = () => {
  return {
    baseUrl: input('portainer-url', true),
    username: input('portainer-username', true),
    password: input('portainer-password', true),
    endpointId: input('portainer-endpoint-id', true),
  }
}

const getEnv = () => {
  const raw = input('env-file', true)
  return parseEnv(raw)
}

const getStackConfig = () => {
  const path = input('stack-compose-path', true)
  const file = fs.readFileSync(path, 'utf8')

  return {
    name: input('stack-name', true),
    composeFile: file,
    pullImage: input('stack-pull-image') === 'true',
    prune: input('stack-prune') === 'true',
  }
}

const config = {
  env: getEnv(),
  portainer: getPortainerConfig(),
  stack: getStackConfig(),
}

export default config
