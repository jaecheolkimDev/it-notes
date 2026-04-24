// Vue CLI 프로젝트에서 빌드 도구(Webpack)와 개발 서버의 설정을 담당하는 설정 파일입니다.


const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {

    // 2026-04-17 : 로그 줄임
    devServer: {
        // 1. 터미널 로그 수준을 낮춥니다. (에러와 경고만 표시)
        stats: 'minimal',
        overlay: false,
        // 2. 브라우저 콘솔 로그 수준 조정
        clientLogLevel: 'silent',
    },

    configureWebpack: {
        // 2026-04-17 : 로그 줄임
        // 3. 빌드 과정의 상세 로그를 억제합니다.
        stats: 'errors-only',
        infrastructureLogging: {
            level: 'warn', // 'info' 대신 'warn'을 사용하면 빌드 과정 로그가 사라집니다.
        },
    },

}