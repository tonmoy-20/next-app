import Link from 'next/link'
import Image from 'next/image'

export default function ItemCard({ item }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
      <div className="relative h-48 w-full">
        <Image
          src={item.image || '/placeholder-product.jpg'}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {item.name}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${item.price}
          </span>
          
          <Link 
            href={`/items/${item.id}`}
            className="btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}