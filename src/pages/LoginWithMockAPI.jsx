import React , {useState}from 'react'

// 사용자 데이터 정보
const users = [
  {
    username: 'blue',
    password: '1234',
    userInfo: { name: 'blueStragglr' },
  },
  {
    username: 'white',
    password: '1234',
    userInfo: { name: 'whiteDwarf' },
  },
  {
    username: 'red',
    password: '1234',
    userInfo: { name: 'redGiant' },
  },
];
// Mock API에서 사용할 임시 키_secret)
const _secret = '1234qwer!@#$';


// 로그인 함수 정의
const login = async (username, password) => {

  // TODO: 올바른 username, password를 입력하면 {message: 'SUCCESS', token: (원하는 문자열)} 를 반환하세요.
  // 사용자 데이터에서 입력된 username 과 password를 확인
  const user = users.find((user) => user.username === username && user.password === password);
  //console.log(user);
  // 유효한 사용자인 경우 SUCCESS 메시지와 토큰을 반환, 그렇지 않으면 null 반환
  return user ? { message: 'SUCCESS', token: JSON.stringify({ user: user.userInfo, secret: _secret }) } : null;
//  if(result.message === 'SUCCESS'){
//   const userInfo = await getUserInfo(result.token);
//   getUserInfo(userInfo);
//  }else{
//   console.error('잘못된 정보입니다.');
//  }
}

// 사용자 정보 가져오기 함수 정의: 토큰이 유효한지 확인,  정보 반환
const getUserInfo = async (token) => {
  // TODO: login 함수에서 받은 token을 이용해 사용자 정보를 받아오세요.

  const Token = JSON.parse(token);

 
  if(!Token || Token.secret !== _secret) return null;

  // 토큰에 저장된 사용자 정보를 검색하여 반환
  const loggedUser = users.find((user) => user.userInfo.name === Token.user.name);
  console.log(loggedUser.userInfo);
  return loggedUser ? loggedUser.userInfo : null;
};


// 시작

const LoginWithMockAPI  = () => {


  const [userInfo, setUserInfo] = useState({ name: '' });


//  로그인 폼 제출
  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    
    // TODO: form 에서 username과 password를 받아 login 함수를 호출하세요.
    // 폼 데이터 가져오기
    const formData = new FormData(event.currentTarget);
    //console.log(formData.get('username'), formData.get('password'));

    // 사용자 로그인 시도
    const loginRes = await login(formData.get('username'), formData.get('password'));
    //console.log(loginRes);
    //{message: 'SUCCESS', token: '{"user":{"name":"redGiant"},"secret":"1234qwer!@#$"}'}
    if (!loginRes) return;


    // 로그인 성공시, 토큰 반환시 ,사용자 정보 가져오기 ,토큰으로 
    const userInfo = await getUserInfo(loginRes.token);
    // {name: 'redGiant'}
    if (!userInfo) return;

      // 상태 업데이트
      setUserInfo(userInfo);
    // const formData = new FormData(event.currentTarget);
    // for (let [key, value] of formData.entries()){
    //   console.log(key, value);
    // }
  }
  console.log( userInfo.name);
  return (
  <div>
    <h1>
      🔐 Login with Mock API 🔐
    </h1>
    <form onSubmit={loginSubmitHandler}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit" value="Submit">
          submit
        </button>
      </form>
    <div>
      <h2>
        User info
      </h2>
      {/* TODO: 유저 정보를 보여주도록 구현하세요. 필요에 따라 state나 다른 변수를 추가하세요. */}
      user name : {userInfo.name}
    </div>
  </div>)
}

export default LoginWithMockAPI
