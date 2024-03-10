declare const config: {
    env: {
        name: string;
        value: string;
    }[];
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
