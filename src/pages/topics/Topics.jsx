import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import SelectableCard from "../../components/card/Card";
import {
  useGetTopicsQuery,
  useAddTopicsMutation,
  useUpdateTopicsMutation,
} from "../../store/topicApi";
import { useGetUserTopicsQuery } from "../../store/usersApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Topics() {
  const [selectedCards, setSelectedCards] = useState([]);
  const { data: topics, error, isLoading, refetch } = useGetTopicsQuery();
  const {
    data: userTopic,
    userError,
    userIsLoading,
    refetch: userRefetch,
  } = useGetUserTopicsQuery();
  const [addTopics] = useAddTopicsMutation();
  const [updateTopics] = useUpdateTopicsMutation();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
    userRefetch();
    if (userTopic && topics) {
      const preSelectedIndexes = topics
        .map((topic, index) =>
          userTopic.topics.includes(topic.topic_code) ? index : null
        )
        .filter((index) => index !== null);
      setSelectedCards(preSelectedIndexes);
    }
  }, [userTopic, topics]);

  const handleSelectCard = (index) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const handleSubmit = async () => {
    try {
      const selectedCardDetails = selectedCards.map(
        (index) => topics[index].topic_code
      );
      console.log("Selected Cards:", selectedCardDetails);
      let response;
      if (!userIsLoading) {
        if (userTopic) {
          response = await updateTopics({ topics: selectedCardDetails });
          toast.success("Topics selected successfully!");
        } else {
          response = await addTopics({ topics: selectedCardDetails });
          toast.success("Topics selected successfully!");
        }
      }
      console.log(response);

      if (response) {
        navigate("/questions");
      }
    } catch (error) {
      toast.error("Error occurred while saving topics!");
      console.log(error);
    }
  };

  if (isLoading || userIsLoading) return <p>Loading...</p>;
  if (error || userError)
    return <p>Error fetching topics: {error?.message || userError?.message}</p>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={4}
      width="100%"
    >
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
        mb={4}
        width="100%"
      >
        {topics.map((topic, index) => (
          <SelectableCard
            key={index}
            title={topic.topic_name}
            description={topic.description}
            selected={selectedCards.includes(index)}
            onSelect={() => handleSelectCard(index)}
          />
        ))}
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={selectedCards.length === 0}
      >
        Submit Selected Cards
      </Button>
    </Box>
  );
}
