import { Grid } from '@mui/joy'
import InfiniteScroll from 'react-infinite-scroll-component'
import React, { useCallback, useEffect, useState } from 'react'
import { PageRequest } from '../services/dto/page.request.ts'
import { PageResponse } from '../services/dto/page.response.ts'

export default function ScrollableCards<T>(props: {
    loadMore: (page: PageRequest) => Promise<PageResponse<T> | undefined>
    mapCard: (value: T, deleteItem: (id: string) => void) => React.JSX.Element
    skeletonMap: (_: any, index: number) => React.JSX.Element
}) {
    const initial = [...Array(12)].map(props.skeletonMap)
    const [cards, setCards] = useState<React.JSX.Element[]>([])
    const [page, setPage] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const PAGE_SIZE = 12

    const deleteItem = useCallback((id: string) => {
        setCards((prevCardsState) => {
            const i = prevCardsState.findIndex((card) => card.key == id)
            if (i != -1) {
                const newCards = [...prevCardsState]
                newCards.splice(i, 1)
                return newCards
            }
            return prevCardsState
        })
    }, [])

    const loadBanners = useCallback(async () => {
        console.log('CURR PAGE: ' + Math.ceil(cards.length / PAGE_SIZE))
        const newCards = await props.loadMore({
            page: Math.ceil(cards.length / PAGE_SIZE),
            pageSize: PAGE_SIZE,
        })

        if (!newCards) {
            return
        }
        setPage(newCards.pageNumber)
        setHasMore(newCards.maxPageNumber > newCards.pageNumber + 1)
        const newElements = newCards.content.map((value) => props.mapCard(value, deleteItem))

        setCards((prevCards) => {
            const existingIds = new Set(prevCards.map((card) => card.key))
            const filteredNewElements = newElements.filter((card) => !existingIds.has(card.key))
            return [...prevCards, ...filteredNewElements]
        })
    }, [page, deleteItem, props])

    useEffect(() => {
        if (page != 0) {
            return
        }
        loadBanners().catch((reason) => console.error(reason))
    }, [])

    const loadMore = () => {
        loadBanners().catch((reason) => console.error(reason))
    }

    return (
        <Grid
            container
            spacing={2}
        >
            <InfiniteScroll
                dataLength={cards.length}
                next={loadMore}
                hasMore={hasMore}
                scrollableTarget="scroll"
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>There are no more items available...</b>
                    </p>
                }
            >
                {cards.length > 0 ? [...cards] : [...initial]}
            </InfiniteScroll>
        </Grid>
    )
}
