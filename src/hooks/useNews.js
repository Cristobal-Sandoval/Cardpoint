import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useNews() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNews = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
      if (error) throw error
      setNews(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  return { news, loading, error, refetch: fetchNews }
}
