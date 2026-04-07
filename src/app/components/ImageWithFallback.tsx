import { useState } from 'react'
import { cn } from '@/app/lib/utils'

interface ImageWithFallbackProps {
  src: string
  fallback?: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  sizes?: string
  width?: number
  height?: number
}

export function ImageWithFallback({
  src,
  fallback = '/placeholder.jpg',
  alt,
  className,
  loading = 'lazy',
  sizes,
  width,
  height,
}: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(false)

  return (
    <img
      src={errored ? fallback : src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setErrored(true)}
      className={cn('object-cover', className)}
      {...(sizes && { sizes })}
      {...(width && { width })}
      {...(height && { height })}
    />
  )
}
