import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(400, "You can only update your account"));
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          passsword: req.body.passsword,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { passsword, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
