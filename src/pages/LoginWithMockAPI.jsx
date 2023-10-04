import React , {useState}from 'react'

const login = async (username, password) => {
  // TODO: 올바른 username, password를 입력하면 {message: 'SUCCESS', token: (원하는 문자열)} 를 반환하세요.
 if(result.message === 'SUCCESS'){
  const userInfo = await getUserInfo(result.token);
  getUserInfo(userInfo);
 }else{
  console.error('잘못된 정보입니다.');
 }
}

const getUserInfo = async () => {
  // TODO: login 함수에서 받은 token을 이용해 사용자 정보를 받아오세요.
  try{
    const response = await fetch('https://64f732e69d775408495348ae.mockapi.io/api/v1/authmock',{
      method: 'GET',
    })

    const data = await response.json();
    console.log(data);
  }catch (error) {   
    return null;
}

}

const LoginWithMockAPI  = () => {


  const [id , setId]  = useState('')
  const [password , setPassword]  = useState('')

  console.log(id, password);
  const onIdChange = (e) => {
    setId(e.target.value);
   
  }
 const onPasswordChange = (e) => {
  setPassword(e.target.value)
 }
//  제출헸을 때
  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    
    // TODO: form 에서 username과 password를 받아 login 함수를 호출하세요.
    const result = await login(id, password);

    // const formData = new FormData(event.currentTarget);
    // for (let [key, value] of formData.entries()){
    //   console.log(key, value);
    // }
  }

  return (
  <div>
    <h1>
      🔐 Login with Mock API 🔐
    </h1>
    <form onSubmit={loginSubmitHandler}>
      {/* TODO: 여기에 username과 password를 입력하는 input을 추가하세요. 제출을 위해 button도 추가하세요. */}
      <label>
      username
      <input type="text" placeholder='name' value={id} onChange={onIdChange} />
      </label>
     <label >
     password
     <input type="text" placeholder='password'onChange={onPasswordChange}  value={password}/>
     </label>
      <button>Submit</button>
    </form>
    <div>
      <h2>
        User info
      </h2>
      {/* TODO: 유저 정보를 보여주도록 구현하세요. 필요에 따라 state나 다른 변수를 추가하세요. */}
      {JSON.stringify({username: 'blueStragglr'})}
    </div>
  </div>)
}

export default LoginWithMockAPI
