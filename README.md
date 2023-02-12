<Rhixescans "http://localhost:8000/docs/">
    bookmarks: {
        list()
        create(id)
    }
    category: {
        list()
        read(id)
    }
    chapters: {
        create: {
            create()
        }
        delete: {
            delete(id)
        }
        reviews: {
            create(id)
        }
        update: {
            update(id)
        }
        list()
        read(id)
    }
    comics: {
        create: {
            create()
        }
        delete: {
            delete(id)
        }
        top: {
            list()
        }
        update: {
            update(id)
        }
        upload: {
            create()
        }
        list()
        read(id)
    }
    crawl: {
        create()
    }
    genres: {
        list()
        read(id)
    }
    like: {
        create()
    }
    reviews: {
        list()
        read(id)
    }
    users: {
        create: {
            create()
        }
        delete: {
            delete(id)
        }
        login: {
            create(email, password)
        }
        profile: {
            update: {
                update()
            }
            list()
        }
        update: {
            update(id)
        }
        list()
        read(id)
    }
