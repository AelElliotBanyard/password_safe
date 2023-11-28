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
} = require("./db");

const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "10m" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
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
    const token = generateAccessToken(user);
    return res.json(token).send();
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
        return res.json(user).status(200).send();
      } else {
        return res
          .json({
            success: false,
            message: "User creation failed. Try again!",
          })
          .send();
      }
    } else {
      return res
        .json({
          success: false,
          message: "User already exists!",
        })
        .send();
    }
  } catch (error) {
    console.log(error);
    return res
      .json({
        success: false,
        message: "Something went wrong!",
      })
      .send();
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
      return res.json(newEntry).status(200).send();
    } else {
      return res
        .json({
          success: false,
          message: "Entry creation failed. Try again!",
        })
        .send();
    }
  } catch (error) {
    console.log(error);
    return res
      .json({
        success: false,
        message: "Something went wrong!",
      })
      .send();
  }
});

app.get("/entries", authenticateToken, async (req, res) => {
  const { _id } = req.user;
  try {
    const entries = await getEntries({ user_id: _id });
    if (entries.success) {
      return res.json(entries).send();
    } else {
      return res
        .json({
          success: false,
          message: "Error fetching entries. Try again!",
        })
        .send();
    }
  } catch (error) {
    console.log(error);
    return res
      .json({
        success: false,
        message: "Something went wrong!",
      })
      .send();
  }
});

app.get("/entries/:entry_id", async (req, res) => {
  const { entry_id } = req.params;
  const { _id } = req.user;
  try {
    const entry = await getEntry({ user_id: _id, entry_id: entry_id });
    if (entry.success) {
      return res.json(entry).send();
    } else {
      return res
        .json({
          success: false,
          message: "Error fetching entry. Try again!",
        })
        .send();
    }
  } catch (error) {
    console.log(error);
    return res
      .json({
        success: false,
        message: "Something went wrong!",
      })
      .send();
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
      return res.json(entry).send();
    } else {
      return res
        .json({
          success: false,
          message: "Error fetching entry. Try again!",
        })
        .send();
    }
  } catch (error) {
    console.log(error);
    return res
      .json({
        success: false,
        message: "Something went wrong!",
      })
      .send();
  }
});

app.delete("/entries/:entry_id", authenticateToken, async (req, res) => {
  const { entry_id } = req.params;
  const { _id } = req.user;
  try {
    const entry = await deleteEntry({
      entry_id: entry_id,
      user_id: _id,
    });
    if (entry.success) {
      return res.json({ success: true }).send();
    } else {
      return res
        .json({
          success: false,
          message: "Error fetching entry. Try again!",
        })
        .send();
    }
  } catch (error) {
    console.log(error);
    return res
      .json({
        success: false,
        message: "Something went wrong!",
      })
      .send();
  }
});

server.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
});
