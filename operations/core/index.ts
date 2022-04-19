import { secret } from "@pulumi/pulumi";
import { readActionSecret } from "../common/azureProvider";

export const azureConfig = secret(readActionSecret());