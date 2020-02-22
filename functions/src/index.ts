import * as functions from "firebase-functions";
import { upc } from "./upc";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.send("Hello from Firebase!");
});

export const upc_lookup = upc;
