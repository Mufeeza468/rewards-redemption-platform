import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Pagination,
} from "@mui/material";
import { getRedemptions } from "../api/api";
import { useNavigate } from "react-router-dom";

const USER_ID = 4;
const itemsPerPage = 6;

export default function History() {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHistory() {
      const data = await getRedemptions(USER_ID);
      setHistory(data);
    }

    fetchHistory();
  }, []);

  const paginatedHistory = history.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container maxWidth="sm" sx={{ py: 10, display: "flex", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ width: "100%", p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Redemption History
        </Typography>

        {history.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No redemptions yet.
          </Typography>
        ) : (
          <>
            <List>
              {paginatedHistory.map((entry, idx) => (
                <Box key={idx}>
                  <ListItem>
                    <ListItemText
                      primary={entry.reward}
                      secondary={new Date(entry.redeemed_at).toLocaleString()}
                    />
                  </ListItem>
                  {idx < paginatedHistory.length - 1 && <Divider />}
                </Box>
              ))}
            </List>

            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={Math.ceil(history.length / itemsPerPage)}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          </>
        )}

        <Box mt={4} textAlign="center">
          <Button variant="outlined" onClick={() => navigate("/")}>
            ← Back to Dashboard
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
