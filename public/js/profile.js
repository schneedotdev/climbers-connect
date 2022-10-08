const followingBtn = document.querySelector('.following--profile-button')
const createPost = document.querySelector('.create--post')
const createPostWrapper = document.querySelector('.create--post-wrapper')
const stars = Array.from(document.querySelectorAll('.star')).reverse()
const starInputs = Array.from(document.querySelectorAll('.star--input')).reverse()
const [white, gold] = ['#fff', '#FFE55C']

if (followingBtn) {
    followingBtn.addEventListener('mouseover', () => {
        followingBtn.innerText = 'Unfollow'
    })

    followingBtn.addEventListener('mouseout', () => {
        followingBtn.innerText = 'Following'
    })
}

createPost.addEventListener('click', () => {
    createPostWrapper.style.display = 'block'
    document.querySelector('.climb-input-file').value = null
    Array.from(document.querySelectorAll('.climb--input')).forEach(input => {
        input.value = null
    })
})

createPostWrapper.addEventListener('click', (e) => {
    if (e.target.className === 'create--post-wrapper' || e.target.classList[0] === 'close--icon') {
        createPostWrapper.style.display = 'none'

        // reset star colors
        stars.forEach(star => {
            star.style.color = white
        })

        stars[0].style.color = gold

        starInputs.forEach(input => {
            input.checked = false
        })

        starInputs[0].checked = true
    }
})

stars.forEach((star, i) => {
    star.addEventListener('click', () => {
        stars.slice(1).forEach(star => star.style.color = white)

        // color stars before
        for (let j = 0; j <= i; j++) {
            stars[j].style.color = gold
            console.log(stars[j])
        }
    })
})