
const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    // Send PUT Request here
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Nayan Raval',
            quote: 'I find your lack of faith disturbing.'
        })
    }).then(res => {
        if (res.ok) return res.json()
    })
        .then(response => {
            console.log(response);
            window.location.reload(true);
        })
});


const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Test'
        })
    }).then(response => {
        window.location.reload(true)
    }).then(data => {
        window.location.reload()
    })
})
