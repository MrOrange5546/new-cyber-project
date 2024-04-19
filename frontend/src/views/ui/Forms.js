import React, { useState, useEffect } from "react";
import { Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input, Table } from "reactstrap";
import axios from "axios";

// Function to add user
const addUser = async (data) => {
  try {
    const response = await axios.post("http://localhost:1337/api/ariticles", { data }, {
      headers: {
        Authorization: `Bearer 7d5cb43a31fee9e8ca80a208bb81ef0f3fe4fd4db714550c71c244f3fdb1fb3feacccc3fa118fc31ac4e333dc0cffd2f5e40aa8dda3ef3bae6cf25168ea3716f9d97b1eddfd3a44ea575090061bf561bc772a337a86652ff9b556f40af286213b457add0576761196c03f9cf03b5bf6fa771154c6744fcda414347cbb3b0a351`
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
        Authorization: `Bearer 7d5cb43a31fee9e8ca80a208bb81ef0f3fe4fd4db714550c71c244f3fdb1fb3feacccc3fa118fc31ac4e333dc0cffd2f5e40aa8dda3ef3bae6cf25168ea3716f9d97b1eddfd3a44ea575090061bf561bc772a337a86652ff9b556f40af286213b457add0576761196c03f9cf03b5bf6fa771154c6744fcda414347cbb3b0a351`
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
    Text: "",
    mobile:""
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
      fetchData().then(data => {
        setTableData(data);
      });
      // Reset form data after successful submission if needed
      setFormData({
        Name: "",
        Email: "",
        Text: "",
        mobile: ""
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
                <FormGroup>
                  <Label for="exampleMobile">Mobile</Label>
                  <Input
                    id="exampleText"
                    name="mobile"
                    type="text"
                    value={formData.mobile}
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
