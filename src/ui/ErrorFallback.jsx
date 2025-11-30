import styled from "styled-components";
import Logo from "./Logo";
import { HiOutlineRefresh } from "react-icons/hi";
import ButtonGroup from "./ButtonGroup";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: #364153;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.8rem;
`;
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <StyledErrorFallback>
        <div className="flex flex-col justify-center items-center w-full max-w-[750px] bg-[#4a5565] drop-shadow-lg rounded-lg p-[1.6rem] sm:p-[2.8rem] text-center">
          <Logo err={true} />
          <p className="text-md sm:text-lg text-white font-sans p-6">
            Something went wrong 🤔
          </p>
          <p className="text-xs leading-relaxed sm:text-sm font-sans text-white pb-6">
            {error.message}
          </p>
          <ButtonGroup
            hover="hoverReloadBtn"
            className={
              "bg-[#0f6ec7] flex justify-between items-center text-white px-[25px] py-2 sm:px-[40px] sm:py-2 text-sm text-nowrap rounded-lg"
            }
            onClick={resetErrorBoundary}
          >
            Try Again <HiOutlineRefresh className="ms-2" />
          </ButtonGroup>
        </div>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
