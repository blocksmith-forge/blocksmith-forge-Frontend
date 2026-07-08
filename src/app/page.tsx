'use client';

import { useState, useEffect } from 'react';
import { connectWallet, getPublicKey, signTransaction } from '../lib/freighter';

interface Token {
  symbol: string;
  name: string;
  balance: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'swap' | 'liquidity'>('swap');
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string>('');
  const [fromToken, setFromToken] = useState('XLM');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [lpTokenAmount, setLpTokenAmount] = useState('');
  const [tokenA, setTokenA] = useState('XLM');
  const [tokenB, setTokenB] = useState('USDC');
  const [tokenAAmount, setTokenAAmount] = useState('');
  const [tokenBAmount, setTokenBAmount] = useState('');

  const tokens: Token[] = [
    { symbol: 'XLM', name: 'Stellar Lumens', balance: '1000.00' },
    { symbol: 'USDC', name: 'USD Coin', balance: '500.00' },
    { symbol: 'ETH', name: 'Ethereum', balance: '2.50' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.05' },
  ];

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      const key = await getPublicKey();
      if (key) {
        setPublicKey(key);
        setWalletConnected(true);
      }
    } catch (error) {
      console.log('Wallet not connected');
    }
  };

  const handleConnectWallet = async () => {
    try {
      const key = await connectWallet();
      setPublicKey(key);
      setWalletConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please ensure Freighter is installed.');
    }
  };

  const handleSwap = async () => {
    if (!walletConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!fromAmount || !toAmount) {
      alert('Please enter amounts for both tokens');
      return;
    }

    try {
      // In production, this would call the smart contract
      alert(`Swapping ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`);
    } catch (error) {
      console.error('Swap failed:', error);
      alert('Swap failed. Please try again.');
    }
  };

  const handleAddLiquidity = async () => {
    if (!walletConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!tokenAAmount || !tokenBAmount) {
      alert('Please enter amounts for both tokens');
      return;
    }

    try {
      // In production, this would call the smart contract
      alert(`Adding liquidity: ${tokenAAmount} ${tokenA} + ${tokenBAmount} ${tokenB}`);
    } catch (error) {
      console.error('Add liquidity failed:', error);
      alert('Failed to add liquidity. Please try again.');
    }
  };

  const handleRemoveLiquidity = async () => {
    if (!walletConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!lpTokenAmount) {
      alert('Please enter LP token amount');
      return;
    }

    try {
      // In production, this would call the smart contract
      alert(`Removing ${lpTokenAmount} LP tokens`);
    } catch (error) {
      console.error('Remove liquidity failed:', error);
      alert('Failed to remove liquidity. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Blocksmith-forge</h1>
            </div>
            <button
              onClick={handleConnectWallet}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                walletConnected
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {walletConnected ? `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}` : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Swap/Liquidity */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('swap')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'swap'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Swap
              </button>
              <button
                onClick={() => setActiveTab('liquidity')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'liquidity'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Liquidity
              </button>
            </div>

            {/* Swap Panel */}
            {activeTab === 'swap' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold text-white mb-6">Swap Tokens</h2>
                
                {/* From Token */}
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-gray-400 text-sm">From</label>
                    <select
                      value={fromToken}
                      onChange={(e) => setFromToken(e.target.value)}
                      className="bg-transparent text-white font-medium focus:outline-none"
                    >
                      {tokens.map((token) => (
                        <option key={token.symbol} value={token.symbol} className="bg-slate-800">
                          {token.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="number"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-transparent text-3xl font-bold text-white focus:outline-none placeholder-gray-500"
                  />
                  <p className="text-gray-400 text-sm mt-2">Balance: {tokens.find(t => t.symbol === fromToken)?.balance}</p>
                </div>

                {/* Swap Icon */}
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="bg-purple-600 rounded-full p-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>

                {/* To Token */}
                <div className="bg-white/5 rounded-xl p-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-gray-400 text-sm">To</label>
                    <select
                      value={toToken}
                      onChange={(e) => setToToken(e.target.value)}
                      className="bg-transparent text-white font-medium focus:outline-none"
                    >
                      {tokens.map((token) => (
                        <option key={token.symbol} value={token.symbol} className="bg-slate-800">
                          {token.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="number"
                    value={toAmount}
                    onChange={(e) => setToAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-transparent text-3xl font-bold text-white focus:outline-none placeholder-gray-500"
                  />
                  <p className="text-gray-400 text-sm mt-2">Balance: {tokens.find(t => t.symbol === toToken)?.balance}</p>
                </div>

                {/* Slippage Settings */}
                <div className="mt-6">
                  <label className="text-gray-400 text-sm mb-2 block">Slippage Tolerance</label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSlippage('0.1')}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        slippage === '0.1' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      0.1%
                    </button>
                    <button
                      onClick={() => setSlippage('0.5')}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        slippage === '0.5' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      0.5%
                    </button>
                    <button
                      onClick={() => setSlippage('1.0')}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        slippage === '1.0' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      1.0%
                    </button>
                  </div>
                </div>

                {/* Swap Button */}
                <button
                  onClick={handleSwap}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition-all"
                >
                  Swap
                </button>
              </div>
            )}

            {/* Liquidity Panel */}
            {activeTab === 'liquidity' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold text-white mb-6">Liquidity Provision</h2>
                
                {/* Add Liquidity */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">Add Liquidity</h3>
                  
                  <div className="bg-white/5 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-gray-400 text-sm">Token A</label>
                      <select
                        value={tokenA}
                        onChange={(e) => setTokenA(e.target.value)}
                        className="bg-transparent text-white font-medium focus:outline-none"
                      >
                        {tokens.map((token) => (
                          <option key={token.symbol} value={token.symbol} className="bg-slate-800">
                            {token.symbol}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="number"
                      value={tokenAAmount}
                      onChange={(e) => setTokenAAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none placeholder-gray-500"
                    />
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-gray-400 text-sm">Token B</label>
                      <select
                        value={tokenB}
                        onChange={(e) => setTokenB(e.target.value)}
                        className="bg-transparent text-white font-medium focus:outline-none"
                      >
                        {tokens.map((token) => (
                          <option key={token.symbol} value={token.symbol} className="bg-slate-800">
                            {token.symbol}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="number"
                      value={tokenBAmount}
                      onChange={(e) => setTokenBAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none placeholder-gray-500"
                    />
                  </div>

                  <button
                    onClick={handleAddLiquidity}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition-all"
                  >
                    Add Liquidity
                  </button>
                </div>

                {/* Remove Liquidity */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Remove Liquidity</h3>
                  
                  <div className="bg-white/5 rounded-xl p-4 mb-4">
                    <label className="text-gray-400 text-sm mb-2 block">LP Token Amount</label>
                    <input
                      type="number"
                      value={lpTokenAmount}
                      onChange={(e) => setLpTokenAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none placeholder-gray-500"
                    />
                  </div>

                  <button
                    onClick={handleRemoveLiquidity}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl transition-all"
                  >
                    Remove Liquidity
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Pool Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6">Pool Statistics</h2>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">24h Volume</p>
                  <p className="text-2xl font-bold text-white">$250,000</p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Total Liquidity</p>
                  <p className="text-2xl font-bold text-white">$1,500,000</p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">LP Token Supply</p>
                  <p className="text-2xl font-bold text-white">707,106</p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Your Position</p>
                  <p className="text-2xl font-bold text-white">
                    {walletConnected ? '1,250 LP' : 'Connect wallet'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Blocksmith-forge. Built on Stellar.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Documentation</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
