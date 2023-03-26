import { ReactElement, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../features/modal-slice";
import { jumptoQuestion } from "../features/quiz-slice";
import { RootState } from "../store";

export default function JumpToQuestionModal(): ReactElement {
  const show = useSelector((state: RootState) => state.modal.show);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(showModal({ show: false }));
  const handleSave = (questionNumber: number) => {
    dispatch(showModal({ show: false }));
    dispatch(jumptoQuestion({ questionNumber }));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Jump to Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Question Number</Form.Label>
              <Form.Control
                type="text"
                value={questionNumber}
                autoFocus
                onChange={(event) =>
                  setQuestionNumber(Number(event.target.value))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave(questionNumber)}>
            Goto Question
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
