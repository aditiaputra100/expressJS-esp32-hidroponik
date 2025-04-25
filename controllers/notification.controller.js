import Notification from "../models/notification.js"

export const addNotification = async (req, res) => {
    const {id, deviceId, title, body, type} = req.body

    try {
        const notification = await Notification.create({id, deviceId, title, body, type})

        return res.status(201).json({
            message: "Notification created"
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getListNotification = async (req, res) => {
    const deviceId = req.params.id
    const where = {
        deviceId: deviceId ? deviceId : ''
    }

    try {
        const notification = await Notification.findAll({where})

        if (notification.length == 0) {
            return res.status(404).json({message: "Notifikasi kosong"})
        }

        res.json(notification.map((value, index, array) => {
            return {
                id: value.dataValues.id,
                title: value.dataValues.title,
                body: value.dataValues.body,
                type: value.dataValues.type
            }
        }))
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}