import Profile from "@/components/forms/Profile";
import { createUser, getUserById } from "@/lib/actions/user.action";
import { auth, currentUser } from "@clerk/nextjs/server";

const EditProfile = async () => {
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

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        <Profile user={JSON.stringify(mongoUser)} clerkId={userId} />
      </div>
    </>
  );
};

export default EditProfile;
