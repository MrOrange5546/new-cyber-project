import React, { useState, useEffect } from "react";
import { Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

// Function to add user
const addUser = async (data) => {
  try {
    const response = await axios.post("http://localhost:1337/api/ariticles", { data }, {
      headers: {
        Authorization: `Bearer 52143840de71cc58938ce432097db20d27237003cb2d98ec025ccf3510de6d551d132d845f78a8b949f1ccfc7eda9797ea17fee91d31d0a911020f9bfd974840e5ba14088e9422b6a3a8a2e399666acccf2f44ace52539c0048be508f7d3bfc509952bb11d6bc888b969cbb9b12c408f64cfe2e8a5faf00006d6f07509ba0c4b`
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
        Authorization: `Bearer 52143840de71cc58938ce432097db20d27237003cb2d98ec025ccf3510de6d551d132d845f78a8b949f1ccfc7eda9797ea17fee91d31d0a911020f9bfd974840e5ba14088e9422b6a3a8a2e399666acccf2f44ace52539c0048be508f7d3bfc509952bb11d6bc888b969cbb9b12c408f64cfe2e8a5faf00006d6f07509ba0c4b`
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
    mobile: ""
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser(formData);
      console.log("Data submitted successfully");
      fetchData().then(data => {
        setTableData(data);
      });
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
    <Row>
      <Col xs={12} md={6} lg={4}>
        <Card>
          <CardTitle tag="h5" className="border-bottom p-2 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Form
          </CardTitle>
          <CardBody>
            <Form className="mt-0 pt-0" onSubmit={handleSubmit}>
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
                <Label for="exampleText">Message</Label>
                <Input
                  id="exampleText"
                  name="Text"
                  type="textarea"
                  value={formData.Text}
                  onChange={handleChange}
                  style={{ minHeight: "50px", maxHeight: "50px" }} // Adjust height of textarea
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
              <Button className="mt-3 btn btn-success" type="submit">Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
      <Col xs={12} md={6} lg={8}>
        <Card style={{height: "95%", overflowY: "auto"}}>
          <CardBody style={{marginTop: "-5px"}}>
            <h5>World Talk</h5>
            {tableData.map((item, index) => (
              <div key={index} className="mt-3 border rounded px-3 py-3">
                <Row className="justify-content-md-star align-items-center">
                  <Col xs={12} md={5}>
                    <p className="mb-0 me-3 text-muted">Name:</p>
                    <b className="text-warning">{item.attributes.Name}</b>
                  </Col>
                  <Col xs={12} md={7}>
                    <p className="mb-0 me-3 text-muted">Message:</p>
                    <b className="text-primary d-block d-md-inline">{item.attributes.Text}</b>
                  </Col>
                </Row>
              </div>
            ))}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Forms;
