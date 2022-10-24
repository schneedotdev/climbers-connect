export default {
    getIndex: (req, res) => {
        res.render('index.ejs', {
            title: 'Home'
        })
    },
    getFAQ: (req, res) => {
        res.render('faq.ejs', {
            title: 'FAQ',
            user: req.user
        })
    },
}