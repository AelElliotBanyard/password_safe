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
    return res.json(user).send();
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

app.post("/createEntry", async (req, res) => {
  const { title, description, username, password, url, user_id } = req.body;
  try {
    const newEntry = await createEntry({
      title: title,
      description: description,
      username: username,
      password: password,
      url: url,
      user_id: user_id,
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

app.get("/entries/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const entries = await getEntries({ user_id: user_id });
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

app.get("/entries/:user_id/:entry_id", async (req, res) => {
  const { user_id, entry_id } = req.params;
  try {
    const entry = await getEntry({ user_id: user_id, entry_id: entry_id });
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

app.put("/entries/:user_id/:entry_id", async (req, res) => {
  const { user_id, entry_id } = req.params;
  const { title, description, username, password, url } = req.body;
  let newEntry = {
    title: "",
    description: "",
    username: "",
    password: "",
    url: "",
    user_id: user_id,
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

app.delete("/entries/:user_id/:entry_id", async (req, res) => {
  const { user_id, entry_id } = req.params;
  try {
    const entry = await deleteEntry({
      entry_id: entry_id,
      user_id: user_id,
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
