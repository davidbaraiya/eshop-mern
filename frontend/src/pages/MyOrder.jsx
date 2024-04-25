import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../components/Breadcrumb";
import Heading from "../components/Heading";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { getOrderAction } from "../redux/actions/orderAction";
import Loading from "../components/Loader";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import IconButton from "@mui/material/IconButton";

const MyOrder = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderAction());
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return toast.error(error);
  }

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      flex: 0.5,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "text-green-700" : "text-red";
      },
    },
    {
      field: "itemsQty",
      headerName: "Quantity",
      type: "number",
      minWidth: 60,
      flex: 0.3,
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
      minWidth: 60,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/my-order/${params.id}`}>
            <IconButton aria-label="action">
              <LaunchIcon />
            </IconButton>
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        action: "action",
      });
    });

  return (
    <section className="pb bg-gray">
      <Breadcrumb currentPage={"my order"} />
      <div className="container">
        <Heading>
          <h2 title="true">My Order</h2>
        </Heading>
        <div className="bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            pageSizeOptions={[5]}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
        </div>
      </div>
    </section>
  );
};

export default MyOrder;
