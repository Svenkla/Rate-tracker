import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import UserTracker from "@/models/userTracker/UserTracker";

export async function POST(req: NextRequest) {
  const { email, works } = await req.json();

  try {
    await dbConnect();
    const user = await UserTracker.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" });

    /*  KOMANDA   */
    user.works.push(...works);

    const newUserTracker = new UserTracker(user);
    await newUserTracker.save();

    if (user) {
      return NextResponse.json({ status: 200, user });
    } else {
      return NextResponse.json({ status: 404, message: "User not found!" });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
