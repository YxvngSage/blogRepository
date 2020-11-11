window.onload = () => {
    getBlog();
}

const getBlog = () => {
    fetch('http://localhost:3000',{method: 'GET'}).then(response =>{
       return response.json();
    }).then(data => {
        data.map(doc => {
            let post = document.createElement('div');
            post.innerHTML = `
            <a href='/post.html?id=${doc._id}'>
                <div class="post">
                    <div class="post-image" style="background-image: url('${doc.post_image}')"></div>
                    <div class="post-content">
                        <div class="post-content-date">${doc.added_date}</div>
                        <div class="post-content-title"><h4>${doc.title}</h4></div>
                        <div class="post-content-content">${doc.content}</div>
                    </div>
                </div>
            </a>
            `
            document.querySelector('.main-container').appendChild(post);
        })
    })
}


