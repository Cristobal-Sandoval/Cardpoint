import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useNews() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNews = async (isMounted = { current: true }) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error;
      if (isMounted.current) {
        setNews(data || [])
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err?.message || String(err))
      }
    } finally {
      if (isMounted.current) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const isMounted = { current: true }
    fetchNews(isMounted)
    return () => {
      isMounted.current = false
    }
  }, [])

  return { news, loading, error, refetch: () => fetchNews({ current: true }) }
}
