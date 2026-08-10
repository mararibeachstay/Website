import './Button.css'

/**
 * Reusable premium button used across the site.
 * variant: 'primary' | 'outline'
 */
function Button({ children, icon: Icon, variant = 'primary', as = 'button', href, className = '', ...rest }) {
  const classes = `btn btn--${variant} ${className}`.trim()

  if (as === 'a') {
    return (
      <a href={href} className={classes} {...rest}>
        {Icon && <Icon size={16} strokeWidth={1.8} />}
        <span>{children}</span>
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {Icon && <Icon size={16} strokeWidth={1.8} />}
      <span>{children}</span>
    </button>
  )
}

export default Button
