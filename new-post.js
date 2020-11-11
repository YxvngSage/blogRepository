document.querySelector('.submit-button button').onclick = (event) => {
    const data = new FormData();
    data.append('post_image', document.querySelector('.select-file input').files[0]);
    data.append('title', document.querySelector('.title-input input').value);
    data.append('content', document.querySelector('.content-textarea textarea').value);
    fetch('http://localhost:3000/post',{method: 'POST', body: data}).then(() => {
        
    })
}