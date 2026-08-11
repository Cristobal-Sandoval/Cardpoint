import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useCards() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCards = async (isMounted = { current: true }) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('in_stock', true)
      
      if (error) throw error

      let sortedData = []
      if (data && data.length > 0) {
        const groups = {}
        data.forEach(card => {
          if (!groups[card.name]) groups[card.name] = []
          groups[card.name].push(card)
        })

        const sortedGroups = Object.values(groups).sort((groupA, groupB) => {
          const maxPriceA = Math.max(...groupA.map(c => c.price || 0))
          const maxPriceB = Math.max(...groupB.map(c => c.price || 0))
          return maxPriceB - maxPriceA
        })

        sortedGroups.forEach(group => {
          group.sort((a, b) => (b.price || 0) - (a.price || 0))
          sortedData.push(...group)
        })
      }

      if (isMounted.current) {
        setCards(sortedData)
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
    fetchCards(isMounted)
    return () => {
      isMounted.current = false
    }
  }, [])

  return { cards, loading, error, refetch: () => fetchCards({ current: true }) }
}
