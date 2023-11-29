require("dotenv").config();
const mongoose = require("mongoose");

const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.BACKEND_ENCRYPTION_KEY.toString(), "utf-8");
const iv = Buffer.from(process.env.BACKEND_ENCRYPTION_IV.toString(), "utf-8");

function encrypt(password) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedPassword = cipher.update(password, "utf-8", "hex");
  encryptedPassword += cipher.final("hex");
  return encryptedPassword;
}

function decrypt(encryptedPassword) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedPassword = decipher.update(encryptedPassword, "hex", "utf-8");
  decryptedPassword += decipher.final("utf-8");
  return decryptedPassword;
}

const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const databaseName = process.env.MONGO_INITDB_DATABASE;
const uri = process.env.MONGO_URI;
const port = process.env.MONGO_PORT;

mongoose.connect(
  `mongodb://${username}:${password}@${uri}:${port}/${databaseName}`
);

const entrySchema = new mongoose.Schema({
  title: String,
  description: String,
  username: String,
  password: String,
  url: String,
  created_ts: Date,
  updated_ts: Date,
  user_id: String,
});

const Entry = mongoose.model("Entry", entrySchema);

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  created_ts: Date,
  updated_ts: Date,
});

const User = mongoose.model("User", userSchema);

const createUser = async ({ firstname, lastname, email, password }) => {
  try {
    const passwordEncrypted = encrypt(password);

    const newUser = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: passwordEncrypted,
    });

    await newUser.save();

    return { success: true, user: newUser };
  } catch (error) {
    console.error(error);
    return { success: false, user: null };
  }
};

const checkLogin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email: email }).exec();
    if (user) {
      let decryptedPassword = decrypt(user.password);
      if (password === decryptedPassword) {
        return { success: true, message: "Everything Good!" };
      } else {
        return { success: false, message: "Password wrong!" };
      }
    } else {
      return { success: false, message: "User does not exist!" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong!" };
  }
};

const getUser = async ({ email }) => {
  try {
    const user = await User.findOne({ email: email }).exec();
    return { success: true, user: user };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

const checkEmail = async ({ email }) => {
  try {
    const user = await User.findOne({ email: email }).exec();
    if (user === null) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createEntry = async ({
  title,
  description,
  username,
  password,
  url,
  user_id,
}) => {
  try {
    let tempUrl = "";
    if (url) {
      tempUrl = url;
    }
    const encryptedPassword = encrypt(password);

    const newEntry = new Entry({
      title: title,
      description: description,
      username: username,
      password: encryptedPassword,
      url: tempUrl,
      created_ts: new Date(),
      updated_ts: new Date(),
      user_id: user_id,
    });

    await newEntry.save();

    return { success: true, entry: newEntry };
  } catch (error) {
    console.error(error);
    return { success: false, entry: null };
  }
};

const getEntries = async ({ user_id }) => {
  try {
    let tempEntries = [];
    const entries = await Entry.find({ user_id: user_id }).exec();
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const password = decrypt(entry.password);
      const tempEntry = {
        id: entry._id,
        title: entry.title,
        description: entry.description,
        username: entry.username,
        password: password,
        url: entry.url,
        created_ts: entry.created_ts,
        updated_ts: entry.updated_ts,
        user_id: entry.user_id,
      };
      tempEntries.push(tempEntry);
    }
    return { success: true, entries: tempEntries };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

const getEntriesWithSearch = async ({ user_id, search }) => {
  try {
    let tempEntries = [];
    const regex = new RegExp(search, "i");
    const entries = await Entry.find({
      user_id: user_id,
      title: { $regex: regex },
    }).exec();
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const password = decrypt(entry.password);
      const tempEntry = {
        id: entry._id,
        title: entry.title,
        description: entry.description,
        username: entry.username,
        password: password,
        url: entry.url,
        created_ts: entry.created_ts,
        updated_ts: entry.updated_ts,
        user_id: entry.user_id,
      };
      tempEntries.push(tempEntry);
    }
    return { success: true, entries: tempEntries };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

const getEntry = async ({ entry_id, user_id }) => {
  try {
    const entry = await Entry.findOne({
      _id: entry_id,
      user_id: user_id,
    }).exec();
    const password = decrypt(entry.password);
    return {
      success: true,
      entry: {
        id: entry._id,
        title: entry.title,
        description: entry.description,
        username: entry.username,
        password: password,
        url: entry.url,
        created_ts: entry.created_ts,
        updated_ts: entry.updated_ts,
        user_id: entry.user_id,
      },
    };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

const updateEntry = async ({
  entry_id,
  title,
  description,
  username,
  password,
  url,
  user_id,
}) => {
  try {
    const encryptedPassword = encrypt(password);

    const entry = await Entry.findOne({
      _id: entry_id,
      user_id: user_id,
    }).exec();
    if (title != "") {
      entry.title = title;
    }
    if (description != "") {
      entry.description = description;
    }
    if (username != "") {
      entry.username = username;
    }
    if (password != "") {
      entry.password = encryptedPassword;
    }
    if (url != "") {
      entry.url = url;
    }
    entry.updated_ts = new Date();

    await entry.save();

    return { success: true, entry: entry };
  } catch (error) {
    console.error(error);
    return { success: false, entry: null };
  }
};

const deleteEntry = async ({ entry_id, user_id }) => {
  try {
    const entry = await Entry.findById(entry_id).exec();
    if (entry === null) {
      return { success: false };
    }
    const deleteEntry = await Entry.findByIdAndDelete(entry_id).exec();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

module.exports = {
  createUser,
  checkLogin,
  checkEmail,
  getUser,
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
  getEntriesWithSearch,
};
