const { Thought, User } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with this ID" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userID },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with this ID" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID" });
          return;
        }
        return User.findOneAndUpdate(
          { _id: req.body.userID },
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(() => res.json({ message: "Thought deleted successfully" }))
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    const {thoughtId, reactionId} = req.params;
  
    Thought.findOneAndUpdate(
      {_id: thoughtId},
      {$pull: {reactions: {_id: reactionId}} },
      {new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({message: 'No thought found with this ID'});
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;

