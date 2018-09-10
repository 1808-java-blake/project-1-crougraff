
function login(event) {
  event.preventDefault();
  let username = document.getElementById('inputUsername').value;
  let password = document.getElementById('inputPassword').value;
  const credentials = {username, password};
  fetch('/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
  })
    .then(resp => {
      if (resp.status === 401) {
        document.getElementById('error-message').innerText = 'Invalid Credentials';
      } else if (resp.status === 200) {
        console.log(200);
        return resp.json();
      } else {
        document.getElementById('error-message').innerText = 'Failed to Login at this time';
      }
      throw 'Failed to login';
    })
    .then(resp => {
      localStorage.setItem('user', JSON.stringify(resp));
      if (resp.userRoleId === '2') {
        window.location.href = 'admin-home/admin-home.html';
     } else if (resp.userRoleId === '1') {
        window.location.href = 'home/home.html';
     }
    })
    .catch(err => {
      console.log(err);
    });
}
