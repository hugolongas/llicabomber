var App = Object.freeze({
    config:{
        apiRootUrl:window.VUE_APP_API_ROOT || process.env.VUE_APP_API_ROOT
    }
})

export default App.config