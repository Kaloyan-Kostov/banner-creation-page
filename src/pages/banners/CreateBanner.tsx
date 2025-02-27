import { useState, useEffect } from 'react'
import { Card, Textarea, Select, Option, Button, Tooltip } from '@mui/joy'
import { usePageData } from '../../context/page-data/page-data.context'
import { CardActions } from '@mui/material'
import Box from '@mui/joy/Box'
import Image from '../../components/Image'

const themeBackgrounds: Record<string, string> = {
    red: '/src/assets/red_left.png',
    cyan: '/src/assets/cyan_left.png',
    purple: '/src/assets/purple_left.png',
}

export default function CreateBanner() {
    const { setPageData } = usePageData()
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

    useEffect(() => {
        setPageData({ title: 'Create Banner' })
    }, [setPageData])

    return (
        <Card
            sx={{
                position: 'relative',
                height: { xs: 300, sm: 400, md: 500, lg: 600 },
                maxWidth: 1400,
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
                    top: { xs: '40%', sm: '50%' },
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    width: { xs: '85%', sm: '60%', md: '50%' },
                    zIndex: 1,
                }}
            >
                <Tooltip
                    title="This will be displayed in the middle of the background."
                    placement="top"
                >
                    <Textarea
                        placeholder="Primary Text"
                        sx={{ width: '100%' }}
                    />
                </Tooltip>
                <Tooltip
                    title="This will be displayed below the primary text."
                    placement="bottom"
                >
                    <Textarea
                        placeholder="Secondary Text"
                        sx={{ width: '100%' }}
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
                >
                    Create
                </Button>
            </CardActions>
        </Card>
    )
}
