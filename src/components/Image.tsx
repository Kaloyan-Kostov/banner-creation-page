import { Skeleton } from '@mui/joy'
import { useEffect, useState } from 'react'
import Box from '@mui/joy/Box'
import ImageService from '../services/image.service.ts'

export default function Image(props: { url?: string }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [imageSrc, setImageSrc] = useState<string>()

    useEffect(() => {
        if (props.url) {
            ImageService.fetchImage(props.url).then((value) => {
                if (value) {
                    setImageSrc(value)
                    setIsLoaded(true)
                }
            })
        }
    }, [props.url])

    useEffect(() => {
        if (imageSrc) {
            return () => URL.revokeObjectURL(imageSrc)
        }
    }, [imageSrc])

    return (
        <Box sx={{ width: 300, height: 500, position: 'relative' }}>
            <Skeleton
                loading={!isLoaded}
                variant="overlay"
            >
                <img
                    src={imageSrc}
                    srcSet={`${imageSrc} 2x`}
                    style={{
                        ...(isLoaded ? {} : { visibility: 'hidden' }),
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                    }}
                    alt="Banner"
                    onLoad={() => setIsLoaded(true)}
                />
            </Skeleton>
        </Box>
    )
}
