import { HiPencil, HiTrash } from "react-icons/hi";
import ButtonGroup from "./ButtonGroup";
import { useEditPost } from "../posts/useEditPost";
import { useDeletePost } from "../posts/useDeletePost";
import { useDeleteComment } from "../comments/useDeleteComment";
import { useEditComment } from "../comments/useEditComment";
import SpinnerMini from "./SpinnerMini";
import { Menu, MenuItems, MenuButton, MenuItem } from "./Menu";
import Modal from "./Modal";
import EditPostCommentBox from "./EditPostCommentBox";

export default function PostCommentOptions({ type, content, id, user, date }) {
  const { editPost, isPending: isEditingPost } = useEditPost();
  const { deletePost, isPending: isDeletingPost } = useDeletePost();

  const { editComment, isPending: isEditingComment } = useEditComment();
  const { deleteComment, isPending: isDeletingComment } = useDeleteComment();

  if (isEditingPost || isDeletingComment || isDeletingPost || isEditingComment)
    return <SpinnerMini />;

  return (
    <Menu>
      {({ isOpen, setIsOpen }) => (
        <>
          <MenuButton
            onClick={() => setIsOpen(!isOpen)}
            type={type}
            isOpen={isOpen}
          />

          <MenuItems isOpen={isOpen}>
            <MenuItem>
              <Modal.Open opens={`editModal-${id}`}>
                <ButtonGroup className="flex justify-between items-center rounded bg-[#626569] text-white px-4 text-sm py-1 w-25 transition-all hover:scale-[1.07]">
                  Edit <HiPencil className="ms-2" />
                </ButtonGroup>
              </Modal.Open>
            </MenuItem>

            <MenuItem>
              <ButtonGroup
                disabled={
                  isDeletingPost ||
                  isEditingPost ||
                  isDeletingComment ||
                  isEditingComment
                }
                onClick={() => {
                  type === "post" && deletePost({ id });
                  type === "comment" && deleteComment({ id });
                }}
                className=" mt-2 flex justify-between items-center bg-red-500 text-white text-sm px-4 py-1 rounded w-25 transition-all hover:scale-[1.07]"
              >
                Delete <HiTrash className="ms-2" />
              </ButtonGroup>
            </MenuItem>
          </MenuItems>

          <Modal.Window name={`editModal-${id}`}>
            {(close) => (
              <EditPostCommentBox
                onCloseModal={close}
                user={user}
                content={content}
                id={id}
                date={date}
                type={type}
                editFunction={
                  type === "post"
                    ? editPost
                    : type === "comment"
                    ? editComment
                    : undefined
                }
              />
            )}
          </Modal.Window>
        </>
      )}
    </Menu>
  );
}
