import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { empoloyeesTableMock } from '@shared/mocks/EmployeesTable.mocks';

export const EmployeesTable = (): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '245px', height: 'calc(100vh - 64px)' }}>
      <Typography variant="h4" sx={{ padding: '10px 0' }}>
        Employees
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          maxHeight: '80vh',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Date of employment</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Nationality</TableCell>
              <TableCell align="right">Date of contract termination</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empoloyeesTableMock.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.dateOfEmployment}</TableCell>
                <TableCell align="right">{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.nationality}</TableCell>
                <TableCell align="right">{row.dateOfContractTermination}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
