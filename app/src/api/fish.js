import client from "./client";

export const getFishByDate = async (date) => {
  try {
    const formattedDate = date.toISOString().split("T")[0];
    const response = await client.get(
      `/api/v1/calendar/fish?date=${formattedDate}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching fish data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
