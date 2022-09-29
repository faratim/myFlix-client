import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { setFilter } from '../../actions/actions';

import './visibility-filter-input.scss'

function VisibilityFilterInput(props) {
  return (
    <Row>
      <Col id="search-col">
        <Form.Control
          id="search-bar"
          onChange={(e) => props.setFilter(e.target.value)}
          value={props.visibilityFilter}
          placeholder="Search Movies"
        />
      </Col>
    </Row>
  );
}

export default connect(null, { setFilter })(
  VisibilityFilterInput
);
