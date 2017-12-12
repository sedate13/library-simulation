module.exports = {
  login: (req, res, next) => {
    const { session } = req;
    const { username, password } = req.body;

    const user = users.find(
      user => user.username === username && user.password === password
    );

    if (user) {
      session.user.username = user.username;
      res.status(200).send(session.user);
    } else {
      res.status(500).send("Unauthorized.");
    }
  },

  register: (req, res, next) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    db
      .createUser({
        username,
        password
      })
      .then(userstwo => res.status(200).send(userstwo.username))
      .catch(err => res.status(500).send(err));
    // users.push({ id, username, password });
    // id++;
    // req.session.username = req.username;
    // res.status(200).send(req.session.user);
  },
  signout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send(req.session.user);
  },
  getUser: (req, res, next) => {
    res.status(200).send(req.session.user);
  }
};
