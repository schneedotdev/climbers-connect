const body = document.querySelector('body')
const edit = document.querySelector('.edit--options')
const options = document.querySelector('.options')
const listItems = [...document.querySelectorAll('.options--li')]
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

const comments = document.querySelector('.comments--list')
let expanded = false

comments.addEventListener('click', (e) => {
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

listItems.forEach(li => {
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