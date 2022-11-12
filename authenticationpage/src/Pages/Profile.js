import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { removeUserSession, getRefreshToken, getToken } from '../Components/Common';
import { SessionExpired } from '../Components/SessionExpired';
// import jwt_decode from 'jwt-decode';


function Profile() {
  const [value, setValue] = useState("");
  let token = getToken();
  let refreshtoken = getRefreshToken();

  const navigate = useNavigate();


  const logoutbtn = () => {
    removeUserSession()
    navigate('/')
  }


  const params = {
    "student_admissions_id": 1013,
  };


  const validateExpiry = () => {
    let currentTime = new Date();
    let oldTime = new Date(sessionStorage.getItem('date1'));

    let timeDiff = Math.round((currentTime - oldTime) / (1000 * 60));
    console.log("timeDiff", timeDiff, currentTime - oldTime)
    console.log("oldtime", oldTime)
    console.log("newtime", currentTime)
    if (timeDiff >= 1) {
      refreshtoken = getRefreshToken();
      console.log("timeout refresh token", refreshtoken);
      console.log("timeou old token", token);
      axios.post('https://2689-103-141-51-42.in.ngrok.io/api/v1/login',
        {
          refreshtoken: refreshtoken,
        }
      ).then((response) => {
        // const { token } = response.data.accesstoken;
        sessionStorage.setItem('token', response.data.accesstoken);
        sessionStorage.setItem('refreshtoken', response.data.refreshtoken);
        sessionStorage.setItem('date1', new Date());
        console.log("newToken", response.data.accesstoken)

      }).catch((err) => {
        console.log("eror", err)
        navigate('/');
      })

    }
  }
  useEffect(() => {
    setInterval(() => {
    validateExpiry();
    },5000)
    // alert(token)
    dataload();
    // eslint-disable-next-line
  }, [])
  const dataload = () => {

    token = getToken();
    console.log("get new token student", token)
    axios
      .post('https://2689-103-141-51-42.in.ngrok.io/api/v1/studentProfile', params,
        {
          headers:
          {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(response => {
          setValue(response.data.data[0]);

        })
  }


  return (
    <>

      <div className="container-fluid bg-dark " >

        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-6 text-white"><h1>Students Profile</h1></div>
          <div className="col-sm-2 text-end"><button className='btn btn-danger mt-2 align-items-end' onClick={logoutbtn}>Logout</button></div>
        </div>
      </div>
      <Row>
        <Col>
          <div className="table-responsive">
            <table className="table table-bordered border-primary">
              <thead className='text-center'>
                <tr>
                  <th>S.No</th>
                  <th>Title</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Name</td>
                  <td>{value.student_name}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Date of Birth</td>
                  <td>{value.DOB}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Gender</td>
                  <td>{value.gender}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Student_ID</td>
                  <td>{value.student_id}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Grade_Section_ID</td>
                  <td>{value.grade_section_id}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Year_ID</td>
                  <td>{value.year_id}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Mode_Of_Transport</td>
                  <td>{value.mode_of_transport}</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Grade_Master_ID</td>
                  <td>{value.grade_master_id}</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Grade_Master</td>
                  <td>{value.grade_master}</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Description</td>
                  <td>{value.description}</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>Section</td>
                  <td>{value.section}</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>Email</td>
                  <td>{value.email}</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>Admission_Date</td>
                  <td>{value.admission_date}</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>Previous_School_Info</td>
                  <td>{value.previous_school_info}</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>Father_Name</td>
                  <td>{value.father_name}</td>
                </tr>
                <tr>
                  <td>16</td>
                  <td>Father_Occupation</td>
                  <td>{value.father_occupation}</td>
                </tr>
                <tr>
                  <td>17</td>
                  <td>Address</td>
                  <td>{value.address}</td>
                </tr>
                <tr>
                  <td>18</td>
                  <td>Phone_Number</td>
                  <td>{value.phone_number}</td>
                </tr>
                <tr>
                  <td>19</td>
                  <td>Alternative_Phone_Number</td>
                  <td>{value.alt_phone_number}</td>
                </tr>
                <tr>
                  <td>20</td>
                  <td>Status</td>
                  <td>{value.status}</td>
                </tr>
                <tr>
                  <td>21</td>
                  <td>Student_Code</td>
                  <td>{value.stu_code}</td>
                </tr>
                <tr>
                  <td>22</td>
                  <td>Admission_Number</td>
                  <td>{value.admission_no}</td>
                </tr>
                <tr>
                  <td>23</td>
                  <td>Grade</td>
                  <td>{value.from_grade}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </Col>
      </Row>

      <SessionExpired />

    </>
  )
}

export default Profile