/**
 * API Route: /api/products
 * 
 * Endpoint ini menyediakan data produk dalam format JSON
 * Digunakan oleh halaman CSR dan SSR untuk mengambil data
 * 
 * Flow:
 * 1. Import data dari products.json
 * 2. Return data sebagai JSON response dengan status 200
 */

import { NextResponse } from 'next/server';
import productsData from '@/data/products.json';

export async function GET() {
  // Simulasi delay network untuk melihat loading state
  // Uncomment baris di bawah untuk simulasi:
  // await new Promise(resolve => setTimeout(resolve, 1000));
  
  return NextResponse.json({
    success: true,
    data: productsData,
    timestamp: new Date().toISOString()
  });
}