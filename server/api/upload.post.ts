import * as fs from "fs"
import path from "node:path"

export default eventHandler(async (event) => {
    // handle multipart/form-data
    const multipart = await readMultipartFormData(event)
    if (!multipart) {
        throw createError({
            statusCode: 400,
            message: "Bad Request",
            statusMessage: "Bad Request",
        })
    }
    const fileName = multipart[0].filename
    const filePath = path.resolve("./", `uploads/${fileName}`)
    fs.writeFileSync(filePath, multipart[0].data)

    return {
        fileName: fileName,
        url: `/uploads/${fileName}`
    }
})
