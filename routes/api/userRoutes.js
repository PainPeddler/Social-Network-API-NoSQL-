const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// GET & POST /api/users
router.route("/").get(getAllUsers).post(createUser);

// api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Add/delte friend
router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;