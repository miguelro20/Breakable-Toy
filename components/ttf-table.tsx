'use client'

import { Metrics } from "@/app/interfaces/metrics"

export default function TimeTable({metrics}:{metrics?:Metrics}) {
    return (
        <div data-testid="time-table" className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
                <div className="text-lg font-semibold">Average Time To Finish Tasks:</div>
                <div className="text-center">{(metrics && Number(metrics.totalAverage)>0)? <div>{metrics.totalAverage.toString()} days</div>: <div>No Completed Tasks</div>}</div>
            </div>
            <div>
                <div className="text-lg font-bold">Average Time To FInish Tasks By Priority:</div>
                <div className="text-lg font-semibold">Low {(metrics && Number(metrics.lowAverage)>0)? <div className="font-medium">{metrics.lowAverage.toString()} days</div>: <div className="font-medium">No Completed Tasks</div>}</div>
                <div className="text-lg font-semibold">Medium {(metrics && Number(metrics.mediumAverage)>0)? <div className="font-medium">{metrics.mediumAverage.toString()} days</div>: <div className="font-medium">No Completed Tasks</div>}</div>
                <div className="text-lg font-semibold">High {(metrics && Number(metrics.highAverage)>0)? <div className="font-medium">{metrics.highAverage.toString()} days</div>: <div className="font-medium">No Completed Tasks</div>}</div>
            </div>

            </div>
        </div>
        
    )
}