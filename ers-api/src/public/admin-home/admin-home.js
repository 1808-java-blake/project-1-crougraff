function filterReimb(){  
    console.log('filterReimb')
    if(document.getElementById("filter-option").value === "PENDING"){
        fetch(`../reimb`)
        .then(res => res.json())
        .then(res => {
            document.getElementById("reimb-table-body").innerHTML = '';
            res.forEach(reimb => {
                reimbTable(reimb);
            })
        })
        .catch(err => {
            console.log(err);
        });
    }
    else{
        fetch(`../reimb/status/${document.getElementById("filter-option").value}`)
        .then(res => res.json())
        .then(res => {
            document.getElementById("reimb-table-body").innerHTML = '';
            res.forEach(reimb => {
                reimbTable(reimb);
            })
        })
        .catch(err => {
            console.log(err);
        });
    }
}
function reimbTable(reimb){
    console.log(reimb);
    let status = reimb.reimbStatusId;
    console.log(`status: ${status}`);
    if(status === 'PENDING'){
        status = `<select id="${reimb.reimbId}" onchange="updateStatus(${reimb.reimbId})">
                    <option value="0">Pending</option>
                    <option value="1">Approve</option>
                    <option value="2">Deny</option>
                </select>`;
    }
    document.getElementById('reimb-table-body').innerHTML += `
                                </tr>
                                <th scope="row">${reimb.reimbId}</th>
                                <td>${reimb.reimbAmount       || '-----------'}</td>
                                <td>${reimb.reimbSubmitted.replace(/T/g, " ").slice(0,19)    || '-----------'}</td>
                                <td>${reimb.reimbDescription  || '-----------'}</td>
                                <td>${reimb.reimbAuthor       || '-----------'}</td>
                                <td>${reimb.reimbResolved.replace(/T/g, " ").slice(0,19)    || '-----------'}</td>
                                <td>${reimb.reimbTypeId       || '-----------'}</td>
                                <td>${reimb.reimbResolver     || '-----------'}</td>
                                <td>${status                  || '-----------'}</td>
                                </tr>
                                                            `;
}
function updateStatus(reimbId){
    const e = document.getElementById(reimbId);
       if(Number(e.value) === 1){
          approved(reimbId);
       }else if(Number(e.value)  === 2){
        denied(reimbId);
       }
}
function approved(reimbId){
    fetch(`../reimb/approve/${reimbId}`, {
        method: 'PUT',
        body: localStorage.getItem('user')
    })
        .then(resp => resp.json())
        .then(resp => {
            window.location.href = 'admin-home.html';
        })
        .catch(err => {
            console.log(err);
        });
}

function denied(reimbId){
    fetch(`../reimb/deny/${reimbId}`, {
        method: 'PUT',
    })
        .then(resp => resp.json())
        .then(resp => {
            window.location.href = 'admin-home.html';
        })
        .catch(err => {
            console.log(err);
        });
}
filterReimb();