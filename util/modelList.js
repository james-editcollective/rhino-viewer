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
        models
    }
}

export default getModelList


// export const getStaticProps = async (context) => {
//   const files = fs.readdirSync(path.join("public", "models"));
//   const models = files.map((filename) => {
//     const slug = filename.replace(".3dm", "");

//     return { slug };
//   });
//   // const fileIndex = files.findIndex((filename) => {
//   //   return filename.replace(".3dm", "") === slug;
//   // });
//   // console.log(fileIndex);
//   // const prev_i = fileIndex === 0 ? files.length - 1 : fileIndex - 1;
//   // const next_i = (fileIndex + 1) % files.length;

//   // const prev_slug = files[prev_i].replace(".3dm", "");
//   // const next_slug = files[next_i].replace(".3dm", "");

//   const { slug } = context.params;
//   return {
//     props: {
//       slug,
//       models,
//       // prev_slug,
//       // next_slug,
//     },
//   };
// };