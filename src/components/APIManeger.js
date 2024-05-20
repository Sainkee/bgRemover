import axios from "axios";

const KEY = "1DLnANY7fvjpLAVnA2a6deh8";

export const removebg = async (formData) => {
  let Val;
  if (formData) {
    const dataeResponse = await axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: formData,
      responseType: "arraybuffer",
      headers: {
        "X-Api-Key": KEY,
      },
    });
    Val = dataeResponse.data;
  }
  return Val;
};
