import * as core from '@actions/core'
import config from './config'
import { Portainer } from './portainer'

const run = async () => {
  try {
    core.startGroup('Get Config')
    core.info(JSON.stringify(config, null, 2))
    core.endGroup()

    core.startGroup('Initialize Portainer')
    const { baseUrl, username, password } = config.portainer
    const portainer = new Portainer(baseUrl, username, password)
    core.endGroup()

    core.startGroup('Check Stack')
    const endpointId = Number(config.portainer.endpointId)
    const stacks = await portainer.getAllStacks(endpointId)
    const stack = stacks.find((s) => s.Name === config.stack.name)
    core.info(JSON.stringify(stack, null, 2))
    core.endGroup()

    core.startGroup('Deploy Stack')
    if (stack) {
      core.info('Updating stack')
      core.info(JSON.stringify(stack, null, 2))
      await portainer.updateStack(stack.Id, endpointId, {
        stackFileContent: config.stack.composeFile,
        pullImage: config.stack.pullImage,
        prune: config.stack.prune,
        env: config.env,
      })
      core.info('Stack updated')
    } else {
      core.info('Creating stack')
      core.info(JSON.stringify(config.stack, null, 2))
      await portainer.createStack(endpointId, {
        name: config.stack.name,
        stackFileContent: config.stack.composeFile,
        env: config.env,
      })
      core.info('Stack created')
    }
    core.endGroup()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
