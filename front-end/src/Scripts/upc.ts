import ky from "ky";

export const getIngredientsUPC = (upc: string) => {
  return ky
    .post(
      "https://us-central1-calvinhacks20-gcp.cloudfunctions.net/upc_lookup",
      {
        body: JSON.stringify({ upc })
      }
    )
    .then(value =>
      value
        .text()
        .then(text => JSON.parse(text))
        .catch(err => {
          console.log(err);
          return null;
        })
    )
    .catch(err => {
      console.log(err);
      return null;
    });
};
