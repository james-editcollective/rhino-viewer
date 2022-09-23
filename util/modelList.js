import fs from 'fs'
import path from 'path'
import { nanoid } from 'nanoid'


export const getModelList = () => {
    const files = fs.readdirSync(path.join("public", "models"))
    const models = files.map((filename) => {
        const slug = filename.replace(".3dm", "")
        const [pnu, pnuType] = slug.split("-")
        const id = nanoid()

        return {
            slug,
            pnu,
            pnuType,
            id
        }
    })

    return {
        models: models.sort(sortByScenarioIndex)
    }
}

export default getModelList


const sortByScenarioIndex = (a, b) => {
    if (Number(a.pnu) > Number(b.pnu)) return 1
    if (Number(a.pnu) < Number(b.pnu)) return -1
    if (a.pnuType > b.pnuType) return 1
    if (a.pnuType < b.pnuType) return -1
}