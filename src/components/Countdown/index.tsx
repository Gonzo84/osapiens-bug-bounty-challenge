import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Countdown = () => {
  const [count, setCount] = useState(0);
  const hours = 1;
  const minutes = hours * 60;
  const seconds = minutes * 60;
  const countdown = seconds - count;
  const countdownMinutes = `${~~(countdown / 60)}`.padStart(2, "0");
  const countdownSeconds = (countdown % 60).toFixed(0).padStart(2, "0");

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(intervalRef);
  }, []);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Typography variant="h6" component="div" color="primary">
        {countdownMinutes}:{countdownSeconds}
      </Typography>
    </Box>
  );
};

export default Countdown;
