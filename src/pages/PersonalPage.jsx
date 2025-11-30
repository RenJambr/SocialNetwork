import { useParams } from "react-router";
import UserDataWrapper from "../user personal/UserDataWrapper";
import { useUserById } from "../authentication/useUserById";
import Posts from "../posts/PostsByUserId";
import Container from "../ui/Container";
import UserBorn from "../ui/UserBorn";
import { useEffect } from "react";
import { useGetFriends } from "../friendships/useGetFriends";
import SkeletonProfileLoader from "../ui/SkeletonProfileLoader";

function PersonalPage() {
  const { userId } = useParams();
  const { user, isLoading } = useUserById(userId);
  const { friends, isLoading: isLoadingFriends } = useGetFriends(userId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading || isLoadingFriends) return <SkeletonProfileLoader />;

  return (
    <div className="w-full">
      <UserDataWrapper user={user} friends={friends} />
      <div className="h-[1px] w-full bg-[#626569] mt-25"></div>
      <div className="flex">
        <div className="w-full">
          <Container customPadding="p-4">
            <Posts userId={userId} />
            <UserBorn user={user} />
          </Container>
        </div>
      </div>
    </div>
  );
}

export default PersonalPage;
