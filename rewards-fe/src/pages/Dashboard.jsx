import { useEffect, useState } from "react";
import { getUserPoints } from "../api/api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Stack,
} from "@mui/material";

const USER_ID = 4;

export default function Dashboard() {
  const [points, setPoints] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPoints() {
      const data = await getUserPoints(USER_ID);
      setPoints(data.points);
    }

    fetchPoints();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 10, display: "flex", justifyContent: "center" }}>
      <Paper elevation={4} sx={{ p: 5, textAlign: "center", width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Rewards Dashboard
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Your Points: <strong>{points}</strong>
        </Typography>

        <Stack spacing={2} direction="column">
          <Button variant="contained" onClick={() => navigate("/rewards")}>
            View Rewards
          </Button>
          <Button variant="outlined" onClick={() => navigate("/history")}>
            Redemption History
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
