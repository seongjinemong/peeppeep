import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
}

const Input = ({
  className = '',
  type = 'text',
  label,
  error,
  required,
  disabled,
  id,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasContent, setHasContent] = React.useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasContent(e.target.value.length > 0)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <div className='relative w-full'>
      <input
        id={id}
        type={type}
        disabled={disabled}
        required={required}
        {...props}
        className={`
          outline-none
          peer w-full rounded-lg border bg-transparent px-4 pt-6 pb-2 text-base
          placeholder:text-transparent transition-all duration-200
          ${disabled ? 'cursor-not-allowed opacity-50' : 'opacity-100'}
          ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }
          ${className}
        `}
        placeholder={label}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false)
          setHasContent(e.target.value.length > 0)
        }}
        onChange={handleInputChange}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75
          duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
          peer-focus:-translate-y-3 peer-focus:scale-75
          ${disabled ? 'cursor-not-allowed' : 'cursor-text'}
          ${error ? 'text-red-500' : 'text-gray-500'}
          ${isFocused || hasContent ? '-translate-y-3 scale-75' : ''}
        `}
      >
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  )
}

export default Input
