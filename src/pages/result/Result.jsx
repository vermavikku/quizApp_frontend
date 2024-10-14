import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useGetResultQuery, useDeleteResultMutation } from "../../store/resultApi";
import UserAnswers from '../../components/answer/Answer';
import { toast } from 'react-toastify';

export default function QuizResults({ onReset }) {
  const { data: result, error, isLoading } = useGetResultQuery();    
  const [deleteResult] = useDeleteResultMutation();

  const resetQuiz = async () => {
    try {
      const checkRes = window.confirm("Are you sure you want to reset the quiz?");
      if (checkRes) {
        await deleteResult().unwrap(); // Delete the result from backend
        toast.success("Quiz has been reset successfully!");
        onReset(); // Call the reset function passed from parent
      }
    } catch (error) {
      toast.error("Error resetting quiz. Please try again.");
      console.log(error.message);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching results: {error.message}</p>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4} p={8} width="100%" bgcolor="#f9f9f9" borderRadius={4} boxShadow={3}>
      <Box p={3} width="100%" bgcolor="#ffffff" boxShadow={2} borderRadius={2}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Quiz Results
        </Typography>

        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">{result.users.name}</Typography>
          <Typography variant="h6">{result.user_email}</Typography>
        </Grid>

        <Grid container justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Attended: {result.attempted}</Typography>
          <Typography variant="h6">Correct: {result.correct_answers}</Typography>
          <Typography variant="h6">Wrong: {result.wrong_answers}</Typography>
        </Grid>

        <Box mt={4} mb={2}>
          <Typography variant="h5" align="center" fontWeight="bold">
            Total Marks: {result.correct_answers * 5}
          </Typography>
        </Box>

        <Box align="center">
          <Button variant="contained" color="primary" onClick={resetQuiz} sx={{ mt: 2 }}>
            Retake Quiz
          </Button>
        </Box>
      </Box>

      {/* User Answers Section */}
      <Box mt={4} p={3} width="100%" bgcolor="#ffffff" boxShadow={2} borderRadius={4}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Your Answers
        </Typography>
        <UserAnswers finalAnswers={result.final_answers} />
      </Box>
    </Box>
  );
}
