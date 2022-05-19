import { Rhino3dmLoader } from "three/examples/jsm/loaders/3DMLoader";
import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import useAttStore from "../../store/attStore";
// import { MeshLine, MeshLineMaterial } from "three.meshline";

export const ModelLoader = ({ path }) => {
  const rhinoObj = useLoader(Rhino3dmLoader, path, (loader) => {
    loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@7.14.0/");
  });

  const setTargetParkingCount = useAttStore(
    (state) => state.setTargetParkingCount
  );
  const setLotArea = useAttStore((state) => state.setLotArea);
  const setInternalRoadCells = useAttStore(
    (state) => state.setInternalRoadCells
  );

  // TODO : lineweight
  const redLine = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const grayLine = new THREE.LineBasicMaterial({ color: 0x999999 });
  const blueLine = new THREE.LineBasicMaterial({ color: "blue" });
  const yellowLine = new THREE.LineBasicMaterial({ color: "yellow" });
  const cyanLine = new THREE.LineBasicMaterial({ color: "cyan" });
  const magentaLine = new THREE.LineBasicMaterial({ color: "magenta" });
  rhinoObj.rotation.x = -Math.PI / 2;
  rhinoObj.traverse((child) => {
    if (child instanceof THREE.Line) {
      const rhinoAtt = child.userData.attributes.userStrings;
      const object_name = rhinoAtt[0];

      const target_parking_count = rhinoAtt[1];
      setTargetParkingCount(target_parking_count[1]);

      const lot_area = rhinoAtt[2];
      setLotArea(lot_area[1]);

      const internal_road_cells = rhinoAtt[3];
      setInternalRoadCells(internal_road_cells[1]);

      const object_name_val = object_name[1];
      switch (object_name_val) {
        case "cell":
          child.material = cyanLine;
          break;
        case "core":
          child.material = magentaLine;
          break;
        case "bldg":
          child.material = blueLine;
          break;
        case "top_floor":
          child.material = yellowLine;
          break;
        case "available_core_region":
          child.material = grayLine;
          break;
        default:
          break;
      }
    }
  });

  return (
    <Suspense>
      <primitive object={rhinoObj} />
    </Suspense>
  );
};
