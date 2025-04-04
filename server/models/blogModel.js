import mongoose from "mongoose";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey = crypto.createHash("sha256").update("my_secret_key").digest(); // Ensure 32-byte key

const encrypt = (text) => {
  const iv = crypto.randomBytes(16); // Generate a new IV for each encryption
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`; // Store IV with the encrypted text
};

const decrypt = (text) => {
  const [ivHex, encryptedText] = text.split(":");
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivHex, "hex"));
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

blogSchema.pre("save", function (next) {
  if (this.isModified("description")) this.description = encrypt(this.description);
  next();
});

blogSchema.post("find", function (docs) {
  docs.forEach((doc) => {
    if (doc.description) doc.description = decrypt(doc.description);
  });
});

blogSchema.post("findOne", function (doc) {
  if (doc && doc.description) {
    doc.description = decrypt(doc.description);
  }
});

const blogModel = mongoose.model("blogs", blogSchema);

export default blogModel;