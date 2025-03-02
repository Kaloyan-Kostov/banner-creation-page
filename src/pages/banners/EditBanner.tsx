import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBanner } from '../../hooks/useBanner'
import BannerService from '../../services/banner.service'
import BannerForm from './BannerForm'
import { BannerDto } from '../../services/dto/banner.dto'
import { themeBackgrounds } from '../../hooks/useBanner'

export default function EditBanner() {
    const { id } = useParams<{ id: string }>()
    const {
        selectedTheme,
        setSelectedTheme,
        primaryText,
        setPrimaryText,
        secondaryText,
        setSecondaryText,
        error,
        setError,
    } = useBanner('Edit Banner')

    const navigate = useNavigate()

    useEffect(() => {
        const loadBanner = async () => {
            if (!id) {
                return
            }
            const banner = await BannerService.getBanner(id)
            if (banner) {
                setPrimaryText(banner.primaryText || '')
                setSecondaryText(banner.secondaryText || '')
                const theme = Object.keys(themeBackgrounds).find(
                    (key) => themeBackgrounds[key] === banner.imageUrl
                )
                setSelectedTheme(theme || null)
            }
        }

        loadBanner()
    }, [id])

    const handleEditBanner = () => {
        if (!primaryText.trim() || !secondaryText.trim() || !selectedTheme) {
            setError('Please fill in all fields.')
            return
        }

        const updatedBanner: BannerDto = {
            id: id!,
            link: '',
            imageUrl: themeBackgrounds[selectedTheme],
            primaryText,
            secondaryText,
        }

        BannerService.updateBanner(id!, updatedBanner)
        navigate('/banners')
    }

    return (
        <BannerForm
            primaryText={primaryText}
            setPrimaryText={setPrimaryText}
            secondaryText={secondaryText}
            setSecondaryText={setSecondaryText}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            error={error}
            handleSubmit={handleEditBanner}
            mode="edit"
            handleCancel={() => navigate('/banners')}
        />
    )
}
