import mongoose from "mongoose";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey = crypto.createHash("sha256").update("my_secret_key").digest(); // Ensure 32-byte key

const encrypt = (text) => {
  const iv = crypto.randomBytes(16); // Generate a new IV for each encryption
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`; // Store IV with the encrypted text
};

const decrypt = (text) => {
  const [ivHex, encryptedHex] = text.split(":");
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivHex, "hex"));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedHex, "hex")), decipher.final()]);
  return decrypted.toString("utf8");
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

blogSchema.pre("save", function (next) {
  if (this.isModified("description")) {
    this.description = encrypt(this.description);
  }
  next();
});

blogSchema.post("find", function (docs) {
  docs.forEach((doc) => {
    if (doc.description) {
      doc.description = decrypt(doc.description);
    }
  });
});

blogSchema.post("findOne", function (doc) {
  if (doc && doc.description) {
    doc.description = decrypt(doc.description);
  }
});

const blogModel = mongoose.model("blogs", blogSchema);

export default blogModel;