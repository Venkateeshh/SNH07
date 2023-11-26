import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockSalary } from "../../data/mockData";
import Header from "../../components/Header";

const Salaries = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
    },
    {
      field: "grossSalary",
      headerName: "Gross Salary",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ₹{params.row.grossSalary}
        </Typography>
      ),
    },
    {
      field: "taxes",
      headerName: "Taxes",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ₹{params.row.taxes}
        </Typography>
      ),
    },{
      field: "netSalary",
      headerName: "Net Salary",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ₹{params.row.netSalary}
        </Typography>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Salaries" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockSalary} columns={columns} />
      </Box>
    </Box>
  );
};

export default Salaries;
