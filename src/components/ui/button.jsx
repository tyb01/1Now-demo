import { clsx } from 'clsx'
import { cloneElement } from 'react'

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
  outline: 'border border-border bg-card hover:bg-secondary text-foreground shadow-none',
  ghost: 'hover:bg-secondary text-foreground hover:text-foreground',
  link: 'text-primary underline-offset-4 hover:underline p-0 h-auto',
}

const sizes = {
  default: 'h-10 px-4 py-2 text-sm',
  sm: 'h-8 px-3 text-xs',
  icon: 'h-10 w-10 p-0',
}

export function Button({
  variant = 'default',
  size = 'default',
  className,
  asChild = false,
  children,
  ...props
}) {
  const base = clsx(
    'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
    'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    variants[variant],
    size !== 'default' || !variants[variant].includes('h-') ? sizes[size] : sizes.default,
    className
  )

  if (asChild && children) {
    return cloneElement(children, {
      className: clsx(base, children.props.className),
    })
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  )
}
