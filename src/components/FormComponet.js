import React, {useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { JSONTree } from 'react-json-tree';


const Forms = () => {
  const [combinator, setCombinator] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState({});
  const [rules, setRules] = useState([]);
  const [expression, setExpression] = useState({rules:[]});


  const handleOutput = (e) => {
    setOutput({
      ...output,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const newRule = {
      key,
      output: { ...output },
    };
    setRules((prevRules) => [...prevRules, newRule]);
    setExpression({
      rules: [...rules, newRule],
      combinator,
    });
    
  };



  const handleDelete = (index) => {
    const updatedRules = [...expression.rules];
    updatedRules.splice(index, 1); 
    setExpression({
      ...expression,
      rules: updatedRules,
    });
  };
  
  return (
    <>
      <main>
        <div style={{display:"flex", justifyContent:"space-evenly", width:"100%"}}>
          <div style={{width : "60%"}}>
            <Container fluid style={{padding:"1rem"}}>
              <Row >
                <Col xs={3}>
                  <Form.Group>
                    <Form.Label style={{textTransform:"uppercase", fontWeight : "bold"}}>Combinator</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      id="combinator"
                      onChange={(e) => setCombinator(e.target.value)} required
                    >
                      <option>Select</option>
                      <option value="and">AND</option>
                      <option value="or">OR</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Container>
            <Container fluid style={{padding:"1.5rem"}}>
              <Row>
                <Col>
                  <h3>Rules</h3>
                  <Form.Group>
                    <Row>
                      <Col xs={3}>
                        <Form.Label style={{textTransform:"uppercase", fontWeight : "bold"}}>Key</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          id="key"
                          onChange={(e) => setKey(e.target.value)} required
                        >
                          <option>Select</option>
                          <option value="age">AGE</option>
                          <option value="score">SCORE</option>
                          <option value="account_balance">ACCOUNT BALANCE</option>
                        </Form.Select>
                      </Col>
                      <Col xs={3}>
                        <Form.Label style={{textTransform:"uppercase", fontWeight : "bold"}}>Value</Form.Label>
                        <Form.Control type="text" id="value" onChange={handleOutput} required/>
                      </Col>
                      <Col xs={3}>
                        <Form.Label style={{textTransform:"uppercase", fontWeight : "bold"}}>Operator</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          id="operator"
                          onChange={handleOutput} required
                        >
                          <option>Select</option>
                          <option>{'>'}</option>
                          <option>{'<'}</option>
                          <option>{'>='}</option>
                          <option>{'<='}</option>
                          <option>{'='}</option>
                        </Form.Select>
                      </Col>
                      <Col xs={3}>
                        <Form.Label style={{textTransform:"uppercase", fontWeight : "bold"}}>Score</Form.Label>
                        <Form.Control type="text" id="score" onChange={handleOutput} required/>
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>
            </Container>
            <Container fluid className="mb-3 px-4">
              <Row>
                <Col>
                  <Form.Group>
                    <Button onClick={handleSubmit}>Add Rules</Button>
                  </Form.Group>
                </Col>               
              </Row>
            </Container>
            </div>  
            <div>
              <Button>Show Json</Button>
              {expression && expression.rules && <JSONTree data={expression} /> }
            </div>           
        </div>
        <div style={{display:"flex", flexDirection:"column"}}>
          { expression.rules.length > 0 && (<h4 style={{ textAlign: "center" }}>Rules</h4>)}
          <ul className='px-4'>
          {expression && expression.rules.map((rule, index) => (
            <li key={index} style={{display:"flex", alignItems:"center", justifyContent:"space-between",padding: "1rem", 
              border:"1.5px solid black", textTransform:"uppercase", fontWeight: "Bold", marginBottom:"10px"}}>
              <span style={{maxWidth:"4rem"}}>Key  <span style={{color:"blue" }}>{JSON.stringify(rule.key)}</span></span>
              <span style={{maxWidth:"4rem"}}>Value  <span style={{color:"blue" }}>{JSON.stringify(rule.output.value)}</span></span>
              <span style={{maxWidth:"4rem"}}>Operator <span style={{color:"blue" }}>{JSON.stringify(rule.output.operator)}</span></span>
              <span style={{maxWidth:"4rem"}}>Score <span style={{color:"blue" }}>{JSON.stringify(rule.output.score)}</span></span>
              <Button style={{background:"red", border: "none", outline:"none"}} onClick={()=>handleDelete(index)}>Delete</Button>
            </li>
          ))}

          </ul>
          

        </div>
      </main>
      
    </>
  );
};

export default Forms;
