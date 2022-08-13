import Parking from '../migrations/Parking.migration.js'
import { Op } from 'sequelize'

export const addParking = async (fields, userId) => {
    try {
        return await Parking.create({
            userId: userId,
            lat: fields.lat,
            lng: fields.lng,
            time: fields.time,
        })
    } catch (err) {
        throw err;
    }
}

export const getAll = async (userId) => {
    const where = {
        userId: { [Op.not]: userId }
    }
    try {
        const res = await Parking.findAll({ where })
        console.log('res', res);

        return res
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}

export const getOne = async (userId) => {
    const where = { userId: userId }
    try {
        const res = await Parking.findOne({ where })
        console.log('res', res);

        return res
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}

export const remove = async (userId) => {
    const where = { userId: userId }
    console.log('delete test', where);
    try {
        // return await Parking.destroy({ where });
    } catch (err) {
        throw err;
    }
}

