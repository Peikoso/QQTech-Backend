import admin from "firebase-admin";

import fs from "fs";
import path from "path";

const serviceAccountPath = path.resolve(
  "C:/Users/joaod/Desktop/qqtech9-backend/plantao-monitor-firebase-adminsdk.json"
);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export { admin };
