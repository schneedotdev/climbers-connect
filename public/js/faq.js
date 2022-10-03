const questions = Array.from(document.querySelectorAll('.faq--li'))

questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.childNodes[3]

        console.log(question.childNodes[1].childNodes)

        if (answer.style.display === 'block') {
            answer.style.display = 'none'
            question.childNodes[1].childNodes[3].style.transform = 'rotate(360deg)'
        } else {
            answer.style.display = 'block'
            question.childNodes[1].childNodes[3].style.transform = 'rotate(180deg)'
        }
    })
})