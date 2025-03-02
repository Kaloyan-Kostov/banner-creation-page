import { useState, useEffect } from 'react'
import { usePageData } from '../context/page-data/page-data.context'

export const themeBackgrounds: Record<string, string> = {
    red: '/src/assets/red.svg',
    cyan: '/src/assets/cyan.svg',
    purple: '/src/assets/purple.svg',
}

export function useBanner(initialTitle: string) {
    const { setPageData } = usePageData()
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
    const [primaryText, setPrimaryText] = useState('')
    const [secondaryText, setSecondaryText] = useState('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setPageData({ title: initialTitle })
    }, [setPageData, initialTitle])

    return {
        selectedTheme,
        setSelectedTheme,
        primaryText,
        setPrimaryText,
        secondaryText,
        setSecondaryText,
        error,
        setError,
    }
}
