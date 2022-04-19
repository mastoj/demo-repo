export interface AzureConfig {
    clientId: string;
    clientSecret: string;
    resourceGroupName: string;
    subscriptionId: string;
    tenantId: string;
}

export const readActionSecret = (): AzureConfig => {
    const json = process.env.ACTION_SECRET;
    return JSON.parse(json);
}