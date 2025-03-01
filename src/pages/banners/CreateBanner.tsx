import { useState, useEffect } from 'react'
import { Card, Textarea, Select, Option, Button, Tooltip } from '@mui/joy'
import { usePageData } from '../../context/page-data/page-data.context'
import { CardActions } from '@mui/material'
import Box from '@mui/joy/Box'
import Image from '../../components/Image'
import BannerService from '../../services/banner.service'
import { useNavigate } from 'react-router-dom'

const themeBackgrounds: Record<string, string> = {
    red: '/src/assets/banner.svg',
    cyan: '/src/assets/banner2.svg',
    purple: '/src/assets/banner3.svg',
}

export default function CreateBanner() {
    const { setPageData } = usePageData()
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
    const [primaryText, setPrimaryText] = useState('')
    const [secondaryText, setSecondaryText] = useState('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        setPageData({ title: 'Create Banner' })
    }, [setPageData])

    const handleCreateBanner = () => {
        if (!primaryText.trim() || !secondaryText.trim() || !selectedTheme) {
            setError('Please fill in all fields.')
            return
        }

        const newBanner = {
            id: Date.now().toString(),
            link: JSON.stringify({ primaryText, secondaryText }),
            imageUrl: themeBackgrounds[selectedTheme],
        }

        BannerService.createBanner(newBanner)
        setError(null)
        navigate('/banners')
    }

    return (
        <Card
            sx={{
                position: 'relative',
                height: { xs: 700, sm: 400, md: 500, lg: 600 },
                width: { xs: 330 },
                maxWidth: 350,
                mx: 'auto',
                overflow: 'hidden',
            }}
        >
            {selectedTheme && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0,
                    }}
                >
                    <Image url={themeBackgrounds[selectedTheme]} />
                </Box>
            )}
            <Box
                sx={{
                    position: 'absolute',
                    top: { xs: '67%', sm: '72%' },
                    left: '65%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    width: { xs: '50%', sm: '42%', md: '50%' },
                    zIndex: 1,
                }}
            >
                <Tooltip
                    title="Here goes your UPPERCASE text."
                    placement="top"
                >
                    <Textarea
                        placeholder="Primary Text"
                        sx={{ width: '100%' }}
                        value={primaryText}
                        onChange={(e) => setPrimaryText(e.target.value.slice(0, 20))}
                        required
                    />
                </Tooltip>
                <Tooltip
                    title="This is the text below the primary."
                    placement="bottom"
                >
                    <Textarea
                        placeholder="Secondary Text"
                        sx={{ width: '100%' }}
                        value={secondaryText}
                        onChange={(e) => setSecondaryText(e.target.value)}
                        required
                    />
                </Tooltip>
            </Box>
            <CardActions
                sx={{
                    position: 'absolute',
                    bottom: { xs: 10, sm: 20 },
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 2,
                    zIndex: 1,
                }}
            >
                <Select
                    sx={{ maxWidth: 150 }}
                    placeholder="Theme.."
                    onChange={(_, value) => setSelectedTheme(value)}
                    required
                >
                    <Option value="red">Red</Option>
                    <Option value="cyan">Cyan</Option>
                    <Option value="purple">Purple</Option>
                </Select>
                <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                    onClick={handleCreateBanner}
                >
                    Create
                </Button>
            </CardActions>
            {error && (
                <Box
                    sx={{
                        color: 'red',
                        textAlign: 'center',
                        position: 'absolute',
                        bottom: 5,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        mb: '55px',
                    }}
                >
                    {error}
                </Box>
            )}
        </Card>
    )
}
