import { clerkClient } from "@clerk/express";

export const protectRoute = (req, res, next) => {
  const auth = req.auth();
  if (!auth.userId) {
    res.status(401).json({ message: "Unauthorized - You must be logged in." });
    return;
  }

  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const auth = req.auth();
    const currentUser = await clerkClient.users.getUser(auth.userId);
    const isAdmin = (process.env.ADMIN_EMAIL =
      currentUser.primaryEmailAddress?.emailAddress);

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized - You must be an admin" });
    }

    next();
  } catch (error) {
    // return res.status(500).json({ message: "Internal Server Error", error });
    next(error);
  }
};
