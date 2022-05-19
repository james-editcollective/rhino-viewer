import create from 'zustand';

export const useAttStore = create(set => ({
    targetParkingCount: 0,
    lotArea: 0,
    internalRoadCells: 0,
    setTargetParkingCount: (count) => set(state => ({ targetParkingCount: count })),
    setLotArea: (area) => set(state => ({ lotArea: area })),
    setInternalRoadCells: (count) => set(state => ({ internalRoadCells: count })),
}))

export default useAttStore