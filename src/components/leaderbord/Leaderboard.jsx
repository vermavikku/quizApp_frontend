import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, useMediaQuery } from '@mui/material';

const Leaderboard = ({ leaderboardData }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={3} style={{ width: '90%', padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Leaderboard
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              {!isSmallScreen && <TableCell align="center"><strong>Email</strong></TableCell>}
              <TableCell align="center"><strong>Attempted Questions</strong></TableCell>
              <TableCell align="center"><strong>Correct Answers</strong></TableCell>
              <TableCell align="center"><strong>Wrong Answers</strong></TableCell>
              <TableCell align="center"><strong>Total Marks (Correct * 5)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((entry) => (
              <TableRow key={entry._id}>
                <TableCell>{entry.users.name}</TableCell>
                {!isSmallScreen && <TableCell align="center">{entry.users.email}</TableCell>}
                <TableCell align="center">{entry.attempted}</TableCell>
                <TableCell align="center">{entry.correct_answers}</TableCell>
                <TableCell align="center">{entry.wrong_answers}</TableCell>
                <TableCell align="center">{entry.correct_answers * 5}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Leaderboard;
