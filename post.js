window.onload = () => {
    getPost();
}

function getPostIdParam(){
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    return urlParam.get('id');
}
function getPost(){
    let postId = getPostIdParam();
    fetch(`http://localhost:3000/newPost/${postId}`, {method: 'GET'}).then(response => {
        return response.json();
    }).then(data => {
        let newPost = document.createElement('div');
        newPost.innerHTML = `
        <div class="new-post-container">
            <div id='back-link'><a href='index.html'>Back</a></div>
            <div id="individual-post-title">${data.title}</div>
            <div id="individual-post-date">${data.added_date}</div>
            <div id="individual-post-content">${data.content}</div>
        </div>
        `
        document.querySelector('.wrapper').appendChild(newPost);
        document.querySelector('header').style.backgroundImage = `url('${data.post_image}')`;
    })
}