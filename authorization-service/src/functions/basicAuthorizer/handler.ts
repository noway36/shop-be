import "source-map-support/register";
import { APIGatewayTokenAuthorizerHandler } from "aws-lambda";

enum EventType {
    Token = "TOKEN",
}

enum Effect {
    Allow = "Allow",
    Deny = "Deny",
}

export const basicAuthorizer: APIGatewayTokenAuthorizerHandler = async (
    event,
    _,
    callback
) => {
    console.log(`Event: ${JSON.stringify(event)}`);

    if (event.type !== EventType.Token) {
        callback("Unauthorized");
        return null;
    }

    try {
        const { authorizationToken, methodArn } = event;

        // STRING: Basic Base64(Buffer(name:pass))
        const encodedCreds = authorizationToken.split(" ")[1];
        const buff = Buffer.from(encodedCreds, "base64");
        const plainCreds = buff.toString("utf-8").split(":");
        const [userName, password] = plainCreds;

        console.log(`name: ${userName}, pass: ${password}`);

        const effect = getEffect(userName, password);

        const policy = generatePolicy({
            principalId: encodedCreds,
            methodArn,
            effect,
        });

        callback(null, policy);
        return policy;
    } catch (error) {
        callback(`Unauthorized: ${error.message}`);
        return error;
    }
};

function generatePolicy({
    principalId,
    methodArn,
    effect,
}: {
    principalId: string;
    methodArn: string;
    effect: Effect;
}) {
    return {
        principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: methodArn,
                },
            ],
        },
    };
}

function getEffect(name: string, pass: string) {
    const storedUserPassword = process.env[name];

    let effect = Effect.Deny;

    if (storedUserPassword != null && storedUserPassword === pass) {
        effect = Effect.Allow;
    }

    return effect;
}

export const main = basicAuthorizer;
