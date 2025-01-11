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
export { handleTagFormat }
