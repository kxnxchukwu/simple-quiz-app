import React from "react";
import { Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setShow } from "../features/alert-slice";
import { RootState } from "../store";

export interface ExplanationProps {
  explanation: string;
}

export default function Explanation({
  explanation,
}: ExplanationProps): React.ReactElement {
  const dispatch = useDispatch();
  const show = useSelector((state: RootState) => state.alert.show);
  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>Explanation For This Question</Alert.Heading>
        <hr />
        <p className="mb-0">{explanation}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => dispatch(setShow({ show: false }))}
            variant="outline-success"
          >
            Close Me!
          </Button>
        </div>
      </Alert>
    </>
  );
}
