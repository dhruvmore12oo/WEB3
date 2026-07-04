const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export const fetchCryptoPrices = async (signal) => {
  const ids = 'bitcoin,ethereum,arbitrum,polygon-ecosystem-token,solana';
  let url = `${COINGECKO_API_URL}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

  // Add API key as a query parameter (required for client-side/browser requests to avoid CORS errors)
  if (import.meta.env.VITE_COINGECKO_API_KEY) {
    url += `&x_cg_demo_api_key=${import.meta.env.VITE_COINGECKO_API_KEY}`;
  }

  try {
    const response = await fetch(url, { signal });
    
    if (response.status === 429) {
      throw new Error('Rate limit exceeded (429). Please wait a moment before refreshing.');
    }
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error fetching crypto prices:', error.message);
    }
    throw error;
  }
};
