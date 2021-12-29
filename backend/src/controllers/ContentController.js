const Annotations = require('../models/AnnotationData')

module.exports = {
    async update(req, res) {
        const { id } = req.params
        const { title, notes } = req.body
        const annotation = await Annotations.findOne({
            _id: id,
        })

        if (!annotation) {
            return res.status(401).json({ error: 'Registro não encontrado' })
        }

        if (title || notes) {
            if (title) {
                annotation.title = title
            }
            if (notes) {
                annotation.notes = notes
            }
            await annotation.save()
        }

        return res.json(annotation)
    },
}
