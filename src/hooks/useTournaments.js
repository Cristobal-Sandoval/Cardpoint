import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useTournaments() {
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTournaments = async (isMounted = { current: true }) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .order('created_at', { ascending: true })
      if (error) throw error
      if (isMounted.current) {
        setTournaments(data || [])
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
    fetchTournaments(isMounted)
    return () => {
      isMounted.current = false
    }
  }, [])

  return { tournaments, loading, error, refetch: () => fetchTournaments({ current: true }) }
}
