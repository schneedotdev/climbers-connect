const followingLink = document.querySelector('.following--profile-link')

followingLink.addEventListener('mouseover', () => {
    document.querySelector('.following--profile').innerText = 'Unfollow'
})

followingLink.addEventListener('mouseout', () => {
    document.querySelector('.following--profile').innerText = 'Following'
})