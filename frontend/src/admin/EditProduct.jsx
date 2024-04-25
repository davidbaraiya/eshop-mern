import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components";
import {
  getSingleProduct,
  updateProduct,
} from "../redux/actions/productAction";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { UPDATE_ADMIN_PRODUCTS_RESET } from "../redux/contants/productConstant";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { singleProduct, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  const { updateProductLoading, updateProductError, updateProductSuccess } =
    useSelector((state) => state.adminProduct.updateProduct);

  const [productData, setProductData] = useState({
    name: singleProduct?.name,
    description: singleProduct?.description,
    price: singleProduct?.price,
    category: singleProduct?.category,
    stock: singleProduct?.stock,
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getSingleProduct(productId));
    if (updateProductSuccess) {
      toast.success("updated successfully");
      navigate("/admin/products");
    }
    dispatch({ type: UPDATE_ADMIN_PRODUCTS_RESET });
  }, [dispatch, navigate, productId, updateProductSuccess]);

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // handle change images
  const handleChangeImages = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // submit form
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", productData.name);
    myForm.set("price", productData.price);
    myForm.set("description", productData.description);
    myForm.set("category", productData.category);
    myForm.set("stock", productData.stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(myForm, productId));
  };

  if (loading) {
    return <Loader />;
  }

  // console.log(productId);

  return (
    <section className="admin-dashboard ">
      <div className="admin-products-view">
        <div className="flex gap-5 items-start">
          <Sidebar />
          <div className="main-dashbord">
            <h3 className="mb-5">Create Product</h3>
            <div className="max-w-[60%] mx-auto">
              <form
                onSubmit={updateProductSubmitHandler}
                encType="multipart/form-data"
                className="bg-white border border-slate-300 shadow-md py-7 px-5"
              >
                <div className="mb-3">
                  <label htmlFor="name" className="mr-2 text-theme">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={productData.name}
                    onChange={handleInputChange}
                    // onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="mr-2 text-theme">
                    description:
                  </label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={productData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="mr-2 text-theme">
                    category:
                  </label>
                  <select
                    name="category"
                    className="form-control"
                    onChange={handleInputChange}
                    value={productData.category}
                  >
                    <option value="">Choose Category</option>
                    {categories.map((cate) => (
                      <option key={cate} value={cate}>
                        {cate}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="mr-2 text-theme">
                    price:
                  </label>
                  <input
                    type="number"
                    name="price"
                    maxLength={6}
                    max={100000}
                    className="form-control"
                    value={productData.price}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor=" stock" className="mr-2 text-theme">
                    stock:
                  </label>
                  <input
                    type="number"
                    name="stock"
                    max={1000}
                    className="form-control"
                    value={productData.stock}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="images" className="mr-2 text-theme">
                    Images:
                  </label>
                  <div className="border-darkGray border p-2  mt-[0.5rem]">
                    <input
                      type="file"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={handleChangeImages}
                    />
                  </div>
                  <div className="flex items-center gap-2 my-4">
                    {images?.length > 0 ? (
                      <>
                        {images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt="Product Preview"
                            width={"45px"}
                            height={"45px"}
                          />
                        ))}
                      </>
                    ) : (
                      <>
                        {singleProduct?.images?.map(({ url, public_id }) => (
                          <img
                            key={public_id}
                            src={url}
                            alt="Product Preview"
                            width={"45px"}
                            height={"45px"}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div className="text-center ">
                  <Button
                    className="ml-auto w-full btn-fill"
                    disabled={updateProductLoading}
                  >
                    edit product
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
