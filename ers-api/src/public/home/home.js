const user = JSON.parse(localStorage.getItem('user'));

function populateReimbTable(reimb){
    document.getElementById('reimb-table').innerHTML += `
                    <tr>
                    <th scope="row">${reimb.reimbId}</th>
                      <td>${reimb.reimbSubmitted.replace(/T/g, " ").slice(0,19)    || '-----------'}</td>
                      <td>${reimb.reimbAmount       || '-----------'}</td>
                      <td>${reimb.reimbTypeId       || '-----------'}</td>
                      <td>${reimb.reimbStatusId     || '-----------'}</td>
                      <td>${reimb.reimbDescription  || '-----------'}</td>
                      <td>${reimb.reimbResolved.replace(/T/g, " ").slice(0,19)     || '-----------'}</td>
                      <td>${reimb.reimbResolver     || '-----------'}</td>
                    </tr>
                `;
}
fetch(`../reimb/user/${user.usersId}`)
.then(res => res.json())
.then(res =>{
    res.forEach(reimb => {
        populateReimbTable(reimb);
    });
})
.catch(err=>{
    console.log(err);
});
