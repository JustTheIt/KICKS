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
            <FaLeaf className="text-primary-sage text-xl" />
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number of Stocks
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productData.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-primary-sage">₹{product.price}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {product.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
                            setDeleteProduct(product);
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

        {openUploadProduct && (
          <UploadProduct
            close={() => setOpenUploadProduct(false)}
            fetchData={fetchProduct}
          />
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
