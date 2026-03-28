// composables/useCollections.ts
// Fetches collections from the NestJS API with graceful fallback

const API_URL = 'http://localhost:3000'

export interface Collection {
    id: string | number
    name?: string
    title?: string
    author?: string
    description?: string
    upvotes?: number
    downloads?: number
    category?: string
    tags?: string[]
}

export function useCollections() {
    const trending = ref<Collection[]>([])
    const recent = ref<Collection[]>([])
    const trendingPending = ref(false)
    const recentPending = ref(false)
    const trendingError = ref(false)
    const recentError = ref(false)

    async function fetchTrending() {
        trendingPending.value = true
        trendingError.value = false
        try {
            const response = await fetch(`${API_URL}/collections?sort=popular&limit=5`)
            if (!response.ok) throw new Error('Network response was not ok')
            const data = await response.json()
            trending.value = (data.data || data || []).map((c: any) => ({
                ...c,
                title: c.title || c.name,
                tags: c.tags || (c.category ? [c.category] : []),
            }))
        } catch {
            trendingError.value = true
            trending.value = []
        } finally {
            trendingPending.value = false
        }
    }

    async function fetchRecent() {
        recentPending.value = true
        recentError.value = false
        try {
            const response = await fetch(`${API_URL}/collections?sort=recent&limit=5`)
            if (!response.ok) throw new Error('Network response was not ok')
            const data = await response.json()
            recent.value = (data.data || data || []).map((c: any) => ({
                ...c,
                title: c.title || c.name,
                tags: c.tags || (c.category ? [c.category] : []),
            }))
        } catch {
            recentError.value = true
            recent.value = []
        } finally {
            recentPending.value = false
        }
    }

    return {
        trending,
        recent,
        trendingPending,
        recentPending,
        trendingError,
        recentError,
        fetchTrending,
        fetchRecent,
    }
}
