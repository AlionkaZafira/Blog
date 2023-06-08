const db = require('../databases/db')

class Tag {
    static #table_name = 'tag';

    constructor(data) {
        this.id = data.id || null
        this.name = data.name || null

    }

    static all() {
        return new Promise((resolve, reject) => {
            const tag = []
            db.each('SELECT * FROM tag', (err, row) => {
                if (err)
                    reject(err)

                tag.push(new Tag(row))
            }, (err) => {
                resolve(tag)
            })
        })
    }

    static find(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM tag WHERE id = ?', id, (err, row) => {
                if (err)
                    reject(err)

                const tag = (row) ? new Tag(row) : null
                resolve(tag)
            })
        })
    }

    create() {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO tag(name) \
                VALUES(?, ? ,?)", [this.name], (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                resolve()
            })
        })
    }

    update(data) {
        return new Promise((resolve, reject) => {
            db.run("UPDATE tag SET content = ? WHERE id = ?", [data.content, this.id], async (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const tag = Tag.find(this.id)

                resolve(tag)
            })
        })
    }

    delete() {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM tag WHERE id = ?", [this.id], (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const tag = Tag.find(this.id)
                if (!tag)
                    reject('Erreur')

                resolve()
            })
        })
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
        }
    }
}

module.exports = Tag