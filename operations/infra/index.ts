import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";
import * as azure from "@pulumi/azure-native";
import { AzureConfig } from "../common/azureProvider";

const coreStackReference = new pulumi.StackReference("tomasja/demo-repo.core/dev");
const azureConfig = coreStackReference.requireOutput("azureConfig").apply(secret => {console.log("Secret: ", secret); return  secret as AzureConfig;});

const azureProvider = new azure.Provider("azureProvider", {
    clientId: azureConfig.clientId,
    clientSecret: azureConfig.clientSecret,
    subscriptionId: azureConfig.subscriptionId,
});

// Create an Azure resource (Storage Account)
const storageAccount = new storage.StorageAccount("sa", {
    resourceGroupName: azureConfig.resourceGroupName,
    sku: {
        name: storage.SkuName.Standard_LRS,
    },
    kind: storage.Kind.StorageV2,
}, { provider: azureProvider });

// Export the primary key of the Storage Account
const storageAccountKeys = pulumi.all([azureConfig.resourceGroupName, storageAccount.name]).apply(([resourceGroupName, accountName]) =>
    storage.listStorageAccountKeys({ resourceGroupName, accountName }));
export const primaryStorageKey = storageAccountKeys.keys[0].value;
