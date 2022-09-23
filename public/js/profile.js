const followingBtn = document.querySelector('.following--profile-button')
const createPost = document.querySelector('.create--post')
const createPostWrapper = document.querySelector('.create--post-wrapper')
const climbPost = document.querySelector('.climb-post')
const partnerPost = document.querySelector('.partner-post')
const climbForm = document.querySelector('.climb--form')
const connectForm = document.querySelector('.connect--form')
const stars = Array.from(document.querySelectorAll('.star')).reverse()
const starInputs = Array.from(document.querySelectorAll('.star--input')).reverse()
const climbTitle = document.querySelector('.post--climb-title')
const partnerTitle = document.querySelector('.post--partner-title')
const [purple, darkPurple, white, lightGray] = ['#A0A1F5', '#383970', '#fff', '#babebf']


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

        // reset star colors
        stars.forEach(star => {
            star.style.color = white
        })

        stars[0].style.color = purple

        starInputs.forEach(input => {
            input.checked = false
        })

        starInputs[0].checked = true
    }
})

let lastClicked = 'climb'

climbPost.addEventListener('click', () => {
    lastClicked = 'climb'
    climbPost.style.background = purple
    partnerPost.style.background = 'none'
    climbForm.style.display = "flex"
    connectForm.style.display = "none"
    partnerTitle.style.color = lightGray
})

climbPost.addEventListener('mouseover', () => {
    if (lastClicked === 'climb') {
        climbTitle.style.color = darkPurple
    } else {
        climbTitle.style.color = white
    }
})

climbPost.addEventListener('mouseout', () => {
    if (lastClicked === 'climb') {
        climbTitle.style.color = white
    } else {
        climbTitle.style.color = lightGray
    }
})

partnerPost.addEventListener('click', () => {
    lastClicked = 'partner'
    climbPost.style.background = 'none'
    partnerPost.style.background = purple
    connectForm.style.display = "flex"
    climbForm.style.display = "none"
    climbTitle.style.color = lightGray
})

partnerPost.addEventListener('mouseover', () => {
    if (lastClicked === 'partner') {
        partnerTitle.style.color = darkPurple
    } else {
        partnerTitle.style.color = white
    }
})

partnerPost.addEventListener('mouseout', () => {
    if (lastClicked === 'partner') {
        partnerTitle.style.color = white
    } else {
        partnerTitle.style.color = lightGray
    }
})

stars.forEach((star, i) => {
    star.addEventListener('click', () => {
        stars.slice(1).forEach(star => star.style.color = white)

        // color stars before
        for (let j = 0; j <= i; j++) {
            stars[j].style.color = purple
        }
    })
})