import { useState, useEffect } from 'react'
import { usePageData } from '../context/page-data/page-data.context'

export const themeBackgrounds: Record<string, string> = {
    red: '/src/assets/banner.svg',
    cyan: '/src/assets/banner2.svg',
    purple: '/src/assets/banner3.svg',
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
