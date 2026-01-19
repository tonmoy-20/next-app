'use client'

import { useState, useEffect, useMemo } from 'react'
import ItemCard from '../components/ItemCard'
import { getItemsApiUrl } from '../../lib/config'

export default function ItemsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      setError('')
      
      try {
        // Try to fetch from Express API first, fallback to mock data
        const response = await fetch(getItemsApiUrl())
        
        if (response.ok) {
          const data = await response.json()
          setItems(data.items || data)
        } else {
          throw new Error('API not available')
        }
      } catch (err) {
        console.warn('Express API not available, using mock data:', err.message)
        
        // Fallback to mock data
        const mockItems = [
          {
            id: 1,
            name: "Wireless Bluetooth Headphones",
            description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop"
          },
          {
            id: 2,
            name: "Smart Fitness Watch",
            description: "Advanced fitness tracking with heart rate monitoring, GPS, and smartphone integration. Water-resistant design for all activities.",
            price: 299.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop"
          },
          {
            id: 3,
            name: "Portable Laptop Stand",
            description: "Ergonomic aluminum laptop stand that's lightweight and adjustable. Perfect for remote work and improving posture.",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=300&fit=crop"
          },
          {
            id: 4,
            name: "Organic Coffee Beans",
            description: "Premium organic coffee beans sourced from sustainable farms. Rich, full-bodied flavor with notes of chocolate and caramel.",
            price: 24.99,
            image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&h=300&fit=crop"
          },
          {
            id: 5,
            name: "Wireless Charging Pad",
            description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.",
            price: 39.99,
            image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=300&fit=crop"
          }
        ]
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
        setItems(mockItems)
      }
      
      setLoading(false)
    }

    fetchItems()
  }, [])

  // Use useMemo to avoid cascading renders
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, items])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of high-quality products
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-center">
            Showing {filteredItems.length} of {items.length} products
            {searchTerm && (
              <span className="ml-2">
                for &ldquo;<span className="font-semibold">{searchTerm}</span>&rdquo;
              </span>
            )}
          </p>
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5.657-2.343m0-8.686A7.962 7.962 0 0112 4a7.962 7.962 0 015.657 2.343m0 8.686a4 4 0 01-5.657 0" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search terms or browse all products.
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 btn-primary"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  )
}