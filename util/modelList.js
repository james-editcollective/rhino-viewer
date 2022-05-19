import fs from 'fs'
import path from 'path'

export const getModelList = () => {
    const files = fs.readdirSync(path.join("public", "models"))
    const models = files.map((filename) => {
        const slug = filename.replace(".3dm", "")
        const [pnuIndex, pnu, pnuType, scenarioIndex] = slug.split("-")
        const id = `${pnuIndex}-${scenarioIndex}`
        console.log(pnuIndex, pnu, pnuType, scenarioIndex, id)

        return {
            slug,
            pnuIndex,
            pnu,
            pnuType,
            scenarioIndex
        }
    })
    return {
        models
    }
}

export default getModelList
