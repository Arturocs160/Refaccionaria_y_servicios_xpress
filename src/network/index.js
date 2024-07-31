const routesRoutes = require("./routes")
const registerRoutes = require("./register")
const productsRoutes = require("./products")
const servicesRoutes = require("./services")
const datesRoutes = require("./dates")

function routes(server){

    server.use("/", routesRoutes)
    server.use("/", registerRoutes)
    server.use("/", productsRoutes)
    server.use("/", servicesRoutes)
    server.use("/", datesRoutes)
    
}

module.exports = routes