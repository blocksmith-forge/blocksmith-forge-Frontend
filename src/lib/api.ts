/**
 * Blocksmith-forge API Client
 * 
 * This module provides functions for interacting with the backend API
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface Pool {
  id: number;
  pool_id: string;
  token_a: string;
  token_b: string;
  reserve_a: number;
  reserve_b: number;
  total_liquidity: number;
  lp_token_supply: number;
  created_at: string;
  updated_at: string;
}

export interface VolumeMetrics {
  id: number;
  pool_id: string;
  volume_24h: number;
  volume_7d: number;
  total_volume: number;
  updated_at: string;
}

export interface PoolStats {
  pools: Pool[];
  count: number;
}

/**
 * Get all pools
 */
export async function getAllPools(): Promise<PoolStats> {
  const response = await fetch(`${API_URL}/api/pools`);
  if (!response.ok) {
    throw new Error('Failed to fetch pools');
  }
  return response.json();
}

/**
 * Get specific pool by ID
 */
export async function getPool(poolId: string): Promise<Pool> {
  const response = await fetch(`${API_URL}/api/pools/${poolId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch pool');
  }
  return response.json();
}

/**
 * Get volume metrics for a pool
 */
export async function getVolumeMetrics(poolId: string): Promise<VolumeMetrics> {
  const response = await fetch(`${API_URL}/api/pools/${poolId}/volume`);
  if (!response.ok) {
    throw new Error('Failed to fetch volume metrics');
  }
  return response.json();
}

/**
 * Get 24h trading volume across all pools
 */
export async function getTotalVolume24h(): Promise<{ totalVolume24h: number; timestamp: string }> {
  const response = await fetch(`${API_URL}/api/volume/24h`);
  if (!response.ok) {
    throw new Error('Failed to fetch 24h volume');
  }
  return response.json();
}

/**
 * Get pool reserves
 */
export async function getPoolReserves(poolId: string): Promise<{
  reserveA: number;
  reserveB: number;
  lastUpdated: string;
}> {
  const response = await fetch(`${API_URL}/api/pools/${poolId}/reserves`);
  if (!response.ok) {
    throw new Error('Failed to fetch pool reserves');
  }
  return response.json();
}

/**
 * Record a swap
 */
export async function recordSwap(poolId: string, amountIn: number, amountOut: number): Promise<{ success: boolean }> {
  const response = await fetch(`${API_URL}/api/swaps/record`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ poolId, amountIn, amountOut }),
  });
  if (!response.ok) {
    throw new Error('Failed to record swap');
  }
  return response.json();
}

/**
 * Update pool metrics
 */
export async function updatePoolMetrics(poolId: string, updates: Partial<Pool>): Promise<Pool> {
  const response = await fetch(`${API_URL}/api/pools/${poolId}/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update pool metrics');
  }
  return response.json();
}
