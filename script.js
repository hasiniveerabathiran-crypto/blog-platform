const postList = document.getElementById("postList");

fetchPosts();

function fetchPosts() {

    fetch("http://localhost:3000/posts")

        .then(res => res.json())

        .then(data => {

            postList.innerHTML = "";

            data.forEach((post, index) => {

                postList.innerHTML += `

      <div class="post-card">

        <h2>${post.title}</h2>

        <p>${post.content}</p>

        <button onclick="deletePost(${index})">
          Delete Post
        </button>

        <div class="comment-box">

          <input
            type="text"
            id="comment-${index}"
            placeholder="Add comment"
          >

          <button onclick="addComment(${index})">
            Comment
          </button>

        </div>

        <div id="comments-${index}"></div>

      </div>

      `;

                fetchComments(index);

            });

        });

}

function addPost() {

    const title = document.getElementById("title").value;

    const content = document.getElementById("content").value;

    fetch("http://localhost:3000/add-post", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title,
            content
        })

    })

        .then(() => {

            fetchPosts();

        });

}

function deletePost(index) {

    fetch(`http://localhost:3000/delete-post/${index}`, {

        method: "DELETE"

    })

        .then(() => {

            fetchPosts();

        });

}

function addComment(index) {

    const comment = document.getElementById(`comment-${index}`).value;

    fetch("http://localhost:3000/add-comment", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            postIndex: index,
            comment
        })

    })

        .then(() => {

            fetchComments(index);

        });

}

function fetchComments(index) {

    fetch("http://localhost:3000/comments")

        .then(res => res.json())

        .then(data => {

            const commentDiv =
                document.getElementById(`comments-${index}`);

            commentDiv.innerHTML = "";

            data.forEach(item => {

                if (item.postIndex == index) {

                    commentDiv.innerHTML += `

        <p>💬 ${item.comment}</p>

        `;

                }

            });

        });

}