const followingBtn = document.querySelector('.following--profile-button')

followingBtn.addEventListener('mouseover', () => {
    followingBtn.innerText = 'Unfollow'
})

followingBtn.addEventListener('mouseout', () => {
    followingBtn.innerText = 'Following'
})