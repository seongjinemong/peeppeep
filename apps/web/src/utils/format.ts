const handleTagFormat = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    const value = (e.target as HTMLInputElement).value
    if (value) {
      const processedValue = value
        .split(',')
        .map((tag) => tag.trim().replace(/\s+/g, '_'))
      return processedValue
    }
  }
}
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
export { handleTagFormat, formatDate }
