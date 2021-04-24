import { Request, Response } from "express"
import { SettingsService } from '../services/SettingsService'

class SettingsController {

    async create(request: Request, response: Response) {
        const { chat, username } = request.body

        const settingsService = new SettingsService

        const settings = settingsService.create({ chat, username })

        return response.json(settings)
    }

}

export { SettingsController }