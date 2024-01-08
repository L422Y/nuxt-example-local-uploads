import * as fs from "fs"
import mime from "mime"

export default eventHandler(async (event) => {
    const path = event.context.params?.path as string
    // sanitize path
    if (path.includes("..") || path.includes("//") || path.includes("\\\\")) {
        throw createError({
            statusCode: 403,
            message: "Forbidden",
            statusMessage: "Forbidden",
        })
    }

    if (!path) {
        throw createError({
            statusCode: 404,
            message: "Not found",
            statusMessage: "Not found",
        })
    }

    if (fs.existsSync(`uploads/${path}`)) {
        const file = fs.readFileSync(`uploads/${path}`)
        const contentType = mime.getType(path)
        if (contentType) {
            setHeader(event, "content-type", contentType)
        }
        return file
    }
})
