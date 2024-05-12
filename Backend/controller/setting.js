
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { password, Newpassword } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }
  //Validate
  if (!Newpassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  // check if old password matches password in DB
  const passwordIsCorrect = await bycrypt.compare(password, user.Newpassword);

  // Save new password
  if (user && passwordIsCorrect) {
    user.Newpassword = Newpassword;
    await user.save();
    res.status(200).send("Password change successful");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});