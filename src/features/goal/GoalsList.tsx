import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Typography,
  Chip,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Avatar,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterListIcon from "@mui/icons-material/FilterList";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { goalApi } from "../../services/api";

// Define goal interface
interface Goal {
  id: number;
  goal_title: string;
  description: string;
  goal_type: string;
  priority: string;
  category: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

// Priority colors
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "success";
    default:
      return "default";
  }
};

// Goal type colors
const getGoalTypeColor = (goalType: string) => {
  switch (goalType) {
    case "daily":
      return "primary";
    case "weekly":
      return "secondary";
    case "monthly":
      return "info";
    default:
      return "default";
  }
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

function GoalsList() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  
  // Search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [goalTypeFilter, setGoalTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Sample data for now (replace with API call later)
  // const sampleGoals: Goal[] = [];

  // Load goals data
  const loadGoals = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      
      // Check if token exists (but don't redirect here)
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError("You must be logged in to view goals. Please login first.");
        setLoading(false);
        return;
      }
      
      // Call the actual API
      console.log('📡 Fetching goals from API...');
      
      const params: { [key: string]: string | number | boolean } = {
        page: page + 1,
        per_page: rowsPerPage,
      };
      
      if (searchTerm) params.search = searchTerm;
      if (priorityFilter) params.priority = priorityFilter;
      if (goalTypeFilter) params.goal_type = goalTypeFilter;
      if (statusFilter) params.status = statusFilter === "completed" ? true : false;
      
      const response = await goalApi.getGoals(params);
      
      console.log('✅ Goals API Response:...............>>>>>>>>>>>>>>>', response.data);
      
      // Handle different response structures
      if (response.data.goals) {
        // If response has goals array
        setGoals(response.data.goals);
        setTotalCount(response.data.total || response.data.goals.length);
      } else if (Array.isArray(response.data)) {
        // If response is direct array
        setGoals(response.data);
        setTotalCount(response.data.length);
      } else {
        // Handle other structures
        setGoals([]);
        setTotalCount(0);
      }
      
    } catch (error: unknown) {
      console.error("❌ Failed to load goals:", error);
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
        
        if (axiosError.response?.status === 404) {
          setGoals([]);
          setTotalCount(0);
          setError("No goals found. Create your first goal!");
        } else if (axiosError.response?.status === 401) {
          setError("Unauthorized. Please login again.");
          // Don't redirect here - let the route protection handle it
        } else if (axiosError.response?.data?.message) {
          setError(axiosError.response.data.message);
        } else {
          setError("Failed to load goals. Please try again.");
        }
      } else {
        setError("Failed to load goals. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchTerm, priorityFilter, goalTypeFilter, statusFilter]);

  useEffect(() => {
    loadGoals();
  }, [loadGoals]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriorityFilter("");
    setGoalTypeFilter("");
    setStatusFilter("");
    setPage(0);
  };

  const handleEdit = (goalId: number) => {
    console.log("Edit goal:", goalId);
    // TODO: Navigate to edit page or open edit modal
  };

  const handleDelete = (goalId: number) => {
    console.log("Delete goal:", goalId);
    // TODO: Show confirmation dialog and delete goal
  };

  const handleView = (goalId: number) => {
    console.log("View goal:", goalId);
    // TODO: Navigate to goal details page or open details modal
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ mb: 3 }}>
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <ListAltIcon />
        </Avatar>
        <Typography component="h1" variant="h4" gutterBottom>
          Goals List
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          Track and manage all your goals in one place
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search goals..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priorityFilter}
                  label="Priority"
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={goalTypeFilter}
                  label="Type"
                  onChange={(e) => setGoalTypeFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <Box display="flex" gap={1}>
                <Tooltip title="Clear Filters">
                  <IconButton onClick={clearFilters} color="primary">
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Goals Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Goal Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Loading goals...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ color: "error.main" }}>
                    {error}
                  </TableCell>
                </TableRow>
              ) : goals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No goals found. Create your first goal!
                  </TableCell>
                </TableRow>
              ) : (
                goals
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((goal) => (
                    <TableRow key={goal.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {goal.goal_title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {goal.description}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{goal.category}</TableCell>
                      <TableCell>
                        <Chip
                          label={goal.goal_type}
                          color={getGoalTypeColor(goal.goal_type)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={goal.priority}
                          color={getPriorityColor(goal.priority)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{formatDate(goal.start_date)}</TableCell>
                      <TableCell>{formatDate(goal.end_date)}</TableCell>
                      <TableCell>
                        <Chip
                          label={goal.is_completed ? "Completed" : "Active"}
                          color={goal.is_completed ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => handleView(goal.id)}
                              color="primary"
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Goal">
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(goal.id)}
                              color="primary"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Goal">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(goal.id)}
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default GoalsList;