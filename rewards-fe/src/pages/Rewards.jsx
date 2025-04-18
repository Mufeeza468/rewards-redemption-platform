import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import { getRewards, redeemReward, getUserPoints } from "../api/api";
import { useNavigate } from "react-router-dom";

const USER_ID = 4;
const itemsPerPage = 10;

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const [rewardsList, userData] = await Promise.all([
        getRewards(),
        getUserPoints(USER_ID),
      ]);
      setRewards(rewardsList);
      setPoints(userData.points);
    }

    fetchData();
  }, []);

  const handleRedeem = async (rewardId) => {
    const res = await redeemReward(USER_ID, rewardId);
    setMessage(res.message);
    setOpen(true);
    const updatedPoints = await getUserPoints(USER_ID);
    setPoints(updatedPoints.points);
  };

  const paginatedRewards = rewards.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Available Rewards
      </Typography>

      <Typography variant="subtitle1" align="center" gutterBottom>
        Your Points: <strong>{points}</strong>
      </Typography>

      <Box my={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRewards.map((reward) => (
                <TableRow key={reward.id}>
                  <TableCell>{reward.title}</TableCell>
                  <TableCell>{reward.description}</TableCell>
                  <TableCell>{reward.cost} pts</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleRedeem(reward.id)}
                    >
                      Redeem
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(rewards.length / itemsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>

      <Box textAlign="center" mt={4}>
        <Button variant="outlined" onClick={() => navigate("/")}>
          ← Back to Dashboard
        </Button>
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="info" onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
