import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components";
import dummyAvatar from "../assets/images/dummy-user.png";
import { createProduct } from "../redux/actions/productAction";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { CREATE_ADMIN_PRODUCTS_RESET } from "../redux/contants/productConstant";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { createProductLoading, createProductError, createProductSuccess } =
    useSelector((state) => state.adminProduct.createProduct);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 200,
    category: "",
    stock: 0,
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (createProductSuccess) {
      toast.success("product created successfully");
    }
    dispatch({ type: CREATE_ADMIN_PRODUCTS_RESET });
    setProductData({
      name: "",
      description: "",
      price: 200,
      category: "",
      stock: 0,
    });
    setImages([]);
  }, [createProductSuccess, dispatch]);

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
  const createProductSubmitHandler = (e) => {
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
    dispatch(createProduct(myForm));
  };

  if (createProductLoading) {
    return <Loader />;
  }

  if (createProductError) {
    return toast.error(createProductError);
  }

  return (
    <section className="admin-dashboard ">
      <div className="admin-products-view">
        <div className="flex gap-5 items-start">
          <Sidebar />
          <div className="main-dashbord">
            <h3 className="mb-5">Create Product</h3>
            <div className="max-w-[60%] mx-auto">
              <form
                onSubmit={createProductSubmitHandler}
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
                    className="form-control "
                    onChange={handleInputChange}
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
                      <img
                        src={dummyAvatar}
                        alt="images"
                        width={"45px"}
                        height={"45px"}
                      />
                    )}
                  </div>
                </div>

                <div className="text-center ">
                  <Button className="ml-auto w-full btn-fill">
                    create product
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

export default CreateProduct;
