import client from './client';

export const getFishByDate = async (date) => {
  try {
    const formattedDate = date.toISOString().split('T')[0];
    console.log('Requesting fish data for date:', formattedDate);
    const response = await client.get(`/api/v1/calendar/fish?date=${formattedDate}`);
    console.log('API Response:', JSON.stringify(response.data, null, 2));
    if (response.data.length > 0) {
      console.log('Sample fish data:', JSON.stringify(response.data[0], null, 2));
      console.log('Sample fish season:', JSON.stringify(response.data[0].fish_seasons[0], null, 2));
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching fish data:', error.response ? error.response.data : error.message);
    throw error;
  }
};