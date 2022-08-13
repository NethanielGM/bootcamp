import {
    postWithAxios
} from '../models/Form.model.js'


export const getData = async (req, res) => {
    try {
        //const res = await postWithAxios(req.body)
        //return res
        res.send("Ok")
    } catch (err) {
        throw err
    }
}