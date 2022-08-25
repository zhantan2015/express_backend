export default function () {
    if (typeof (process.argv[2]) !== 'undefined') { // 如果输入了端口号，则提取出来
        if (isNaN(parseInt(process.argv[2]))) { // 如果端口号不为数字，提示格式错误
            throw 'Please write a correct port number.'
        } else { // 如果端口号输入正确，将其应用到端口
            return process.argv[2]
        }
    } else { // 如果未输入端口号，则使用下面定义的默认端口
        return 8888
    }
}