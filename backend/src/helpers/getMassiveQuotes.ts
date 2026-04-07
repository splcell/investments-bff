import "dotenv/config";

const { ALT_API_KEY, ALT_BASE_URL } = process.env;

export const getMassiveQuotes = async (ticker: string) => {
  try {
    const response = await fetch(
      ALT_BASE_URL + `stable/profile?symbol=${ticker}&apikey=${ALT_API_KEY}`,
    );
    if(!response.ok){
      throw new Error("Something went wrong")
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error)
  }
};
