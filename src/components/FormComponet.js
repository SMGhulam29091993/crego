import React, {useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const Forms = () => {
  const [combinator, setCombinator] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState({});
  const [rules, setRules] = useState([]);
  const [expression, setExpression] = useState({rules:[]});
  const [showJson,setShowJson] = useState(false)


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
  
  const handleShowJSON = ()=>{
    setShowJson(!showJson);
  };

  return (
    <>
      <main>
        
        <div style={{display:"flex", justifyContent:"space-evenly", width:"100%"}}>
          <div style={{width : "60%"}}>
            <Container fluid style={{padding:"1rem"}}>
              <Row >
                <Col xs={12} sm={4}>
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
                        <Col xs={12} md={4} lg={3} xl={2}>
                          <Form.Label className="mt-1"  style={{textTransform:"uppercase", fontWeight : "bold"}}>Key</Form.Label>
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
                        <Col xs={12} md={4} lg={3} xl={2}>
                          <Form.Label className="mt-1" style={{textTransform:"uppercase", fontWeight : "bold"}}>Value</Form.Label>
                          <Form.Control type="text" id="value" onChange={handleOutput} required/>
                        </Col>
                        <Col xs={12} md={4} lg={3} xl={2}>
                          <Form.Label className="mt-1" style={{textTransform:"uppercase", fontWeight : "bold"}}>Operator</Form.Label>
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
                        <Col xs={12} md={4} lg={3} xl={2}>
                          <Form.Label className="mt-1" style={{textTransform:"uppercase", fontWeight : "bold"}}>Score</Form.Label>
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
              <Button onClick={handleShowJSON}>Show Json</Button>
              {showJson && <pre style={{background:"black", color: "#fff", height:"auto"}}>{JSON.stringify(expression, null, 2)}</pre>}

            </div>           
        </div>
        <div style={{display:"flex", flexDirection:"column"}}>
          { expression.rules.length > 0 && (<h4 style={{ textAlign: "center" }}>Rules</h4>)}
          <ul className='px-4'>
          {expression && expression.rules.map((rule, index) => (
            <li key={index} style={{display:"flex",flexWrap:"wrap", alignItems:"center", justifyContent:"space-between",padding: "1rem", 
              border:"1.5px solid black", textTransform:"uppercase", fontWeight: "Bold", marginBottom:"10px"}}>
              <span style={{minWidth:"4rem", marginRight:"15px"}}>Key:  <span style={{color:"blue" }}>{JSON.stringify(rule.key)}</span></span>
              <span style={{minWidth:"4rem", marginRight:"15px"}}>Value:  <span style={{color:"blue" }}>{JSON.stringify(rule.output.value)}</span></span>
              <span style={{minWidth:"4rem", marginRight:"15px"}}>Operator: <span style={{color:"blue" }}>{JSON.stringify(rule.output.operator)}</span></span>
              <span style={{minWidth:"4rem", marginRight:"15px"}}>Score: <span style={{color:"blue" }}>{JSON.stringify(rule.output.score)}</span></span>
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
