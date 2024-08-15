const routesRoutes = require("./routes")
const registerRoutes = require("./register")
const productsRoutes = require("./products")
const servicesRoutes = require("./services")
const datesRoutes = require("./dates")
const carrouselRoutes = require("./carrousel")


function routes(server){

    server.use("/", routesRoutes)
    server.use("/", registerRoutes)
    server.use("/", productsRoutes)
    server.use("/", servicesRoutes)
    server.use("/", datesRoutes)
    server.use("/", carrouselRoutes)
    
}

module.exports = routes