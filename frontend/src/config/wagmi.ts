import { createConfig, http } from 'wagmi';
import { odyssey, aeneid } from './chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [aeneid, odyssey], // Aeneid first since contracts are deployed there
  connectors: [
    injected(), // Only use injected connector (works with MetaMask, etc.) to avoid optional dependency issues
  ],
  transports: {
    [aeneid.id]: http(process.env.REACT_APP_AENEID_RPC_URL || 'https://aeneid.storyrpc.io'),
    [odyssey.id]: http(process.env.REACT_APP_RPC_URL || 'https://odyssey.storyrpc.io'),
  },
});
