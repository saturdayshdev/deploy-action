declare const config: {
    env: any;
    portainer: {
        baseUrl: string;
        username: string;
        password: string;
        endpointId: string;
    };
    stack: {
        name: string;
        composeFile: string;
        pullImage: boolean;
        prune: boolean;
    };
};
export default config;
