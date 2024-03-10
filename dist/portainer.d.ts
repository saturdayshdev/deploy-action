interface ICreateStackConfig {
    env?: {
        [key: string]: string;
    };
    fromAppTemplate?: boolean;
    name: string;
    stackFileContent: string;
    webhook?: string;
}
interface IUpdateStackConfig {
    env?: {
        [key: string]: string;
    };
    prune: boolean;
    pullImage: boolean;
    stackFileContent: string;
    webhook?: string;
}
export declare class Portainer {
    private readonly baseUrl;
    private readonly username;
    private readonly password;
    private readonly axios;
    private token;
    constructor(baseUrl: string, username: string, password: string);
    private authenticate;
    createStack(endpointId: number, stack: ICreateStackConfig): Promise<any>;
    getAllStacks(endpointId?: number): Promise<any>;
    updateStack(id: number, endpointId: number, stack: IUpdateStackConfig): Promise<any>;
}
export {};
