import React, { useEffect } from "react";
import { useGetAllResultQuery } from "../../store/resultApi";
import Leaderboard from "../../components/leaderbord/Leaderboard";
export default function LeaderboardPage() {
  const {
    data: leaderboardData,
    error,
    isLoading,
    refetch,
  } = useGetAllResultQuery();

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching topics: {error.message}</p>;

  return <Leaderboard leaderboardData={leaderboardData} />;
}
