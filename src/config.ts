import * as core from '@actions/core'
import * as fs from 'fs'
import { parseEnvString as parseEnv } from 'parse-env-string'

const input = (input: string, required: boolean = false) => {
  return core.getInput(input, { required })
}

const getPortainerConfig = () => {
  return {
    baseUrl: input('url', true),
    username: input('username', true),
    password: input('password', true),
    endpointId: input('endpointId', true),
  }
}

const getEnv = () => {
  const raw = input('env', true)
  return parseEnv(raw)
}

const getStackConfig = () => {
  const path = input('path', true)
  const file = fs.readFileSync(path, 'utf8')

  return {
    name: input('name', true),
    composeFile: file,
    pullImage: input('pull') === 'true',
    prune: input('prune') === 'true',
  }
}

export const Config = {
  portainer: getPortainerConfig(),
  env: getEnv(),
  stack: getStackConfig(),
}
