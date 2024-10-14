import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { useGetQuestionsQuery } from "../../store/questionApi";
import { useAddResultMutation } from "../../store/resultApi";
import { useGetResultQuery } from "../../store/resultApi";
import QuizResults from "../result/Result";
import { toast } from "react-toastify";

export default function QuizPage() {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: questions, error, isLoading, refetch } = useGetQuestionsQuery();
  const {
    data: result,
    isLoading: resultLoading,
    refetch: resultRefetch,
  } = useGetResultQuery();
  const [addResult] = useAddResultMutation();

  useEffect(() => {
    refetch();
    resultRefetch();
    if (result) {
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
    }
  }, [result]);

  if (isLoading || resultLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching topics: {error.message}</p>;

  const handleOptionChange = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formattedAnswers = Object.keys(answers).map((questionId) => ({
        question_id: questionId,
        user_answer: answers[questionId],
      }));

      const response = await addResult(formattedAnswers).unwrap();

      if (response) {
        toast.success("Your answers have been successfully submitted!");
        setIsSubmitted(true);
      }
    } catch (error) {
      toast.error("Error submitting your answers. Please try again.");
      console.log(error);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {isSubmitted ? (
        <QuizResults onReset={handleReset} />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          m={2}
          alignItems="center"
          width="100%"
          maxWidth="600px"
          p={4}
          boxShadow={3}
          borderRadius={2}
        >
          {questions.map((question) => (
            <Box key={question._id} mb={4} width="100%">
              <Typography variant="h6" gutterBottom>
                {question.question}
              </Typography>
              <RadioGroup
                name={`question-${question._id}`}
                value={answers[question._id] || ""}
                onChange={(e) =>
                  handleOptionChange(question._id, e.target.value)
                }
              >
                {question.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </Box>
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== questions.length}
          >
            Submit Answers
          </Button>
        </Box>
      )}
    </Box>
  );
}
