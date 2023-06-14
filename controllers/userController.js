const { Thought, User } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find()
      .populate("thoughts")
      .populate("friends")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate("thoughts")
      .populate("friends")
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with this ID" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with this ID" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with this ID" });
          return;
        }
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => res.json({ message: "User and associated thoughts deleted!" }))
      .catch((err) => res.status(400).json(err));
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with this ID" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with this ID" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;

