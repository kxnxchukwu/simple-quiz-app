import { ReactElement } from "react";
import { useLocation } from "react-router";
import { Nav, Navbar, Container } from "react-bootstrap";
import Timer from "./Timer";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function NavBar(): ReactElement {
  const location = useLocation();
  const score = useSelector((state: RootState) => state.quiz.score);
  const questionLength: number = useSelector(
    (state: RootState) => state.quiz.questions.length
  );
  const percent = Math.round((score / questionLength) * 100);

  const secondNavBarComponent = () => {
    switch (location.pathname) {
      case "/results":
        return (
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-success" type="button">
              {`${percent}%`}
            </button>
          </div>
        );
      default:
        return (
          <Container className="d-flex flex-row bd-highlight">
            <Timer />
          </Container>
        );
    }
  };
  return (
    <Navbar
      className="d-flex justify-content-around sticky-top"
      collapseOnSelect
      expand="sm"
      bg="light"
      variant="light"
    >
      <Navbar.Brand href="/">ACAMSPrep</Navbar.Brand>
      <Nav className="">{secondNavBarComponent()}</Nav>
    </Navbar>
  );
}
