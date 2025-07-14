import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from './AppContext'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
    const { products } = useAppContext()
    const { category } = useParams()

    const searchCategory = categories.find(
        (item) => item.path.toLowerCase() === category
    )

    const filteredProducts = products.filter(
        (product) => product.category.toLowerCase() === category
    )

    return (
        <div className='container mx-auto px-4 mb-16'>
            {searchCategory && (
                <div className='flex flex-col items-end w-max mt-6'>
                    <p className='text-xl font-semibold text-primary'>
                        {searchCategory.text.toUpperCase()}
                    </p>
                    <div className='w-16 h-0.5 bg-primary rounded-full'></div>
                </div>
            )}

            {filteredProducts.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className='flex items-center justify-center h-[60vh] text-gray-500 text-lg'>
                    No products found in this category.
                </div>
            )}
        </div>
    )
}

export default ProductCategory
