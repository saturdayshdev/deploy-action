import axios from 'axios'
import type { Axios } from 'axios'

interface ICreateStackConfig {
  env?: {
    [key: string]: string
  }
  fromAppTemplate?: boolean
  name: string
  stackFileContent: string
  webhook?: string
}

interface IUpdateStackConfig {
  env?: {
    [key: string]: string
  }
  prune: boolean
  pullImage: boolean
  stackFileContent: string
  webhook?: string
}

export class Portainer {
  private readonly baseUrl: string
  private readonly username: string
  private readonly password: string
  private readonly axios: Axios
  private token: string

  constructor(baseUrl: string, username: string, password: string) {
    this.baseUrl = baseUrl
    this.username = username
    this.password = password
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    this.token = null
  }

  private async authenticate() {
    if (this.token) return

    const { data } = await this.axios.post('/auth', {
      username: this.username,
      password: this.password,
    })

    this.token = data.jwt
  }

  public async createStack(endpointId: number, stack: ICreateStackConfig) {
    await this.authenticate()

    const { data } = await this.axios.post(
      '/stacks/create/standalone/string',
      {
        ...stack,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          endpointId,
        },
      },
    )

    return data
  }

  public async getAllStacks(endpointId?: number) {
    await this.authenticate()

    const { data } = await this.axios.get('/stacks', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        endpointId,
      },
    })

    return data
  }

  public async updateStack(
    id: number,
    endpointId: number,
    stack: IUpdateStackConfig,
  ) {
    await this.authenticate()

    const { data } = await this.axios.put(
      `/stacks/${id}`,
      {
        ...stack,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          endpointId,
        },
      },
    )

    return data
  }
}
