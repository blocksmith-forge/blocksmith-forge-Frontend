/**
 * Blocksmith-forge Freighter Wallet Integration
 * 
 * This module provides utility functions for interacting with the
 * Freighter wallet browser extension for Stellar transactions.
 */

declare global {
  interface Window {
    freighter?: {
      isConnected: () => Promise<boolean>;
      isAllowed: () => Promise<boolean>;
      getUserInfo: () => Promise<{ publicKey: string; }>;
      signTransaction: (xdr: string, opts?: { network: string; }) => Promise<string>;
      signAuthEntry: (entryXdr: string) => Promise<string>;
    };
  }
}

/**
 * Check if Freighter wallet is installed
 */
export const isFreighterInstalled = (): boolean => {
  return typeof window !== 'undefined' && !!window.freighter;
};

/**
 * Check if Freighter wallet is connected
 */
export const isConnected = async (): Promise<boolean> => {
  if (!isFreighterInstalled()) {
    return false;
  }

  try {
    return await window.freighter!.isConnected();
  } catch (error) {
    console.error('Error checking connection status:', error);
    return false;
  }
};

/**
 * Check if the current site is allowed to access Freighter
 */
export const isAllowed = async (): Promise<boolean> => {
  if (!isFreighterInstalled()) {
    return false;
  }

  try {
    return await window.freighter!.isAllowed();
  } catch (error) {
    console.error('Error checking permission status:', error);
    return false;
  }
};

/**
 * Connect to Freighter wallet and return the public key
 */
export const connectWallet = async (): Promise<string> => {
  if (!isFreighterInstalled()) {
    throw new Error('Freighter wallet is not installed');
  }

  try {
    const allowed = await window.freighter!.isAllowed();
    if (!allowed) {
      throw new Error('Please allow access to Freighter wallet');
    }

    const userInfo = await window.freighter!.getUserInfo();
    return userInfo.publicKey;
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    throw error;
  }
};

/**
 * Get the public key of the connected wallet
 */
export const getPublicKey = async (): Promise<string> => {
  if (!isFreighterInstalled()) {
    throw new Error('Freighter wallet is not installed');
  }

  try {
    const userInfo = await window.freighter!.getUserInfo();
    return userInfo.publicKey;
  } catch (error) {
    console.error('Error getting public key:', error);
    throw error;
  }
};

/**
 * Sign a transaction using Freighter wallet
 * @param xdr - The transaction XDR string
 * @param network - The network to use ('testnet' or 'public')
 * @returns The signed transaction XDR
 */
export const signTransaction = async (
  xdr: string,
  network: 'testnet' | 'public' = 'testnet'
): Promise<string> => {
  if (!isFreighterInstalled()) {
    throw new Error('Freighter wallet is not installed');
  }

  try {
    const signedXdr = await window.freighter!.signTransaction(xdr, {
      network: network === 'public' ? 'PUBLIC' : 'TESTNET',
    });
    return signedXdr;
  } catch (error) {
    console.error('Error signing transaction:', error);
    throw error;
  }
};

/**
 * Sign an authentication entry using Freighter wallet
 * @param entryXdr - The authentication entry XDR string
 * @returns The signed entry XDR
 */
export const signAuthEntry = async (entryXdr: string): Promise<string> => {
  if (!isFreighterInstalled()) {
    throw new Error('Freighter wallet is not installed');
  }

  try {
    const signedEntryXdr = await window.freighter!.signAuthEntry(entryXdr);
    return signedEntryXdr;
  } catch (error) {
    console.error('Error signing auth entry:', error);
    throw error;
  }
};

/**
 * Disconnect wallet (clear local state)
 * Note: Freighter doesn't have a built-in disconnect method,
 * so this is primarily for clearing local application state
 */
export const disconnectWallet = (): void => {
  // Clear any local wallet state
  if (typeof window !== 'undefined') {
    localStorage.removeItem('blocksmith-forge-wallet-connected');
    localStorage.removeItem('blocksmith-forge-public-key');
  }
};

/**
 * Save wallet connection state to local storage
 */
export const saveWalletState = (publicKey: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('blocksmith-forge-wallet-connected', 'true');
    localStorage.setItem('blocksmith-forge-public-key', publicKey);
  }
};

/**
 * Load wallet connection state from local storage
 */
export const loadWalletState = (): { connected: boolean; publicKey: string } => {
  if (typeof window !== 'undefined') {
    const connected = localStorage.getItem('blocksmith-forge-wallet-connected') === 'true';
    const publicKey = localStorage.getItem('blocksmith-forge-public-key') || '';
    return { connected, publicKey };
  }
  return { connected: false, publicKey: '' };
};

/**
 * Network configuration
 */
export const NETWORK_CONFIG = {
  testnet: {
    networkPassphrase: 'Test SDF Network ; September 2015',
    horizonUrl: 'https://horizon-testnet.stellar.org',
  },
  public: {
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
    horizonUrl: 'https://horizon.stellar.org',
  },
};

/**
 * Get network configuration
 */
export const getNetworkConfig = (network: 'testnet' | 'public' = 'testnet') => {
  return NETWORK_CONFIG[network];
};
