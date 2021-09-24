import React from "react";
import "./App.css";
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox ,Row , Col , Typography  } from 'antd';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      details: "",
    };
  }
  onFinish(){
    let { username , password } = this.state;
    var _this = this;
    password = parseInt(password);
    axios.post('https://xfoil-technical-interview.herokuapp.com/login', {
      username,
      password,
    })
    .then(function (response) {
      console.log(response.data);
      // details.push(response.data);
      _this.setState({
        details:response.data
      })
    })
    .catch(function (error) {
      // alert('username or password is incorrect')
      console.log(error);
    });
  }
  render() {
    const { details } = this.state;
    console.log(details)
    return (
      <Row>
        <Col>          
        {
          details ?
          <div>
            <Typography>First Name: { details.firstNameAdmin}</Typography>
            <Typography>Last Name: { details.lastNameAdmin}</Typography>
            <Typography>company id: { details.companyId}</Typography>
            {details.locationObjects.map((dl, i) => {
              return (
                <Typography key={i}>location : { dl.locationName}</Typography>
              );
            })}
          </div>
          : 
          <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={()=> {this.onFinish()}}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            onChange={(e)=>{ this.setState({ username:e.target.value,details: "" })}}
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            onChange={(e)=>{ this.setState({ password:e.target.value,details:"" })}}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        }
        </Col>
      </Row> 
    )
  }
}
export default App;
