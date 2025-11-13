import admin from "firebase-admin";

import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const SERVICE_PATH = process.env.SERVICE_PATH;

const serviceAccountPath = path.resolve(
  SERVICE_PATH
);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export { admin };
