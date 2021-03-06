import AWS from 'aws-sdk';

process.env.AWS_PROFILE = 'frontend';

AWS.config.update({ region: 'eu-west-1' });

const STACK = 'frontend';

const ssm = new AWS.SSM();

interface AWSParameter {
    Name: string;
    Value: string;
}

interface ConfigMap {
    [key: string]: string;
}

interface GuardianConfiguration {
    getParameter: (key: string) => string;
    getAllParameters: () => any;
    size: () => number;
}

// gets params from AWS parameter store. This is a PAGED api, the token
// indicates the next set of results to get (or undefined for the first call)

const getParams = function getAWSParameterStoreParameters(
    stage: string,
    token: string | undefined = undefined,
): Promise<any> {
    const params = {
        Path: `/${STACK}/${stage}/`,
        Recursive: true,
        WithDecryption: true,
        NextToken: token,
    };

    return ssm.getParametersByPath(params).promise();
};

// a recursive function to retrieve all pages of guardian configuration

const getAllParams = function getGuardianConfigurationRecursiveStep(
    stage: string,
    params = [],
    token: string | undefined = undefined,
): Promise<AWSParameter[]> {
    return getParams(stage, token).then(response => {
        if (!response.NextToken) {
            return params;
        }
        return getAllParams(
            stage,
            params.concat(response.Parameters),
            response.NextToken === '' ? undefined : response.NextToken,
        );
    });
};

// returns a configuration object

const getGuardianConfiguration = (
    stage: string,
): Promise<GuardianConfiguration> => {
    return getAllParams(stage).then(params => {
        const configuration: ConfigMap = params.reduce((map: ConfigMap, p) => {
            const newMap = map;
            newMap[p.Name] = p.Value;
            return map;
        }, {});

        return {
            getParameter: (key: string) =>
                configuration[`/${STACK}/${stage}/${key}`],
            getAllParameters: () => configuration,
            size: () => params.length,
        };
    });
};

export { getGuardianConfiguration, GuardianConfiguration };
