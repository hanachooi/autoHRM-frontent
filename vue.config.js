module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://211.253.28.110:8080',
        changeOrigin: true,
        pathRewrite: { '^/': '' },
      },
    },
    port: 3000
  },
};