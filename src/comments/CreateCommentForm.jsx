import { HiOutlinePaperAirplane } from "react-icons/hi2";
import ButtonGroup from "../ui/ButtonGroup";
import { useUser } from "../authentication/useUser";
import { useCreateComment } from "./useCreateComment";
import { useForm } from "react-hook-form";
import SpinnerMini from "../ui/SpinnerMini";
import UserAvatar from "../ui/UserAvatar";

function CreateCommentForm({ postid, post_userid }) {
  const { userid, user } = useUser();
  const { createComment, isLoading } = useCreateComment();
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    const likes = {
      usersIds: [],
      //getter function to automatically get the number of likes
      get length() {
        return this.usersIds.length;
      },
    };
    const { content } = data;

    if (content.trim() === "") {
      reset();
      return;
    }

    createComment(
      {
        userid,
        content,
        likes,
        postid,
        made_action_userid: userid,
        notification_userid: post_userid,
      },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  if (isLoading) return <SpinnerMini />;

  return (
    <div className="w-full relative p-3">
      <form className="w-full flex" onSubmit={handleSubmit(onSubmit)}>
        <UserAvatar image={user.profileImage} />
        <input
          {...register("content")}
          type="text"
          className=" text-white ms-1.5  placeholder-white rounded-lg outline-0 p-2 w-full bg-[#6A7282] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          id="comment"
          placeholder="Comment..."
        />
        <ButtonGroup
          className={"absolute  right-3 top-1/2 transform -translate-y-1/2"}
        >
          <HiOutlinePaperAirplane fontSize={"25px"} color={"#fff"} />
        </ButtonGroup>
      </form>
    </div>
  );
}

export default CreateCommentForm;
