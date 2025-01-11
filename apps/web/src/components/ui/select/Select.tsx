import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'

import { cn } from '../../../utils'

interface Option<T> {
  value: T
  label: string
}

interface SelectProps<T> {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  placeholder?: string
  disabled?: boolean
  width?: string
  className?: string
}

export function Select<T>({
  options,
  value,
  onChange,
  placeholder = '선택해주세요',
  disabled = false,
  width = 'w-full',
  className = ''
}: SelectProps<T>) {
  const selectedOption = options.find((option) => option.value === value)

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className={`relative ${width} ${className}`}>
        <Listbox.Button className='relative w-full text-left cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 border outline-none'>
          <span
            className={`block truncate ${!selectedOption ? 'text-gray-400' : ''}`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronDownIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            {options.map((option) => (
              <Listbox.Option
                key={String(option.value)}
                value={option.value}
                className={({ active }: { active: boolean }) => `
                  relative cursor-pointer select-none py-2 pl-3 pr-9
                  ${active ? 'bg-primary/10 text-primary' : 'text-gray-900'}
                `}
              >
                {({ selected }: { selected: boolean }) => (
                  <span
                    className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}
                  >
                    {option.label}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
