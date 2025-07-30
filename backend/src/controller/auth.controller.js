import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    // const user = await User.findOne({ clerkId: id });

    // if (!user) {
    //   await User.create({
    //     clerkId: id,
    //     fullName: `${firstName} ${lastName}`,
    //     imageUrl,
    //   });
    // }

    await User.updateOne(
      { clerkId: id },
      {
        $set: {
          fullName: `${firstName || ""} ${lastName || ""}`.trim(),
          imageUrl,
        },
      },
      { upsert: true }
    );

    res.status(200).json({ sucess: true });
  } catch (error) {
    console.log(`Error while creating the user in auth callback`, error);
    next(error)
  }
}