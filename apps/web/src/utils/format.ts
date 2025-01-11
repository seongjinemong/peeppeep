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
export function formatDate(date: { $date: string } | undefined | null): string {
  if (!date || !date.$date) return ''

  try {
    const dateObj = new Date(date.$date)
    const now = new Date()
    const diff = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

    // 1분 미만
    if (diff < 60) {
      return '방금 전'
    }

    // 1시간 미만
    if (diff < 3600) {
      const minutes = Math.floor(diff / 60)
      return `${minutes}분 전`
    }

    // 24시간 미만
    if (diff < 86400) {
      const hours = Math.floor(diff / 3600)
      return `${hours}시간 전`
    }

    // 7일 미만
    if (diff < 604800) {
      const days = Math.floor(diff / 86400)
      return `${days}일 전`
    }

    // 30일 미만
    if (diff < 2592000) {
      const weeks = Math.floor(diff / 604800)
      return `${weeks}주 전`
    }

    // 1년 미만
    if (diff < 31536000) {
      const months = Math.floor(diff / 2592000)
      return `${months}개월 전`
    }

    // 1년 이상
    const years = Math.floor(diff / 31536000)
    return `${years}년 전`
  } catch (error) {
    return ''
  }
}

export { handleTagFormat }
