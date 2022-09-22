const followingBtn = document.querySelector('.following--profile-button')
const createPost = document.querySelector('.create--post')
const createPostWrapper = document.querySelector('.create--post-wrapper')
const climbPost = document.querySelector('.climb-post')
const partnerPost = document.querySelector('.partner-post')

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

const climbTitle = document.querySelector('.post--climb-title')
const climbHR = document.querySelector('.post--climb-hr')
const partnerTitle = document.querySelector('.post--partner-title')
const partnerHR = document.querySelector('.post--partner-hr')
let lastClicked = 'climb'

climbPost.addEventListener('click', () => {
    lastClicked = 'climb'
    climbTitle.style.color = '#A0A1F5'
    climbHR.style.borderColor = '#A0A1F5'
    partnerTitle.style.color = '#fff'
    partnerHR.style.borderColor = '#fff'
})

climbPost.addEventListener('mouseover', () => {
    if (lastClicked === 'climb') {
        climbTitle.style.color = '#383970'
        climbHR.style.borderColor = '#383970'
    } else {
        climbTitle.style.color = '#babebf'
        climbHR.style.borderColor = '#babebf'
    }
})

climbPost.addEventListener('mouseout', () => {
    if (lastClicked === 'climb') {
        climbTitle.style.color = '#A0A1F5'
        climbHR.style.borderColor = '#A0A1F5'
    } else {
        climbTitle.style.color = '#fff'
        climbHR.style.borderColor = '#fff'
    }
})

partnerPost.addEventListener('click', () => {
    lastClicked = 'partner'
    climbTitle.style.color = '#fff'
    climbHR.style.borderColor = '#fff'
    partnerTitle.style.color = '#81AEE5'
    partnerHR.style.borderColor = '#81AEE5'
})

partnerPost.addEventListener('mouseover', () => {
    if (lastClicked === 'partner') {
        partnerTitle.style.color = '#274469'
        partnerHR.style.borderColor = '#274469'
    } else {
        partnerTitle.style.color = '#babebf'
        partnerHR.style.borderColor = '#babebf'
    }
})

partnerPost.addEventListener('mouseout', () => {
    if (lastClicked === 'partner') {
        partnerTitle.style.color = '#81AEE5'
        partnerHR.style.borderColor = '#81AEE5'
    } else {
        partnerTitle.style.color = '#fff'
        partnerHR.style.borderColor = '#fff'
    }
})