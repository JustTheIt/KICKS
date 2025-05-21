import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import noDataImage from '../assets/nothing here yet.webp'

const SearchPage = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const searchText = searchParams.get('q') || ''
    const loadingArrayCard = new Array(10).fill(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProduct,
                data: {
                    search: searchText,
                    page: page,
                    limit: 10
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                if (page === 1) {
                    setData(responseData.data)
                } else {
                    setData(prev => [...prev, ...responseData.data])
                }
                setTotalPage(responseData.totalNoPage)
                setHasMore(page < responseData.totalNoPage)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setPage(1)
        setData([])
        setHasMore(true)
        fetchData()
    }, [searchText])

    useEffect(() => {
        if (page > 1) {
            fetchData()
        }
    }, [page])

    const handleFetchMore = () => {
        if (hasMore && !loading) {
            setPage(prev => prev + 1)
        }
    }

    return (
        <section className='bg-white'>
            <div className='container mx-auto p-4'>
                <p className='font-semibold'>Search Results: {data.length}</p>

                <InfiniteScroll
                    dataLength={data.length}
                    next={handleFetchMore}
                    hasMore={hasMore}
                    loader={<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>
                        {loadingArrayCard.map((_, index) => (
                            <CardLoading key={`loadingsearchpage${index}`} />
                        ))}
                    </div>}
                >
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>
                        {data.map((product, index) => (
                            <CardProduct 
                                data={product} 
                                key={product._id + "searchProduct" + index}
                            />
                        ))}
                    </div>
                </InfiniteScroll>

                {!data[0] && !loading && (
                    <div className='flex flex-col justify-center items-center w-full mx-auto'>
                        <img
                            src={noDataImage}
                            className='w-full h-full max-w-xs max-h-xs block'
                            alt="No results found"
                        />
                        <p className='font-semibold my-2'>No products found</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default SearchPage
