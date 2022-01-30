/* eslint-disable no-shadow */
import { envionmentGenerator } from 'sw-web-shared';

export enum EnvMode {
  Production = 'production',
  Development = 'development',
}

export const swEnvVariables = {
  // env
  env: 'REACT_APP_NODE_ENV',

  // skillwallet
  apiUrl: 'REACT_APP_API_URL',
  partnersRegistryAdress: 'REACT_APP_PARTNERS_REGISTRY_ADDRESS',
  communityRegistryAddress: 'REACT_APP_COMMUNITY_REGISTRY_ADDRESS',
  rpcUrls: 'REACT_APP_MATIC_RPC_URLS',

  // dito
  ditoApiUrl: 'REACT_APP_DITO_API_URL',
  ditoBucketName: 'REACT_APP_DITO_BUCKET_NAME',

  // textile
  textileKey: 'REACT_APP_TEXTILE_KEY',
  textileSecret: 'REACT_APP_TEXTILE_SECRET',
  textileSwBucketName: 'REACT_APP_TEXTILE_SW_BUCKET_NAME',

  // discord
  discordClientId: 'REACT_APP_DISCORD_CLIENT_ID',
  discordClientSecret: 'REACT_APP_DISCORD_CLIENT_SECRET',
  discordGrandType: 'REACT_APP_DISCORD_GRAND_TYPE',
  discordRedirectUri: 'REACT_APP_DISCORD_REDIRECT_URL',
  discordApiUrl: 'REACT_APP_DISCORD_API_URL',
};

export const environment: typeof swEnvVariables = envionmentGenerator(swEnvVariables);
