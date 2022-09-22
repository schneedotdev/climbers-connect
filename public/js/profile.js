const followingBtn = document.querySelector('.following--profile-button')
const createPost = document.querySelector('.create--post')
const createPostWrapper = document.querySelector('.create--post-wrapper')
const climbPost = document.querySelector('.climb-post')
const partnerPost = document.querySelector('.partner-post')
const climbForm = document.querySelector('.climb--form')
const connectForm = document.querySelector('.connect--form')

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
})

createPostWrapper.addEventListener('click', (e) => {
    if (e.target.className === 'create--post-wrapper' || e.target.classList[0] === 'close--icon') {
        createPostWrapper.style.display = 'none'
    }
})

let lastClicked = 'climb'

climbPost.addEventListener('click', () => {
    lastClicked = 'climb'
    climbPost.style.background = '#A0A1F5'
    partnerPost.style.background = 'none'
    climbForm.style.display = "flex"
    connectForm.style.display = "none"
})

partnerPost.addEventListener('click', () => {
    lastClicked = 'partner'
    climbPost.style.background = 'none'
    partnerPost.style.background = '#A0A1F5'
    connectForm.style.display = "flex"
    climbForm.style.display = "none"
})