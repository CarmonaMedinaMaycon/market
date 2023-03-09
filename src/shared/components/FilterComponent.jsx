import FeatherIcon from 'feather-icons-react'
import React from 'react'
import { Col, FormControl, InputGroup, Row } from 'react-bootstrap'

const FilterComponent = ({FilterText, onFilter, onClear}) => {
  return 
  <Row>
    <Col>
        <InputGroup className='mb-3'>
            <FormControl
            id='search'
            placeholder='buscar'
            arian-label='buscar'
            value={FilterText}
            onChange={onFilter}
            />
            <InputGroup.Text onClick={onClear}>
            <FeatherIcon icon={'x'}/>

            </InputGroup.Text>
        </InputGroup>
    </Col>
  </Row>
}

export default FilterComponent
