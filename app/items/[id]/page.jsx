'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getItemsApiUrl } from '../../../lib/config'

export default function ItemDetailsPage() {
  const params = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Try to fetch from Express API first
        const response = await fetch(getItemsApiUrl(params.id))
        
        if (response.ok) {
          const data = await response.json()
          setItem(data)
        } else if (response.status === 404) {
          setError('Product not found')
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
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
            category: "Electronics",
            brand: "AudioTech",
            inStock: true,
            rating: 4.8,
            reviews: 1247,
            features: [
              "Active Noise Cancellation",
              "30-hour battery life",
              "Bluetooth 5.0 connectivity",
              "Quick charge (15 min = 3 hours)",
              "Premium leather ear cups",
              "Built-in microphone"
            ],
            specifications: {
              "Weight": "250g",
              "Frequency Response": "20Hz - 20kHz",
              "Impedance": "32 ohms",
              "Driver Size": "40mm",
              "Connectivity": "Bluetooth 5.0, 3.5mm jack",
              "Warranty": "2 years"
            }
          },
          {
            id: 2,
            name: "Smart Fitness Watch",
            description: "Advanced fitness tracking with heart rate monitoring, GPS, and smartphone integration. Water-resistant design for all activities.",
            price: 299.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
            category: "Wearables",
            brand: "FitTech",
            inStock: true,
            rating: 4.6,
            reviews: 892,
            features: [
              "Heart rate monitoring",
              "Built-in GPS",
              "Water resistant (50m)",
              "7-day battery life",
              "Sleep tracking",
              "Smartphone notifications"
            ],
            specifications: {
              "Display": "1.4\" AMOLED",
              "Battery Life": "7 days",
              "Water Resistance": "5ATM",
              "Sensors": "Heart rate, GPS, Accelerometer",
              "Compatibility": "iOS & Android",
              "Warranty": "1 year"
            }
          },
          {
            id: 3,
            name: "Portable Laptop Stand",
            description: "Ergonomic aluminum laptop stand that&apos;s lightweight and adjustable. Perfect for remote work and improving posture.",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop",
            category: "Accessories",
            brand: "ErgoDesk",
            inStock: true,
            rating: 4.7,
            reviews: 456,
            features: [
              "Adjustable height and angle",
              "Lightweight aluminum construction",
              "Foldable design",
              "Heat dissipation",
              "Non-slip base",
              "Universal compatibility"
            ],
            specifications: {
              "Material": "Aluminum alloy",
              "Weight": "1.2kg",
              "Compatibility": "11-17 inch laptops",
              "Adjustable Height": "15-25cm",
              "Folded Size": "25 x 20 x 3cm",
              "Warranty": "1 year"
            }
          },
          {
            id: 4,
            name: "Organic Coffee Beans",
            description: "Premium organic coffee beans sourced from sustainable farms. Rich, full-bodied flavor with notes of chocolate and caramel.",
            price: 24.99,
            image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop",
            category: "Food & Beverage",
            brand: "BrewMaster",
            inStock: true,
            rating: 4.9,
            reviews: 234,
            features: [
              "100% Organic certified",
              "Single origin beans",
              "Medium roast",
              "Fair trade sourced",
              "Freshly roasted",
              "Resealable packaging"
            ],
            specifications: {
              "Origin": "Colombia",
              "Roast Level": "Medium",
              "Weight": "500g",
              "Certification": "USDA Organic",
              "Processing": "Washed",
              "Best Before": "12 months"
            }
          },
          {
            id: 5,
            name: "Wireless Charging Pad",
            description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.",
            price: 39.99,
            image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop",
            category: "Electronics",
            brand: "ChargeTech",
            inStock: true,
            rating: 4.5,
            reviews: 678,
            features: [
              "Fast wireless charging",
              "Qi-compatible",
              "LED charging indicator",
              "Overcharge protection",
              "Non-slip surface",
              "Compact design"
            ],
            specifications: {
              "Input": "5V/2A, 9V/1.67A",
              "Output": "5W, 7.5W, 10W",
              "Compatibility": "Qi-enabled devices",
              "Dimensions": "10 x 10 x 0.8cm",
              "Weight": "150g",
              "Warranty": "1 year"
            }
          }
        ]
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const foundItem = mockItems.find(item => item.id === parseInt(params.id))
        
        if (foundItem) {
          // Add mock data for features and specifications if not present
          const enhancedItem = {
            ...foundItem,
            rating: foundItem.rating || 4.5,
            reviews: foundItem.reviews || 100,
            features: foundItem.features || ["High quality", "Durable design", "Great value"],
            specifications: foundItem.specifications || {"Material": "Premium", "Warranty": "1 year"}
          }
          setItem(enhancedItem)
        } else {
          setError('Product not found')
        }
      }
      
      setLoading(false)
    }

    if (params.id) {
      fetchItem()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5.657-2.343m0-8.686A7.962 7.962 0 0112 4a7.962 7.962 0 015.657 2.343m0 8.686a4 4 0 01-5.657 0" />
          </svg>
          <h3 className="mt-2 text-xl font-medium text-gray-900">Product Not Found</h3>
          <p className="mt-1 text-gray-500">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/items" className="mt-4 inline-block btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href="/items" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2">{item.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative h-96 lg:h-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-blue-600 font-medium">{item.category}</p>
                <h1 className="text-3xl font-bold text-gray-900 mt-1">{item.name}</h1>
                <p className="text-gray-600 mt-2">{item.brand}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {item.rating} ({item.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-blue-600">
                ${item.price}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-medium ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  disabled={!item.inStock}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Add to Cart
                </button>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="border-t border-gray-200 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
                <dl className="space-y-2">
                  {Object.entries(item.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="text-gray-600">{key}:</dt>
                      <dd className="text-gray-900 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/items" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  )
}