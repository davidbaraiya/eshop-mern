import { Pagination as PaginationComponent } from "@mui/material";
import Stack from "@mui/material/Stack";

function Pagination({ page, count, handleChange }) {
  return (
    <div className="flex justify-center">
      <Stack spacing={2} className="mt-8">
        <PaginationComponent
          count={count}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}

export default Pagination;
