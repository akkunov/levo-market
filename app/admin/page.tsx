import { FiPlus } from 'react-icons/fi'
import Link from "next/link";


export default function AdminProductsPage() {

    return (
        <div className={`w-full h-full`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">All Products</h1>
                    <p className="text-sm text-gray-600">Home &gt; All Products</p>
                </div>
                <Link href={`/admin/products/create`} >
                    <button
                        className="flex items-center gap-2 bg-[#232321] hover:bg-[#232321]/90 text-white px-4 py-2 rounded-lg transition"
                    >
                        <FiPlus className="text-lg"/>
                        ADD NEW PRODUCT
                    </button>
                </Link>

            </div>


        </div>
    )
}
