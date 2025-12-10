import { Chain } from 'wagmi/chains';

export const odyssey: Chain = {
  id: 1516,
  name: 'Story Odyssey Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'IP',
    symbol: 'IP',
  },
  rpcUrls: {
    default: {
      http: [process.env.REACT_APP_RPC_URL || 'https://odyssey.storyrpc.io'],
    },
    public: {
      http: [process.env.REACT_APP_RPC_URL || 'https://odyssey.storyrpc.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Story Explorer',
      url: 'https://odyssey.storyscan.xyz',
    },
  },
  testnet: true,
};

export const aeneid: Chain = {
  id: 1315,
  name: 'Story Aeneid Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'IP',
    symbol: 'IP',
  },
  rpcUrls: {
    default: {
      http: [process.env.REACT_APP_AENEID_RPC_URL || 'https://aeneid.storyrpc.io'],
    },
    public: {
      http: [process.env.REACT_APP_AENEID_RPC_URL || 'https://aeneid.storyrpc.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Aeneid Explorer',
      url: 'https://aeneid.explorer.story.foundation',
    },
  },
  testnet: true,
};
