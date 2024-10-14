import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function UserAnswers({ finalAnswers }) {
  return (
    <Box mt={4}>
      {finalAnswers.map((answer) => (
        <Paper
          key={answer.question_id}
          elevation={3}
          sx={{
            padding: 2,
            marginBottom: 2,
            backgroundColor: answer.result ? '#c8e6c9' : '#ffcdd2', // Green for correct, red for wrong
          }}
        >
          <Typography variant="h6">{answer.question}</Typography>
          <Typography variant="body1" fontWeight="bold">
            Your Answer: <span style={{ color: answer.result ? 'green' : 'red' }}>{answer.user_answer}</span>
          </Typography>
          <Typography variant="body1">
            Correct Answer: {answer.correct_answer}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
