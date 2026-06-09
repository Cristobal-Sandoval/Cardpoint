import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useCards() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCards = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('in_stock', true)
        .order('created_at', { ascending: false })
      if (error) throw error
      setCards(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCards()
  }, [])

  return { cards, loading, error, refetch: fetchCards }
}
