'use client'

import { useClientOnly } from '../../lib/useClientOnly'

export default function ClientOnly({ children, fallback = null }) {
  const isClient = useClientOnly()
  
  if (!isClient) {
    return fallback
  }
  
  return children
}