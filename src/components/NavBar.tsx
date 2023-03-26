import { ReactElement } from "react";
import { Nav, Navbar, NavLink, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showModal } from "../features/modal-slice";
import { restartQuiz } from "../features/quiz-slice";

export default function NavBar(): ReactElement {
  const dispatch = useDispatch();

  return (
    <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand href="/">ACAMS Prep</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          data-bs-target="#navbarScroll"
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <NavLink onClick={() => dispatch(restartQuiz())}>
              Restart Quiz
            </NavLink>
            <NavLink onClick={() => dispatch(showModal({ show: true }))}>
              Jump to Question
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
