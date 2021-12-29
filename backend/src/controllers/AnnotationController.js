const Annotations = require('../models/AnnotationData')

module.exports = {
    async read(req, res) {
        const annotationList = await Annotations.find()
        return res.json(annotationList)
    },

    async create(req, res) {
        const { title, notes, priority } = req.body

        if (!title) {
            return res
                .status(400)
                .json({ error: 'Título da tarefa é necessario' })
        }
        if (!notes) {
            return res
                .status(400)
                .json({ error: 'Nota da tarefa é necessaria' })
        }

        const annotationCreated = await Annotations.create({
            title,
            notes,
            priority,
        })

        return res.json(annotationCreated)
    },

    async delete(req, res) {
        const { id } = req.params
        const annotationDeleted = await Annotations.findOneAndDelete({
            _id: id,
        })

        if (!annotationDeleted) {
            return res.status(401).json({ error: 'Registro não encontrado' })
        }

        return res.json({ message: 'Registro excluído com sucesso' })
    },
}
