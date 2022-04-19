export interface AzureConfig {
    clientId: string;
    clientSecret: string;
    resourceGroupName: string;
    subscriptionId: string;
    tenantId: string;
}

export const readActionSecret = (): AzureConfig => {
    const json = process.env.ACTION_SECRET;
    const debugJson = json.split('').join(' ');;
    console.log("Secret: ", debugJson);
    return JSON.parse(json);
}