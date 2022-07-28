// import { createId } from "../common/hash"
// import sqlQuery from "../common/sqlQuery"
import ArticleService from "../services/articleService"
import { ArticleInfo } from "../services/articleService"

let articleInfo: ArticleInfo = {
    title: "测试标题1",
    content: "测试内容1",
    tags: ['ti', 't2', 't3']
};

(async () => {
    // let t = 'test_tag111'
    // let sql = 'INSERT INTO article_tags(atid,atname) ' +
    //     'SELECT ?,? FROM dual WHERE NOT EXISTS ' +
    //     '(SELECT * FROM article_tags WHERE atname = ?)'
    // let res = await sqlQuery(sql, [createId(), t, t])
    // console.log(res)
    // let atid = await sqlQuery('SELECT atid FROM article_tags WHERE atname = ?', ['tst_tag']) as any

    let res = await ArticleService.addArticle(articleInfo)
    console.log(res)
})()