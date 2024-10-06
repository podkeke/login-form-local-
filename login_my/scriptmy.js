const form = document.getElementById('form');
const username = document.getElementById('username');
const nickname = document.getElementById('nickname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//태그는 틀 아이디는 식별자(고유)
// Show input error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  // form-contrl error는 form-control아래에 작은가지로 form-contrl error이름인 것을 생성하는것이다
  const small = formControl.querySelector('small');
  //querySelector:해당하는 태그의 정보를 불러옴
  small.innerText = message;
}

// Show success outline
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value)) {
    showSuccess(email)
  } else {
    showError(email, '유효하지 않은 이메일입니다');
  }
}

// Get field name
const getFieldName = (input) => {
  if(input===username)
    return '이름'
  if(input===nickname)
    return '닉네임'
  if(input===password)
    return '비밀번호'
  if(input===password2)
    return '확인비밀번호'
}



const isValidNickname = (input) => {
  const badWord = ['씨발', '존나', '미친', '병신'];
  const nickname = input.value;
  const hasBadWord = badWord.some(word => nickname.includes(word)); // 'some'은 배열에서 특정 조건에 맞는 요소가 하나라도 있는지 확인할 때 유용
  
  if (hasBadWord) {
    showError(input, '닉네임이 부적절합니다');
  } else {
    showSuccess(input);
  }
};


// Check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)}는 적어도 ${min} 글자여야 합니다.`);//$:스트링 사이에서 변수 표현
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)}는 최소 ${max} 글자여야 합니다`);
  }
}

// Check passwords match
const checkPasswordsMatch = (input1, input2) => {
  if(input1.value !== input2.value) {
    showError(input2, '비밀번호 일치하지 않음');
  }
}

// Event listeners
form.addEventListener('submit', e => {
  e.preventDefault();//원래 submit을하면 새로고침이된다 근데 이걸 막기위해 쓴 코드

  checkLength(username, 8, 15);
  isValidNickname(nickname);
  checkLength(nickname,2, 8);
  checkLength(password, 6, 25);
  isValidEmail(email);
  checkPasswordsMatch(password, password2);
});