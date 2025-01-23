'use client'

export default function TimeTable() {
    return (
        <div className="grid grid-cols-2 border-solid rounded-md justify-items-center">
            <div>
                <div>Average Time To Finish Tasks:</div>
                <div className="text-center">22:15 minutes</div>
            </div>
            <div>
                <div>Average Time To FInish Tasks By Priority:</div>
                <div>Low 10:25 minutes</div>
                <div>Medium 10:25 minutes</div>
                <div>High 10:25 minutes</div>
            </div>

        </div>
    )
}