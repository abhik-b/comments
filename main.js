// 1. Create a new comment ✔️
// 2. Populate data ✔️
// 3. Update Counter ✔️
// 4. Handle Reply 
const commentsDiv = document.querySelector('.comments')
const textArea = document.querySelector('textArea')
let replyFlag = false

let commentID = 3
let nextCommentID = -1

function createNewComment(comment) {
    const newArticle = document.createElement('article')
    newArticle.setAttribute('class', "comment")

    if (replyFlag) {
        newArticle.classList.add("reply-comment")
    } else {
        newArticle.setAttribute('id', `comment-${comment.id}`)
    }

    const headerDiv = document.createElement('div')
    const dpDiv = document.createElement('div')
    const authorName = document.createElement('p')
    const timestamp = document.createElement('p')

    headerDiv.setAttribute('class', "header")
    dpDiv.setAttribute('class', "author-dp")



    authorName.setAttribute('class', "author-name")
    authorName.textContent = comment.username

    timestamp.setAttribute('class', "timestamp")
    timestamp.textContent = comment.createdAt

    headerDiv.appendChild(dpDiv)
    headerDiv.appendChild(authorName)
    headerDiv.appendChild(timestamp)

    const content = document.createElement('p')
    content.setAttribute('class', "content")
    content.textContent = comment.content

    const counter = document.createElement('div')
    const addBtn = document.createElement('button')
    const subBtn = document.createElement('button')
    const count = document.createElement('p')

    counter.setAttribute('class', 'counter')
    addBtn.setAttribute('class', 'add')
    subBtn.setAttribute('class', 'sub')
    count.setAttribute('class', 'count')

    addBtn.textContent = "+"
    subBtn.textContent = "-"
    count.textContent = comment.score

    addBtn.addEventListener('click', e => handleCount('+', e))
    subBtn.addEventListener('click', e => handleCount('-', e))

    counter.appendChild(addBtn)
    counter.appendChild(count)
    counter.appendChild(subBtn)



    newArticle.appendChild(headerDiv)
    newArticle.appendChild(content)
    newArticle.appendChild(counter)


    if (!replyFlag) {
        const replyBtn = document.createElement('button')
        replyBtn.setAttribute('class', 'reply')
        replyBtn.textContent = "↪️Reply"
        replyBtn.addEventListener('click', (e) => {
            clearTextArea()
            replyFlag = true
            nextCommentID = comment.id + 1
            textArea.value = `@${comment.username} ` + textArea.value
        })
        newArticle.appendChild(replyBtn)
    }

    if (replyFlag) {
        const nextElement = document.getElementById(`comment-${nextCommentID}`)
        commentsDiv.insertBefore(newArticle, nextElement)
        nextCommentID = -1
    } else {
        commentsDiv.appendChild(newArticle)
    }

}



fetch('./data.json').then(response => { return response.json() })
    .then(data => {
        console.log(data.comments)
        data.comments.forEach(element => {
            createNewComment(element)
        });
    }).catch(err => {
        console.error(err)
    })


function handleCount(op, e) {
    const btnClicked = e.target
    switch (op) {
        case "+":
            let count = parseInt(btnClicked.nextElementSibling.innerText)
            count += 1
            btnClicked.nextElementSibling.innerText = count
            break;
        case "-":
            let count2 = parseInt(btnClicked.previousElementSibling.innerText)
            count2 -= 1
            btnClicked.previousElementSibling.innerText = count2
            break;
        default:
            break;
    }
}


const sendBtn = document.querySelector('#send')
sendBtn.addEventListener('click', (e) => formSubmit(e))



function formSubmit(e) {
    e.preventDefault()

    const newComment = {
        id: commentID,
        content: textArea.value,
        createdAt: new Date().toDateString(),
        username: "abhikb",
        score: 0

    }
    createNewComment(newComment)
    if (!replyFlag) commentID++
    clearTextArea()
    replyFlag = false

}


function clearTextArea() {
    textArea.value = " "
}