module.exports = {
  apps: [{
    name: "express-app",
    script: "./build/app.js",
    // 项目运行的根目录
    cwd: './',
    // 是否在项目文件发生改动时重启项目：
    //   一般情况我们或多或少都会读写项目里的文件，如生成 cache 等，故不允许重启
    watch: false,

    /**
     * Control flow 配置
     */
    // 项目最小健康时间：我们这里认为该项目启动的 24h 内一定都是正常运行的，否则将产生 error 报错
    min_uptime: '1h',
    // 项目最大内存：当内存占用超过这个 limit 时将自动重启
    max_memory_restart: '500M',
    // 自动重启次数
    max_restarts: 10,
    // 每次尝试重启的间隔时间（毫秒）
    restart_delay: 4000,

    /**
     * Log file 配置
     */
    // 输出日志时的时间日期 prefix，每行日志前都会带上
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    // 程序运行控制台的正常输出保存位置
    out_file: './log/out.log',
    // 程序运行错误日志保存位置
    error_file: './log/error.log',
    // 是否将多个 pid 的进程日志合并，我们不希望日志还要分开看，所以合并在一个文件查看即可
    combine_logs: true,

    /**
     * 集群模式
     */
    instances : "4",
    exec_mode : "cluster"
  }],
}
