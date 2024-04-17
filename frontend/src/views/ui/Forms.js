import React, { useState, useEffect } from "react";
import { Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input, Table } from "reactstrap";
import axios from "axios";

// Function to add user
const addUser = async (data) => {
  try {
    const response = await axios.post("http://localhost:1337/api/ariticles", { data }, {
      headers: {
        Authorization: `Bearer 057eb14db95613f9cf9dca24b33eed8f7b019f9c48792db5ff208d78738ca50daf5148843e4fbc5567f8d7063ff9811d357014743ed3c4cce963e9a8bd585bf980faf991167a0e06f506725d4f4e7d371c9412a5c90edf5e3ecdeb734edc488649b03bb750d34321a59b43c3cf375f232b9e2a4d652565714f0e5b85efa05832`
      }
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error adding user:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};

// Function to fetch data from the Strapi API
const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:1337/api/ariticles", {
      headers: {
        Authorization: `Bearer 057eb14db95613f9cf9dca24b33eed8f7b019f9c48792db5ff208d78738ca50daf5148843e4fbc5567f8d7063ff9811d357014743ed3c4cce963e9a8bd585bf980faf991167a0e06f506725d4f4e7d371c9412a5c90edf5e3ecdeb734edc488649b03bb750d34321a59b43c3cf375f232b9e2a4d652565714f0e5b85efa05832`
      }
    });
    return response.data.data; // Return the response data
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};

const Forms = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Text: ""
  });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData()
      .then(data => {
        setTableData(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(tableData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser(formData); // Call the addUser function with the formData
      console.log("Data submitted successfully");
      // Reset form data after successful submission if needed
      setFormData({
        Name: "",
        Email: "",
        Text: ""
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              หน้าแรก
            </CardTitle>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="exampleName">Name</Label>
                  <Input
                    id="exampleTextname"
                    name="Name"
                    type="text"
                    value={formData.Name}
                    onChange={handleChange}
                    required  
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    id="exampleEmail"
                    name="Email"
                    type="email"
                    value={formData.Email}
                    onChange={handleChange}
                    required  
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Text Area</Label>
                  <Input
                    id="exampleText"
                    name="Text"
                    type="textarea"
                    value={formData.Text}
                    onChange={handleChange}
                    required  
                  />
                </FormGroup>
                <Button className="mt-2" type="submit">Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h5>Table Data</h5>
              <Table striped>
                <thead>
                  <tr>
                    <th>ชื่อ</th>
                    <th>ข้อความ</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.attributes.Name}</td>
                      <td>{item.attributes.Text}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Forms;
