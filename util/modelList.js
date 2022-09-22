import fs from 'fs'
import path from 'path'

export const getModelList = () => {
    const files = fs.readdirSync(path.join("public", "models"))
    const models = files.map((filename) => {
        const slug = filename.replace(".3dm", "")
        const [pnuIndex, pnu, pnuType, scenarioIndex] = slug.split("-")
        const id = `${pnuIndex}-${scenarioIndex}`

        return {
            slug,
            pnuIndex,
            pnu,
            pnuType,
            scenarioIndex,
            id
        }
    })

    return {
        models: models.sort(sortByScenarioIndex)
    }
}

export default getModelList


const sortByScenarioIndex = (a, b) => {
    if (Number(a.pnuIndex) > Number(b.pnuIndex)) return 1
    if (Number(a.pnuIndex) < Number(b.pnuIndex)) return -1
    if (a.pnuType > b.pnuType) return 1
    if (a.pnuType < b.pnuType) return -1
    return Number(a.scenarioIndex) - Number(b.scenarioIndex)
}