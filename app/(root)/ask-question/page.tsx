import Question from "@/components/forms/Question";
import { createUser, getUserById } from "@/lib/actions/user.action";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const askQuestion = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  let mongoUser = await getUserById({ userId });

  // If the user is authenticated in Clerk but doesn't have a MongoDB record yet
  // (e.g. the webhook failed), create their record on the fly.
  if (!mongoUser) {
    const clerkUser = await currentUser();
    if (!clerkUser) redirect("/sign-in");

    mongoUser = await createUser({
      clerkId: clerkUser.id,
      name: `${clerkUser.firstName}${clerkUser.lastName ? ` ${clerkUser.lastName}` : ""}`,
      username: clerkUser.username ?? clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
      picture: clerkUser.imageUrl,
    });
  }

  if (!mongoUser) redirect("/sign-in");

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default askQuestion;
