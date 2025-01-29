'use client'

import { Metrics } from "@/app/interfaces/metrics"

export default function TimeTable({metrics}:{metrics?:Metrics}) {
    return (
        <div className="grid grid-cols-2 border-solid rounded-md justify-items-center">
            <div>
                <div>Average Time To Finish Tasks:</div>
                <div className="text-center">{(metrics && Number(metrics.totalAverage)>0)? <div>{metrics.totalAverage.toString()} days</div>: <div>No Completed Tasks</div>}</div>
            </div>
            <div>
                <div>Average Time To FInish Tasks By Priority:</div>
                <div>Low {(metrics && Number(metrics.lowAverage)>0)? <div>{metrics.lowAverage.toString()} days</div>: <div>No Completed Tasks</div>}</div>
                <div>Medium {(metrics && Number(metrics.mediumAverage)>0)? <div>{metrics.mediumAverage.toString()} days</div>: <div>No Completed Tasks</div>}</div>
                <div>High {(metrics && Number(metrics.highAverage)>0)? <div>{metrics.highAverage.toString()} days</div>: <div>No Completed Tasks</div>}</div>
            </div>

        </div>
    )
}