import "./admin.css";
import Sidebar from "./Sidebar";
import { deleteOrderAction } from "../redux/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

import { DELETE_PRODUCT_REVIEW_RESET } from "../redux/contants/productConstant";
import { Button } from "../components";
import { deleteReview, getAllReviews } from "../redux/actions/productAction";

const ReviewsList = () => {
  const dispatch = useDispatch();
  const { adminReviewsLoading, adminReviews, adminReviewsError } = useSelector(
    (state) => state.adminReview.adminReviews
  );
  const [productId, setproductId] = useState("");

  const { deleteReviewLoading, deleteReviewStatus, deleteReviewError } =
    useSelector((state) => state.adminReview.deleteReview);

  useEffect(() => {
    if (deleteReviewStatus) {
      toast.success("review deleted successfully");
      dispatch({ type: DELETE_PRODUCT_REVIEW_RESET });
    }
  }, [deleteReviewStatus, dispatch]);

  const getReviewsHandler = (e) => {
    e.preventDefault();
    if (productId.trim() !== "") {
      dispatch(getAllReviews(productId));
    } else {
      toast.error("please enter a product id");
    }
  };

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 100, flex: 1 },
    {
      field: "user",
      headerName: "User",
      minWidth: 100,
      flex: 0.8,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 60,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 60,
      flex: 0.4,
      sortable: false,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="action"
            onClick={() => {
              dispatch(deleteReview(params.id, productId));
              dispatch(getAllReviews(productId));
            }}
          >
            <DeleteIcon className="text-red" />
          </IconButton>
        );
      },
    },
  ];

  const rows = [];

  adminReviews &&
    adminReviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        rating: item.rating,
        comment: item.comment,
      });
    });

  if (adminReviewsLoading || deleteReviewLoading) {
    return <Loader />;
  }

  if (deleteReviewError || adminReviewsError) {
    toast.error(deleteReviewError || adminReviewsError);
    dispatch({ type: DELETE_PRODUCT_REVIEW_RESET });
  }

  return (
    <section className="admin-dashboard ">
      <div className="admin-orders-view">
        <div className="flex gap-5 items-start">
          <Sidebar />
          <div className="main-dashbord">
            <h3 className="mb-5">All Reviews</h3>
            <div className="w-[40%]  mx-auto mb-8">
              <form
                action=""
                onSubmit={getReviewsHandler}
                className="flex gap-5  py-4"
              >
                <input
                  type="text"
                  placeholder="Reviews ID"
                  className="form-control !mt-0 "
                  value={productId}
                  onChange={(e) => setproductId(e.target.value)}
                />
                <Button type="submit">Search</Button>
              </form>
            </div>
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

export default ReviewsList;
