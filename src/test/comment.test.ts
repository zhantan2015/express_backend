import { createId } from "../common/hash";
import CommentService, { CommentInfo } from "../services/commentService";

const commentInfo: CommentInfo = {
    aid: 'l5tmes6hr6npq1ox',
    content: 'dalkjdsa',
    author: 'zhantan',
    email: 'zhantan.mail',
    website: 'www.zhantan.com',
};

// CommentService.addComment(commentInfo)
(async function _() {
    let res = await CommentService.getCommentByAid('l5tmes6hr6npq1ox')
    console.log(res)
})()