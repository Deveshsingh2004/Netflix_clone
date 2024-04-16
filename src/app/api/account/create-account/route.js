import connectToDB from "@/database";
import Account from "@/models/Account";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const { name, pin, uid } = await req.json();

    const isAccountAlreadyExist = await Account.find({ uid, name });
    const allAccount = await Account.find({});
    if (isAccountAlreadyExist.length) {
      return NextResponse.json({
        success: false,
        message: "Please try with different name",
      });
    }
    if (allAccount && allAccount.length === 4) {
      return NextResponse.json({
        success: false,
        message: "You can max add 4 accounts",
      });
    }

    const hashPin = await hash(pin, 12);

    const newlyCreatedAccount = await Account.create({
      name,
      pin: hashPin,
      uid,
    });
    if (newlyCreatedAccount) {
      return NextResponse.json({
        success: true,
        message: "Account created succesfully!!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong unable to make the account!!!",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong while making the account",
    });
  }
}
