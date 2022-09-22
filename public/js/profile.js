const followingBtn = document.querySelector('.following--profile-button')
const createPost = document.querySelector('.create--post')
const createPostWrapper = document.querySelector('.create--post-wrapper')

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
    if (e.target.className === 'create--post-wrapper') {
        createPostWrapper.style.display = 'none'
    }
})