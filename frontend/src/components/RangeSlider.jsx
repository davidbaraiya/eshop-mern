import { Box, Slider } from "@mui/material";

const minDistance = 2000;

export default function RangeSlider({ priceRange, setPriceRange }) {
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceRange([
        Math.min(newValue[0], priceRange[1] - minDistance),
        priceRange[1],
      ]);
    } else {
      setPriceRange([
        priceRange[0],
        Math.max(newValue[1], priceRange[0] + minDistance),
      ]);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        value={priceRange}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        disableSwap
        min={20}
        max={50000}
        step={10}
        sx={{ color: "#28626c" }}
      />
    </Box>
  );
}
