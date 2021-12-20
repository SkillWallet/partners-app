/// <reference types="react-scripts" />

namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_PARTNERS_REGISTRY_ADDRESS: string;
    REACT_APP_DISCORD_API_URL: string;
    REACT_APP_DITO_API_URL: string;
    REACT_APP_DITO_BUCKET_NAME: string;
    REACT_APP_RPC_URL: string;
    REACT_APP_TEXTILE_KEY: string;
    REACT_APP_TEXTILE_SECRET: string;
    REACT_APP_TEXTILE_SW_BUCKET_NAME: string;
    REACT_APP_DISCORD_CLIENT_ID: string;
    REACT_APP_DISCORD_CLIENT_SECRET: string;
    REACT_APP_DISCORD_GRAND_TYPE: string;
    REACT_APP_DISCORD_REDIRECT_URL: string;
    NODE_ENV: 'development' | 'production';
    PORT?: string;
    PWD: string;
  }
}

interface Window {
  ethereum: {
    isMetaMask?: boolean;
    isStatus?: boolean;
    selectedAddress?: string;
    host?: string;
    path?: string;
    sendAsync?: (request: { method: string; params?: Array<any> }, callback: (error: any, response: any) => void) => void;
    send?: (request: { method: string; params?: Array<any> }, callback: (error: any, response: any) => void) => void;
    request?: (request: { method: string; params?: Array<any> }) => Promise<any>;
    enable?: () => Prmise<void>;
  };
}
