const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// In-memory storage for items (in production, use a real database)
let items = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop",
    category: "Electronics",
    brand: "AudioTech",
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitoring, GPS, and smartphone integration. Water-resistant design for all activities.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop",
    category: "Wearables",
    brand: "FitTech",
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Portable Laptop Stand",
    description: "Ergonomic aluminum laptop stand that's lightweight and adjustable. Perfect for remote work and improving posture.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=300&fit=crop",
    category: "Accessories",
    brand: "ErgoDesk",
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Organic Coffee Beans",
    description: "Premium organic coffee beans sourced from sustainable farms. Rich, full-bodied flavor with notes of chocolate and caramel.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&h=300&fit=crop",
    category: "Food & Beverage",
    brand: "BrewMaster",
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=300&fit=crop",
    category: "Electronics",
    brand: "ChargeTech",
    inStock: true,
    createdAt: new Date().toISOString()
  }
]

let nextId = 6

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Product Listing API is running',
    timestamp: new Date().toISOString()
  })
})

// Get all items
app.get('/api/items', (req, res) => {
  try {
    const { search, category, limit, offset } = req.query
    
    let filteredItems = [...items]
    
    // Search functionality
    if (search) {
      const searchTerm = search.toLowerCase()
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.brand.toLowerCase().includes(searchTerm)
      )
    }
    
    // Category filter
    if (category) {
      filteredItems = filteredItems.filter(item =>
        item.category.toLowerCase() === category.toLowerCase()
      )
    }
    
    // Pagination
    const limitNum = parseInt(limit) || 10
    const offsetNum = parseInt(offset) || 0
    const paginatedItems = filteredItems.slice(offsetNum, offsetNum + limitNum)
    
    res.json({
      items: paginatedItems,
      total: filteredItems.length,
      limit: limitNum,
      offset: offsetNum,
      hasMore: offsetNum + limitNum < filteredItems.length
    })
  } catch (error) {
    console.error('Error fetching items:', error)
    res.status(500).json({ error: 'Failed to fetch items' })
  }
})

// Get single item by ID
app.get('/api/items/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const item = items.find(item => item.id === id)
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' })
    }
    
    res.json(item)
  } catch (error) {
    console.error('Error fetching item:', error)
    res.status(500).json({ error: 'Failed to fetch item' })
  }
})

// Create new item
app.post('/api/items', (req, res) => {
  try {
    const { name, description, price, image, category, brand } = req.body
    
    // Validation
    if (!name || !description || !price) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, description, and price are required' 
      })
    }
    
    if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
      return res.status(400).json({ error: 'Price must be a valid positive number' })
    }
    
    const newItem = {
      id: nextId++,
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image: image ? image.trim() : null,
      category: category ? category.trim() : 'Uncategorized',
      brand: brand ? brand.trim() : null,
      inStock: true,
      createdAt: new Date().toISOString()
    }
    
    items.push(newItem)
    
    res.status(201).json({
      message: 'Item created successfully',
      item: newItem
    })
  } catch (error) {
    console.error('Error creating item:', error)
    res.status(500).json({ error: 'Failed to create item' })
  }
})

// Update item
app.put('/api/items/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const itemIndex = items.findIndex(item => item.id === id)
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' })
    }
    
    const { name, description, price, image, category, brand, inStock } = req.body
    
    // Update only provided fields
    if (name !== undefined) items[itemIndex].name = name.trim()
    if (description !== undefined) items[itemIndex].description = description.trim()
    if (price !== undefined) {
      if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
        return res.status(400).json({ error: 'Price must be a valid positive number' })
      }
      items[itemIndex].price = parseFloat(price)
    }
    if (image !== undefined) items[itemIndex].image = image ? image.trim() : null
    if (category !== undefined) items[itemIndex].category = category.trim()
    if (brand !== undefined) items[itemIndex].brand = brand ? brand.trim() : null
    if (inStock !== undefined) items[itemIndex].inStock = Boolean(inStock)
    
    items[itemIndex].updatedAt = new Date().toISOString()
    
    res.json({
      message: 'Item updated successfully',
      item: items[itemIndex]
    })
  } catch (error) {
    console.error('Error updating item:', error)
    res.status(500).json({ error: 'Failed to update item' })
  }
})

// Delete item
app.delete('/api/items/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const itemIndex = items.findIndex(item => item.id === id)
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' })
    }
    
    const deletedItem = items.splice(itemIndex, 1)[0]
    
    res.json({
      message: 'Item deleted successfully',
      item: deletedItem
    })
  } catch (error) {
    console.error('Error deleting item:', error)
    res.status(500).json({ error: 'Failed to delete item' })
  }
})

// Get categories
app.get('/api/categories', (req, res) => {
  try {
    const categories = [...new Set(items.map(item => item.category))]
    res.json({ categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Function to find available port
const findAvailablePort = (startPort) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(startPort, () => {
      const port = server.address().port
      server.close(() => resolve(port))
    })
    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(startPort + 1).then(resolve).catch(reject)
      } else {
        reject(err)
      }
    })
  })
}

// Start server with port fallback
const startServer = async () => {
  try {
    const availablePort = await findAvailablePort(PORT)
    
    app.listen(availablePort, () => {
      console.log(`🚀 Product Listing API server is running on port ${availablePort}`)
      console.log(`📋 API endpoints:`)
      console.log(`   GET    http://localhost:${availablePort}/api/health - Health check`)
      console.log(`   GET    http://localhost:${availablePort}/api/items - Get all items`)
      console.log(`   GET    http://localhost:${availablePort}/api/items/:id - Get item by ID`)
      console.log(`   POST   http://localhost:${availablePort}/api/items - Create new item`)
      console.log(`   PUT    http://localhost:${availablePort}/api/items/:id - Update item`)
      console.log(`   DELETE http://localhost:${availablePort}/api/items/:id - Delete item`)
      console.log(`   GET    http://localhost:${availablePort}/api/categories - Get all categories`)
      
      if (availablePort !== PORT) {
        console.log(`⚠️  Note: Port ${PORT} was in use, using port ${availablePort} instead`)
        console.log(`   Update your frontend to use: http://localhost:${availablePort}`)
      }
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()