import { useState, useEffect } from 'react'
import { Card, Textarea, Select, Option, Button, Tooltip } from '@mui/joy'
import { usePageData } from '../../context/page-data/page-data.context'
import { CardActions } from '@mui/material'
import Box from '@mui/joy/Box'

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
                height: 'auto',
                maxWidth: 1400,
                mx: 'auto',
                pt: 10,
                px: 5,
                backgroundImage: selectedTheme ? `url(${themeBackgrounds[selectedTheme]})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background 0.3s ease-in-out',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 2, md: 35 },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    flexWrap: 'wrap',
                    mt: { xs: 2, md: 10 },
                }}
            >
                <Box sx={{ flex: 1, minWidth: 200 }}>
                    <Tooltip
                        title="Enter your brand name."
                        placement="right"
                    >
                        <Textarea
                            placeholder="Brand Name"
                            sx={{ width: { xs: '100%', md: 200 } }}
                        />
                    </Tooltip>
                    <Tooltip
                        title="Enter your slogan."
                        placement="right"
                    >
                        <Textarea
                            placeholder="Slogan"
                            sx={{ width: { xs: '100%', md: 200 }, mt: 1 }}
                        />
                    </Tooltip>
                </Box>

                <Box sx={{ flex: 1, minWidth: 200 }}>
                    <Tooltip
                        title="Enter your text here."
                        placement="right"
                    >
                        <Textarea
                            placeholder="Primary Text"
                            sx={{ width: { xs: '100%', md: 200 } }}
                        />
                    </Tooltip>
                    <Tooltip
                        title="Enter your other text here."
                        placement="right"
                    >
                        <Textarea
                            placeholder="Secondary Text"
                            sx={{ width: { xs: '100%', md: 200 }, mt: 1 }}
                        />
                    </Tooltip>
                </Box>
            </Box>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'flex-end', lg: 'space-between' },
                    mt: 3,
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
                    sx={{ maxWidth: '75%', fontWeight: 600 }}
                >
                    Create
                </Button>
            </CardActions>
        </Card>
    )
}
