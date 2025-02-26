import { Card } from '@mui/joy'
import { usePageData } from '../../context/page-data/page-data.context'
import { useEffect } from 'react'

export default function CreateBanner() {
    const { setPageData } = usePageData()

    useEffect(() => {
        setPageData({ title: 'Create Banner' })
    }, [setPageData])

    return (
        <>
            <Card>My first banner</Card>
        </>
    )
}
