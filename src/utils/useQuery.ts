const useQuery = (search: string): URLSearchParams => {
  return new URLSearchParams(search)
}

export default useQuery
