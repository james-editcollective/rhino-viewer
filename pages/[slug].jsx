import fs from "fs";
import path from "path";
import Link from "next/link";
import { Experience } from "../component/webgl/Experience";
import style from "../styles/viewmodel.module.css";
import { Nav } from "../component/Nav";
import useAttStore from "../store/attStore";
import getModelList from "../util/modelList";

export const ViewModel = ({ slug, models, prev_slug, next_slug }) => {
  const modelPath = `../../models/${slug}.3dm`;
  const targetParkingCount = useAttStore((state) => state.targetParkingCount);
  const lotArea = useAttStore((state) => state.lotArea);
  const internalRoadCells = useAttStore((state) => state.internalRoadCells);

  return (
    <>
      <div className={style.container}>
        <Experience path={modelPath} />
        <div className={style.prev_next}>
          <Link href={`/${prev_slug}`}>
            <a>
              <button>PREV</button>
            </a>
          </Link>
          <Link href={`/${next_slug}`}>
            <a>
              <button>NEXT</button>
            </a>
          </Link>
        </div>
        <div className={style.info}>
          <div>LOT INFO : {slug}</div>
          <div>대지면적 (㎡) : {lotArea}</div>
          <div>목표 주차 대수 : {targetParkingCount}</div>
          <div>내부 도로 자주식 주차 대수 : {internalRoadCells}</div>
        </div>
      </div>
      <Nav models={models} />
    </>
  );
};

export default ViewModel;

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("public", "models"));
  const paths = files.map((filename) => {
    const slug = filename.replace(".3dm", "");
    return {
      params: {
        slug,
        // slug: filename.replace(".3dm", ""),
      },
    };
  });
  // console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { models } = getModelList();
  const { slug } = context.params;
  console.log("models", models);
  const findedModelIndex = models.findIndex((model) => {
    return model.slug === slug;
  });

  const prev_i =
    findedModelIndex === 0 ? models.length - 1 : findedModelIndex - 1;
  const next_i = (findedModelIndex + 1) % models.length;

  const prev_slug = models[prev_i].slug;
  const next_slug = models[next_i].slug;

  return {
    props: {
      slug,
      models,
      prev_slug,
      next_slug,
    },
  };
};
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
// const prev_i = fileIndex === 0 ? files.length - 1 : fileIndex - 1;
// const next_i = (fileIndex + 1) % files.length;

// const prev_slug = files[prev_i].replace(".3dm", "");
// const next_slug = files[next_i].replace(".3dm", "");

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
