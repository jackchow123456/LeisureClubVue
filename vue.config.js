{
    true
    lintOnSave:false
    module.exports = {
        devServer: {
          proxy: {
            '/api': {
              target: 'http://www.leisure_club.com/',
              ws: true,
              changeOrigin: true
            },
            '/foo': {
              target: '<other_url>'
            }
          }
        }
    }
}
