import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteProduct,
  getAdminProducts,
} from "../redux/actions/productAction";
import toast from "react-hot-toast";
import { DELETE_ADMIN_PRODUCTS_RESET } from "../redux/contants/productConstant";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { adminProductsLoading, adminProductsError, adminProducts } =
    useSelector((state) => state.adminProduct.allProducts);

  const { deleteProductLoading, deleteProductSuccess, deleteProductError } =
    useSelector((state) => state.adminProduct.deleteProduct);

  useEffect(() => {
    dispatch(getAdminProducts());
    if (deleteProductSuccess) {
      toast.success("product delete sucessfully");
      dispatch({ type: DELETE_ADMIN_PRODUCTS_RESET });
    }
  }, [deleteProductSuccess, dispatch]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 240,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 60,
      flex: 0.3,
      cellClassName: (params) => {
        return params.value === 0 ? "text-red font-bold" : "text-green-600";
      },
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 60,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 100,
      flex: 0.4,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/edit/${params.id}`}>
              <IconButton aria-label="action">
                <EditIcon className="text-blue-700" />
              </IconButton>
            </Link>
            <IconButton
              aria-label="action"
              onClick={() => dispatch(deleteProduct(params.id))}
            >
              <DeleteIcon className="text-red" />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = [];

  adminProducts &&
    adminProducts.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  if (adminProductsLoading) {
    return <Loader />;
  }
  if (deleteProductLoading) {
    return <Loader />;
  }
  if (adminProductsError) {
    toast.error(adminProductsError);
    dispatch({ type: DELETE_ADMIN_PRODUCTS_RESET });
  }

  return (
    <section className="admin-dashboard ">
      <div className="admin-products-view">
        <div className="flex gap-5 items-start">
          <Sidebar />
          <div className="main-dashbord">
            <h3 className="mb-5">Products</h3>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProducts;
