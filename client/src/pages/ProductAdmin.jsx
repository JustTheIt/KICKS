import React, { useEffect, useState } from 'react';
import UploadProduct from './UploadProduct';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import EditProductAdmin from '../components/EditProductAdmin';
import CofirmBox from '../components/CofirmBox';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { FaLeaf } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";

const ProductAdmin = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    category: "",
    subcategory: "",
    quantity: "",
  });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState({
    _id: ""
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Calculate the current products to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = productData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(productData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: deleteProduct
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchProduct();
        setOpenConfirmBoxDelete(false);
        setDeleteProduct({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className='container mx-auto p-4'>
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-2'>
            <AiOutlineProduct className="text-primary-sage text-xl" />
            <h1 className='font-heading font-semibold text-xl text-text-primary'>Product Management</h1>
          </div>
          <button
            onClick={() => setOpenUploadProduct(true)}
            className='px-4 py-2 bg-primary-sage text-white rounded-lg font-medium hover:bg-primary-sage/90 transition-colors flex items-center gap-2'
          >
            <FiPlus size={18} />
            <span>Add Product</span>
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : productData.length === 0 ? (
          <NoData />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 table-auto w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number of Stocks
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...currentProducts]
                  .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
                  .map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded object-cover"
                              src={product.image?.[0] || '/placeholder-product.jpg'}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            {/* Render category name safely */}
                            <div className="text-xs text-gray-500">{product.category?.name || "No Category"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-primary-sage">₹{product.price}</span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.quantity}
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setOpenEdit(true);
                              setEditData(product);
                            }}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <HiPencil size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setOpenConfirmBoxDelete(true);
                              setDeleteProduct({ _id: product._id }); // Pass object with _id
                            }}
                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <MdDelete size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {productData.length > itemsPerPage && (
          <div className="flex justify-center mt-6">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(totalPages).keys()].map(page => (
                <button
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === page + 1 
                      ? 'z-10 bg-primary-sage text-white border-primary-sage' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}

        {/* Add Product Modal Overlay */}
        {openUploadProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setOpenUploadProduct(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                aria-label="Close"
              >
                &times;
              </button>
              <UploadProduct
                close={() => setOpenUploadProduct(false)}
                fetchData={fetchProduct}
              />
            </div>
          </div>
        )}

        {openEdit && (
          <EditProductAdmin
            data={editData}
            close={() => setOpenEdit(false)}
            fetchData={fetchProduct}
          />
        )}

        {openConfirmBoxDelete && (
          <CofirmBox
            title="Delete Product"
            message="Are you sure you want to delete this product? This action cannot be undone."
            confirm={handleDeleteProduct}
            cancel={() => setOpenConfirmBoxDelete(false)}
            close={() => setOpenConfirmBoxDelete(false)}
          />
        )}
      </div>
    </section>
  );
};

export default ProductAdmin;