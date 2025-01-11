import { forwardRef } from 'react'

import { cn } from '../../../utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  message?: string
  label?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, message, label, ...props }, ref) => {
    return (
      <div className='relative w-full group'>
        <input
          type='text'
          className={cn(
            'outline-none px-3 py-3 peer w-full',

            error && 'border-red-500',
            className
          )}
          placeholder=' '
          ref={ref}
          {...props}
        />

        {label && (
          <label
            className={cn(
              'absolute left-[9px] top-px text-md transition-all duration-300 px-1',
              'transform -translate-y-1/2 pointer-events-none',
              'peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg',
              'group-focus-within:!top-px group-focus-within:!text-md',
              error
                ? 'text-red-500'
                : 'text-gray-500 group-focus-within:!text-blue-500'
            )}
          >
            {label}
          </label>
        )}

        {/* Fieldset for unfocused/empty state */}
        <fieldset
          className={cn(
            'inset-0 absolute border rounded pointer-events-none mt-[-9px]',
            'invisible peer-placeholder-shown:visible',
            error
              ? 'border-red-500 group-hover:border-red-700'
              : 'border-gray-400 group-hover:border-gray-700 group-focus-within:!border-blue-500',
            'group-focus-within:border-2'
          )}
        >
          <legend
            className={cn(
              'ml-2 px-0 text-md transition-all duration-300',
              'invisible max-w-[0.01px] whitespace-nowrap',
              'group-focus-within:max-w-full group-focus-within:px-1'
            )}
          >
            {label}
          </legend>
        </fieldset>

        {/* Fieldset for focused/filled state */}
        <fieldset
          className={cn(
            'inset-0 absolute border w-full rounded pointer-events-none mt-[-9px]',
            'visible peer-placeholder-shown:invisible',
            error
              ? 'border-red-500 group-hover:border-red-700'
              : 'border-gray-400 group-hover:border-gray-700 group-focus-within:!border-blue-500',
            'group-focus-within:border-2'
          )}
        >
          <legend className='ml-2 text-md invisible px-1 max-w-full whitespace-nowrap'>
            {label}
          </legend>
        </fieldset>

        {message && (
          <p
            className={cn(
              'mt-1 text-sm',
              error ? 'text-red-500' : 'text-gray-500'
            )}
          >
            {message}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
