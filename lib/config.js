// Configuration file for the application

export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003',
    endpoints: {
      items: '/api/items',
      health: '/api/health',
      categories: '/api/categories'
    }
  },
  
  // Authentication Configuration
  auth: {
    cookieMaxAge: 86400, // 24 hours in seconds
    mockCredentials: {
      email: 'admin@producthub.com',
      password: 'password123'
    }
  },
  
  // App Configuration
  app: {
    name: 'ProductHub',
    description: 'Your one-stop destination for amazing products',
    version: '1.0.0'
  }
}

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${config.api.baseUrl}${endpoint}`
}

// Helper function to get items API URL
export const getItemsApiUrl = (id = null) => {
  const baseUrl = getApiUrl(config.api.endpoints.items)
  return id ? `${baseUrl}/${id}` : baseUrl
}