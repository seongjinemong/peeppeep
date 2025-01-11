import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import useDebounce from './useDebounce'

export const useParamsSearch = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const search = searchParams.get('search')
  const tag = searchParams.get('tag')

  const updateSearch = useCallback(
    (searchTerm: string) => {
      if (searchTerm) {
        navigate(`?search=${searchTerm}`)
      } else {
        navigate('')
      }
    },
    [navigate]
  )

  const debouncedSearch = useDebounce(updateSearch, 300)

  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearchInput(value)
      debouncedSearch(value)
    },
    [debouncedSearch]
  )

  const handleTagClick = useCallback(
    (tag: string) => {
      navigate(`?tag=${tag}`)
    },
    [navigate]
  )

  const handleSearch = useCallback(
    (searchTerm: string) => {
      setSearchInput(searchTerm)
      navigate(`?search=${searchTerm}`)
    },
    [navigate]
  )

  return {
    search,
    handleSearch,
    tag,
    handleTagClick,
    handleSearchInput,
    searchInput
  }
}
