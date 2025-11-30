import { useParams } from "react-router";

function Container({ children, customPadding = "", classname = "" }) {
  const { userId } = useParams();
  return (
    <div
      className={`flex flex-col mx-auto my-0 gap-3  ${
        // If there is user id it makes container wider, for profile page
        userId === undefined
          ? `p-4 md:p-0 max-w-[720px] ${classname}`
          : `${customPadding} max-w-[1000px]`
      }`}
    >
      {children}
    </div>
  );
}

export default Container;
