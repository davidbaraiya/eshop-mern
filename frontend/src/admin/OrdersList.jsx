import "./admin.css";
import Sidebar from "./Sidebar";
import { deleteOrderAction, getAllOrders } from "../redux/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { DELETE_ADMIN_PRODUCTS_RESET } from "../redux/contants/productConstant";

const OrderList = () => {
  const dispatch = useDispatch();
  const { allOrders, totalAmount, loading, error } = useSelector(
    (state) => state.adminOrders.allOrders
  );
  const { deleteOrder, deleteOrderError } = useSelector(
    (state) => state.adminOrders.deleteOrder
  );

  useEffect(() => {
    dispatch(getAllOrders());
    if (deleteOrder) {
      toast.success("order deleted successfully");
      dispatch({ type: DELETE_ADMIN_PRODUCTS_RESET });
    }
  }, [deleteOrder, dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 60,
      flex: 0.3,
      cellClassName: (params) => {
        return (
          (params.value === "delivered" ? "text-green-700" : "text-red") +
          " capitalize font-bold"
        );
      },
    },
    {
      field: "itemQuantity",
      headerName: "Item Quantity",
      type: "number",
      minWidth: 60,
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
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
            <Link to={`/admin/order/edit/${params.id}`}>
              <IconButton aria-label="action">
                <EditIcon className="text-blue-700" />
              </IconButton>
            </Link>
            <IconButton
              aria-label="action"
              onClick={() => dispatch(deleteOrderAction(params.id))}
            >
              <DeleteIcon className="text-red" />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = [];

  allOrders &&
    allOrders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemQuantity: item.orderItems.length,
        amount: item.totalPrice,
      });
    });

  if (deleteOrderError) {
    toast.error(deleteOrderError);
    dispatch({ type: DELETE_ADMIN_PRODUCTS_RESET });
  }

  return (
    <section className="admin-dashboard ">
      <div className="admin-orders-view">
        <div className="flex gap-5 items-start">
          <Sidebar />
          <div className="main-dashbord">
            <h3 className="mb-5">Orders</h3>
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

export default OrderList;
