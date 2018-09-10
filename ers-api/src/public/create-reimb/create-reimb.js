const userString = localStorage.getItem('user');
const user = JSON.parse(userString);
function createReimb(event) {
  event.preventDefault();
  const reimb_id = JSON.parse(localStorage.getItem('user')).usersId;
  const reimbAmount = document.getElementById('input-amount').value;
  const reimbDescription = document.getElementById('input-description').value;
  const reimbTypeId = document.getElementById('input-type').value;
  const reimbSubmitted = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const reimb = {
    reimbAmount : Number(reimbAmount),
    reimbSubmitted : reimbSubmitted,
    reimbDescription : reimbDescription,
    reimbAuthor : Number(reimb_id),
    reimbStatusId : 1,
    reimbTypeId: reimbTypeId
  }
  fetch('../reimb', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reimb)
  })
  .then(resp => {
    if (resp.status === 403) 
      document.getElementById('error-message').innerText = 'Status Code 403: Forbidden';
    else 
      return resp.json();
  })
  .then(resp => {
    window.location.href = '/create-reimb/create-reimb.html';
  })
  .catch(err => {
    console.log(err);
  });
}