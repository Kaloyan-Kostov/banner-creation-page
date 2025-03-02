import { Card, Textarea, Select, Option, Button, Tooltip, CardOverflow } from '@mui/joy'
import { CardActions } from '@mui/material'
import Box from '@mui/joy/Box'
import Image from '../../components/Image'
import { themeBackgrounds } from '../../hooks/useBanner'

interface BannerFormProps {
    primaryText: string
    setPrimaryText: (value: string) => void
    secondaryText: string
    setSecondaryText: (value: string) => void
    selectedTheme: string | null
    setSelectedTheme: (value: string | null) => void
    error: string | null
    handleSubmit: () => void
    mode: 'create' | 'edit'
    handleCancel: () => void
}

export const themeColors: Record<string, string> = {
    red: '#FF3B30',
    cyan: '#32D3C5',
    purple: '#c32084',
}

export default function BannerForm({
    primaryText,
    setPrimaryText,
    secondaryText,
    setSecondaryText,
    selectedTheme,
    setSelectedTheme,
    error,
    handleSubmit,
    mode,
    handleCancel,
}: BannerFormProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 350,
                    height: 'auto',
                    minHeight: 400,
                    position: 'relative',
                    overflow: 'hidden',
                    textAlign: 'center',
                }}
            >
                {selectedTheme && (
                    <CardOverflow sx={{ mt: 0.5 }}>
                        <Image url={themeBackgrounds[selectedTheme]} />
                    </CardOverflow>
                )}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '65%',
                        left: '65%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        color: '#fff',
                        zIndex: 1,
                    }}
                >
                    <Tooltip
                        title="Here goes your UPPERCASE text."
                        placement="top"
                    >
                        <Textarea
                            placeholder="Primary Text"
                            sx={{
                                position: 'relative',
                                left: '25%',
                                width: '50%',
                                textAlign: 'center',
                            }}
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
                            sx={{
                                position: 'relative',
                                left: '25%',
                                width: '50%',
                                textAlign: 'center',
                                fontStyle: 'oblique',
                            }}
                            value={secondaryText}
                            onChange={(e) => setSecondaryText(e.target.value.slice(0, 100))}
                            required
                        />
                    </Tooltip>
                </Box>
                <CardActions sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Select
                        sx={{ maxWidth: 150 }}
                        placeholder="Theme.."
                        value={selectedTheme || ''}
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
                        onClick={handleSubmit}
                    >
                        {mode === 'create' ? 'Create' : 'Save'}
                    </Button>
                    <Button
                        variant="outlined"
                        color="danger"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </CardActions>
            </Card>
            {error && <Box sx={{ color: 'red', textAlign: 'center', mt: 1 }}>{error}</Box>}
        </Box>
    )
}
