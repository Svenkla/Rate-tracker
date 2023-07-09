import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import UserTracker, {UserTrackerI} from "@/models/userTracker/UserTracker";

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email");
    try {
      await dbConnect();
      const user = await UserTracker.findOne({ email });
      return NextResponse.json({ status: 200, user });
    } catch (error) {
      return NextResponse.json({ status: 500, message: "error banana" });
    }
  }