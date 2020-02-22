import * as functions from "firebase-functions";
import firebaseApp from "./firebaseConfig";

export const upc = functions.https.onRequest((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const requestBody = JSON.parse(request.body).upc;
  console.log(requestBody);
  const upcCode = requestBody.code as string;
  console.log(upcCode);
  if (upcCode) {
    const promise = firebaseApp
      .firestore()
      .collection("upc")
      .doc(upcCode)
      .get()
      .then(upcDoc => {
        const upcData = upcDoc.data();
        if (upcData) {
          const upcString = JSON.stringify(upcData);
          response.status(200).send(upcString);
          console.log(promise);
        } else {
          response.status(400).send(`No UPC Data found for ${requestBody}`);
        }
      });
  } else {
    response.status(400).send("No UPC Code Sent for Lookup");
  }
});
