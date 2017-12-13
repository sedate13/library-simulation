module.exports = {
  login: (req, res, next) => {
    const db = req.app.get("db");
    const { session } = req;
    const { username, password, id } = req.body;
    session.username = username;

    db
      .getUser(username, password)
      .then(userstwo => res.status(200).send(userstwo))
      .catch(() => res.status(500).send());
  },

  register: (req, res, next) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    req.session.username = req.username;
    console.log(req.body);
    // db.getUser([req.user.id]).then(res => {
    //   if (!res[0]) {
    db
      .createUser([username, password])
      .then(userstwo => res.status(200).send(userstwo))
      .catch(err => res.status(500).send(err));
  }
  // });

  //   signout: (req, res, next) => {
  //     req.session.destroy();
  //     res.status(200).send(req.session.user);
  //   }
  //   getUser: (req, res, next) => {
  //     res.status(200).send(req.session.user);
  //   }
};
