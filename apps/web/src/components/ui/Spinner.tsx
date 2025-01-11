export function Spinner({
  size = 'md',
  color = 'blue'
}: {
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'gray' | 'white'
}) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-4', // border-3을 border-4로 변경
    lg: 'w-12 h-12 border-4'
  }

  const colorClasses = {
    blue: 'border-blue-200 border-t-blue-500',
    gray: 'border-gray-200 border-t-gray-500',
    white: 'border-gray-100/30 border-t-white'
  }

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${colorClasses[color]}
        rounded-full
        border-solid
        animate-spin
    `}
    />
  )
}
