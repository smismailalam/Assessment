// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox ,Row , Col , Typography  } from 'antd';
// import Login from './screens/login';
const axios = require('axios');
let username = '';
let password = '';
var details = [];
function onFinish(){
  password = parseInt(password);
  axios.post('https://xfoil-technical-interview.herokuapp.com/login', {
    username,
    password,
  })
  .then(function (response) {
    alert('success')
    console.log(response.data);
    details.push(response.data);
  })
  .catch(function (error) {
    alert('username or password is incorrect')
    // console.log(error);
  });
}
function App() {
  return (
    <div className="App">
      <Row>
        <Col>          
        {
          details.length > 0 ?
          <div>
            <Typography>First Name: { details.firstNameAdmin}</Typography>
            <Typography>Last Name: { details.lastNameAdmin}</Typography>
            <Typography>company id: { details.companyId}</Typography>
            {
              details.locationObjects.map( dl =>{
                <Typography>location : { dl.locationName}</Typography>
              })
            }
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
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            onChange={(e)=>{ username =  e.target.value; details = [] }}
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
            onChange={(e)=>{ password =  e.target.value; details = []}}
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
    </div>
  );
}

export default App;
