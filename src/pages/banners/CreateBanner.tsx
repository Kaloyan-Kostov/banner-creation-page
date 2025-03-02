import { useNavigate } from 'react-router-dom'
import { useBanner } from '../../hooks/useBanner'
import BannerService from '../../services/banner.service'
import BannerForm from './BannerForm'
import { BannerDto } from '../../services/dto/banner.dto'
import { themeBackgrounds } from '../../hooks/useBanner'

export default function CreateBanner() {
    const {
        selectedTheme,
        setSelectedTheme,
        primaryText,
        setPrimaryText,
        secondaryText,
        setSecondaryText,
        error,
        setError,
    } = useBanner('Create Banner')

    const navigate = useNavigate()

    const handleCreateBanner = () => {
        if (!primaryText.trim() || !secondaryText.trim() || !selectedTheme) {
            setError('Please fill in all fields.')
            return
        }

        const newBanner: BannerDto = {
            id: Date.now().toString(),
            link: '',
            imageUrl: themeBackgrounds[selectedTheme],
            primaryText,
            secondaryText,
        }

        BannerService.createBanner(newBanner)
        setError(null)
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
            handleSubmit={handleCreateBanner}
            mode="create"
            handleCancel={() => navigate('/banners')}
        />
    )
}
