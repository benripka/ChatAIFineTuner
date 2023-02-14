import * as React from "react"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const GoogleCalendarModal = (props) => {
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    When are you available?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <iframe
                    src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2UmcZZyNhsxEBggkXPLZadbwD80mYDoRivd2JG_5DxDbKSt9aAxpM0qeD-tXEL-6lYwqB2LI2w?gv=true"
                    width="100%" height="600" frameborder="0"></iframe>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Done</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default GoogleCalendarModal