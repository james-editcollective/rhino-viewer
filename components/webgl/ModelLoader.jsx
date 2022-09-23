import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader'
import { useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import * as THREE from 'three'
import useAttStore from '../../store/attStore'
import { BufferGeometry } from 'three'
// import { MeshLine, MeshLineMaterial } from "three.meshline";

export const ModelLoader = ({ path }) => {
  const rhinoObj = useLoader(Rhino3dmLoader, path, (loader) => {
    loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@7.14.0/')
  })

  const setTargetParkingCount = useAttStore(
    (state) => state.setTargetParkingCount
  )
  const setLotArea = useAttStore((state) => state.setLotArea)
  const setInternalRoadCells = useAttStore(
    (state) => state.setInternalRoadCells
  )

  // TODO : lineweight
  const whiteLine = new THREE.LineBasicMaterial({ color: 0xffffff })
  const grayLine = new THREE.LineBasicMaterial({ color: 0x999999 })
  const blueLine = new THREE.LineBasicMaterial({ color: 'blue' })
  const yellowLine = new THREE.LineBasicMaterial({ color: 'yellow' })
  const cyanLine = new THREE.LineBasicMaterial({ color: 'cyan' })
  const magentaLine = new THREE.LineBasicMaterial({ color: 'magenta' })

  const grayStdMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 })

  rhinoObj.rotation.x = -Math.PI / 2
  rhinoObj.traverse((child) => {
    if (!child.userData.attributes) return true

    const rhinoAtt = child.userData.attributes.userStrings
    const userStrings = {}
    rhinoAtt.map((att) => {
      userStrings = { ...userStrings, [att[0]]: att[1] }
    })

    if (child instanceof THREE.Line) {
      switch (userStrings.name) {
        case 'cells':
          child.material = magentaLine
          break
        case 'core':
          child.material = yellowLine
          child.position.z += 1
          break
        case 'road':
          child.material = cyanLine
          break
        case 'bldg_line':
          child.material = blueLine
          break
        case 'available_center_core_region':
          child.geometry = new BufferGeometry()
          break
        case 'adjusted_dev_lot':
          child.material = whiteLine
          break
        default:
          break
      }
    }
  })

  return (
    <Suspense>
      <primitive object={rhinoObj} />
    </Suspense>
  )
}
