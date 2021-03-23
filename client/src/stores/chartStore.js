import { ChartState } from "../providerStates"
import { ChartReducer } from "../reducer"
import makeStore from './makeStore'

const [
    BrowseProvider,
    useChartDispatch,
    useChartStore
] = makeStore(ChartReducer, ChartState)

export { BrowseProvider, useChartDispatch, useChartStore }