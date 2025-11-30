import { Outlet } from "react-router";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

function AppLayout() {
  return (
    <div>
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <Footer />
    </div>
  );
}

export default AppLayout;
