try {
  const StaticmanAPI = require('./server')
  const api = new StaticmanAPI()

  api.start(port => {
    console.log('API runing on ', port)
  })
} catch (e) {
  console.error(e)
}
