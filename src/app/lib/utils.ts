import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const validatePhone = (phone: string) =>
  /^[\d\s\+\-\(\)]{8,15}$/.test(phone)

export const sanitizeInput = (input: string) =>
  input.replace(/[<>]/g, '').trim()
