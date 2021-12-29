const Annotations = require('../models/AnnotationData')

module.exports = {
    async read(req, res) {
        const priority = req.query
        const priorityList = await Annotations.find(priority)
        return res.json(priorityList)
    },

    async update(req, res) {
        const { id } = req.params
        const priorityUpdate = await Annotations.findOne({
            _id: id,
        })

        if (!priorityUpdate) {
            return res.status(401).json({ error: 'Registro não encontrado' })
        }

        priorityUpdate.priority = !priorityUpdate.priority
        await priorityUpdate.save()

        return res.json(priorityUpdate)
    },
}
