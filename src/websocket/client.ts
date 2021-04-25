import { io } from "../http"
import { ConnectionsService } from "../services/ConnectionsService"
import { UsersService } from "../services/UsersService"

io.on("connect", (socket) => {
    const connectionServices = new ConnectionsService()
    const usersServices = new UsersService()

    socket.on("client_first_access", async (params) => {
        //console.log(params)
        const socket_id = socket.id
        const { text, email } = params

        const userExists = await usersServices.findByEmail(email)

        if (!userExists) {
            const user = await usersServices.create(email)

            await connectionServices.create({
                socket_id,
                user_id: user.id
            })
        } else {
            const connection = await connectionServices.findByUserId(userExists.id)

            if (!connection) {
                await connectionServices.create({
                    socket_id,
                    user_id: userExists.id
                })
            } else {
                connection.socket_id = socket_id
                
                await connectionServices.create(connection)
            }



            
        }
        
    })
})