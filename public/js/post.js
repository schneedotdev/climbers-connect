const body = document.querySelector('body')
const edit = document.querySelector('.edit--options')
const options = document.querySelector('.options')
let display = false

body.addEventListener('click', (e) => {
    if (e.target !== edit && !display) return

    if (!display) {
        options.style.display = 'block'
        display = !display
    } else {
        options.style.display = 'none'
        display = !display
    }
})

const commentList = document.querySelector('.comments--list')
let expanded = false

commentList.addEventListener('click', (e) => {
    let { target } = e

    // change target to point to the comment text stored in the p tag
    if (target === 'img' || target === 'span') return
    if (target.classList[0] === 'comment--li')
        target = target.childNodes[3]

    // if the text is expanded, add the elipsis class which will cap the text length, else remove it
    if (expanded) {
        target.classList.add('elipsis')
    } else {
        target.classList.remove('elipsis')
    }

    // negate the value of expanded for every other click
    expanded = !expanded
})

const comments = [...document.querySelectorAll('.comment--li')]

comments.forEach(comment => {
    comment.addEventListener('mouseover', (e) => {
        // if the comment has 3 children nodes, a delete form was rendered for the user, meaning that the comment was theirs to delete
        if (comment.children.length > 2) {
            // select the trash icon to be styled
            const icon = comment.children[2].children[0]

            // if the icon is hovered, style it red, otherwise style it light gray
            if (e.target.classList[0] === 'comment-trash-icon') {
                icon.style.color = 'red'
                // create a click event for the trash icon that submits the form
                e.target.addEventListener('click', () => {
                    e.target.parentNode.submit()
                })
            } else {
                icon.style.color = '#babebf'
            }
        }
    })
    comment.addEventListener('mouseout', (e) => {
        // if the comment has 3 children nodes, a delete form was rendered for the user, meaning that the comment was theirs to delete
        if (comment.children.length > 2) {
            // hide the trash icon when the comment is no longer hovered
            const icon = comment.children[2].children[0]
            icon.style.color = 'transparent'
        }
    })
})

const options_li = [...document.querySelectorAll('.options--li')]

options_li.forEach(li => {
    li.addEventListener('click', () => {
        li.children[0].submit()
    })
})


const textarea = document.querySelector('.create--comment-textarea')

// when enter is pressed when adding comments to a post, submit the form, unless the shift key is pressed, which should allow a new line character
textarea.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (e.key === 'Enter' && !e.shiftKey) {
        document.querySelector('.create--comment-form').submit()
    }
})