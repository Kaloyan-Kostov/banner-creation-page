import { BannerDto } from '../../services/dto/banner.dto.ts'
import { Button, Card, CardActions, CardOverflow, Grid, Skeleton, Typography } from '@mui/joy'
import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import { Delete } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Image from '../Image.tsx'
import BannerService from '../../services/banner.service.ts'
import { useState } from 'react'
import ConfirmModal from '../ConfirmModal.tsx'
import { themeColors } from '../../pages/banners/BannerForm.tsx'

export default function BannerCard(props: { banner?: BannerDto; delete?: () => void }) {
    const navigate = useNavigate()
    const [openConfirm, setOpenConfirm] = useState(false)

    const textData = {
        primaryText: props.banner?.primaryText || '',
        secondaryText: props.banner?.secondaryText || '',
    }

    const contentColorSetter = (imageUrl?: string): string | null => {
        if (!imageUrl) return null
        if (imageUrl.includes('red')) return 'red'
        if (imageUrl.includes('cyan')) return 'cyan'
        if (imageUrl.includes('purple')) return 'purple'
        return null
    }

    const theme = contentColorSetter(props.banner?.imageUrl)
    const textColor = theme ? themeColors[theme] : 'gray'

    const handleDeleteBanner = (id: string) => {
        BannerService.deleteBanner(id)
        props.delete?.()
    }

    return (
        <Grid>
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
                <CardOverflow sx={{ mt: 0.5 }}>
                    <Image url={props.banner?.imageUrl} />
                </CardOverflow>
                <Box
                    sx={{
                        position: 'absolute',
                        top: { xs: '65%', sm: '65%', md: '65%', lg: '65%' },
                        left: '65%',
                        transform: 'translate(-50%, -50%)',
                        color: '#fff',
                        zIndex: 1,
                        width: '80%',
                    }}
                >
                    <Typography
                        level="title-lg"
                        sx={{ wordWrap: 'break-word', color: '#fff' }}
                    >
                        <Skeleton
                            loading={!props.banner}
                            variant="text"
                        >
                            {textData.primaryText}
                        </Skeleton>
                    </Typography>
                    <Typography
                        level="body-sm"
                        sx={{
                            px: 7,
                            wordWrap: 'break-word',
                            fontSize: '0.8rem',
                            color: textColor,
                            fontStyle: 'oblique',
                        }}
                    >
                        <Skeleton
                            loading={!props.banner}
                            variant="text"
                        >
                            {textData.secondaryText}
                        </Skeleton>
                    </Typography>
                </Box>
                <CardActions>
                    <IconButton
                        variant="outlined"
                        color="danger"
                        size="sm"
                        sx={{ width: '20%', alignSelf: 'center' }}
                        onClick={() => setOpenConfirm(true)}
                    >
                        <Delete />
                    </IconButton>
                    <Button
                        variant="solid"
                        type="button"
                        size="md"
                        onClick={() => navigate({ pathname: `/banners/edit/${props.banner!.id}` })}
                        color="primary"
                        sx={{ width: '75%', alignSelf: 'center', fontWeight: 600 }}
                    >
                        Edit
                    </Button>
                </CardActions>
            </Card>
            <ConfirmModal
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                action="delete this banner"
                confirm={() => {
                    handleDeleteBanner(props.banner!.id!)
                    setOpenConfirm(false)
                }}
            />
        </Grid>
    )
}
