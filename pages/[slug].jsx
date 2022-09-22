import fs from "fs";
import path from "path";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Experience } from "../components/webgl/Experience";
import Nav from '../components/Nav'
import useAttStore from "../store/attStore";
import getModelList from "../util/modelList";


function NextPrevious({next_slug, prev_slug}) {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <Link href={`/${prev_slug}`}>
      <button
        type="button"
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      </Link>
      <Link href={`/${next_slug}`}>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      </Link>
    </span>
  )
}

export const ViewModel = ({ currentModel, models, prevModel, nextModel }) => {
  const modelPath = `../../models/${currentModel.slug}.3dm`;
  const nextModelPath = `../../models/${nextModel.slug}.3dm`;
  
  return (
    <>
      <div className="absolute left-64 w-[calc(100%-16rem)] h-full">
        <div className="flex h-4/5">
        <Experience path={modelPath} />
        <div className="w-1"></div>
        <Experience path={nextModelPath} />
        </div>
        <div className='m-4'>
        <NextPrevious prev_slug={prevModel.slug} next_slug={nextModel.slug} />
        </div>
        <div className="p-4">
          <div>LOT INFO : {currentModel.slug}</div>
        </div>
      </div>
      <Nav models={models} currentModel={currentModel.slug} />
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
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { models } = getModelList();
  const { slug } = context.params;
  const currentModelIndex = models.findIndex((model) => {
    return model.slug === slug;
  });
  
  const currentModel = models[currentModelIndex]
  const prev_i =
    currentModelIndex === 0 ? models.length - 1 : currentModelIndex - 1;
  const next_i = (currentModelIndex + 1) % models.length;

  const prevModel = models[prev_i];
  const nextModel = models[next_i];

  return {
    props: {
      currentModel,
      models,
      prevModel,
      nextModel,
    },
  };
};
