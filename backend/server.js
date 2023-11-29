require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const {
  checkLogin,
  getUser,
  checkEmail,
  createUser,
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
  getEntriesWithSearch,
} = require("./db");

const jwt = require("jsonwebtoken");
const secretKey = process.env.BACKEND_TOKEN_SECRET;

function generateAccessToken(user) {
  return jwt.sign(user, secretKey, { expiresIn: "10m" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(accessToken, secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
}

const app = express();
const port = 5001;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const server = http.createServer(app);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const login = await checkLogin({ email: email, password: password });

  if (login.success) {
    const user = await getUser({ email: email });
    const accessToken = generateAccessToken(user);
    return res
      .header("Access-Control-Expose-Headers", "Authorization")
      .header("Authorization", "Bearer " + accessToken)
      .json({ success: true, user: user.user });
  } else {
    return res.send(login.message);
  }
});

app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const userExists = await checkEmail({ email: email });
    if (!userExists) {
      const user = await createUser({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });
      if (user.success) {
        return res.json(user).status(200);
      } else {
        return res.json({
          success: false,
          message: "User creation failed. Try again!",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "User already exists!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong!",
    });
  }
});

app.post("/createEntry", authenticateToken, async (req, res) => {
  const { title, description, username, password, url } = req.body;
  try {
    const newEntry = await createEntry({
      title: title,
      description: description,
      username: username,
      password: password,
      url: url,
      user_id: req.user._id,
    });
    if (newEntry.success) {
      return res.json(newEntry).status(200);
    } else {
      return res.json({
        success: false,
        message: "Entry creation failed. Try again!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong!",
    });
  }
});

app.get("/entries", authenticateToken, async (req, res) => {
  const { _id } = req.user;
  let { search } = req.query;
  try {
    let entries;
    if (!search) {
      entries = await getEntries({ user_id: _id });
    } else {
      entries = await getEntriesWithSearch({ user_id: _id, search: search });
    }
    if (entries.success) {
      return res.json(entries);
    } else {
      return res.json({
        success: false,
        message: "Error fetching entries. Try again!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong!",
    });
  }
});

app.get("/entries/:entry_id", async (req, res) => {
  const { entry_id } = req.params;
  const { _id } = req.user;
  try {
    const entry = await getEntry({ user_id: _id, entry_id: entry_id });
    if (entry.success) {
      return res.json(entry);
    } else {
      return res.json({
        success: false,
        message: "Error fetching entry. Try again!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong!",
    });
  }
});

app.put("/entries/:entry_id", authenticateToken, async (req, res) => {
  const { entry_id } = req.params;
  const { _id } = req.user;
  const { title, description, username, password, url } = req.body;
  let newEntry = {
    title: "",
    description: "",
    username: "",
    password: "",
    url: "",
    user_id: _id,
    entry_id: entry_id,
  };
  if (password) {
    newEntry.password = password;
  }
  if (title) {
    newEntry.title = title;
  }
  if (description) {
    newEntry.description = description;
  }
  if (username) {
    newEntry.username = username;
  }
  if (url) {
    newEntry.url = url;
  }
  try {
    const entry = await updateEntry(newEntry);
    if (entry.success) {
      return res.json(entry);
    } else {
      return res.json({
        success: false,
        message: "Error fetching entry. Try again!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong!",
    });
  }
});

app.post("/entries/delete", authenticateToken, async (req, res) => {
  const { entry_id } = req.body;
  const { _id } = req.user;
  try {
    const entry = await deleteEntry({
      entry_id: entry_id,
      user_id: _id,
    });
    if (entry.success) {
      return res.json({ success: true });
    } else {
      return res.json({
        success: false,
        message: "Error fetching entry. Try again!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong!",
    });
  }
});

server.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
});
