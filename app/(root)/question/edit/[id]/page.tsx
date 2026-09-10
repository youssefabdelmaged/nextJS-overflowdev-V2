import Question from "@/components/forms/Question";
import { getQuestionsById } from "@/lib/actions/question.action";
import { createUser, getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth, currentUser } from "@clerk/nextjs/server";

const EditQuestion = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  let mongoUser = await getUserById({ userId });

  if (!mongoUser) {
    const clerkUser = await currentUser();
    if (clerkUser) {
      mongoUser = await createUser({
        clerkId: clerkUser.id,
        name: `${clerkUser.firstName}${clerkUser.lastName ? ` ${clerkUser.lastName}` : ""}`,
        username: clerkUser.username ?? clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        picture: clerkUser.imageUrl,
      });
    }
  }

  if (!mongoUser) return null;

  const result = await getQuestionsById({ questionId: params.id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={JSON.stringify(mongoUser._id)}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default EditQuestion;
