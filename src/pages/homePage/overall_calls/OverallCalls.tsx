import { ListFilterPlus } from "lucide-react"
import { useState, useCallback } from "react"
import CallsCard from "../../../components/callsCard/CallsCard"
import CustomButton from "../../../components/CustomButton"
import CustomeInputField from "../../../components/CustomeInputField"
import { callsDummyData } from "../../../utils/callsDummyData"
import dayjs from "dayjs"

const options = [
    { id: 0, label: "All", value: "all" },
    { id: 1, label: "Video", value: "video" },
    { id: 2, label: "Audio", value: "audio" },
]

const customeButtonOption = [
    {
        id: 1,
        label: "Relavence",
        value: "relavence",
    },
    {
        id: 2,
        label: "YesterDay",
        value: "yesterday",
    },
    {
        id: 3,
        label: "Today",
        value: "today"
    },
    {
        id: 4,
        label: "This Month",
        value: "this_month"
    },
    {
        id: 5,
        label: "Last Month",
        value: "last_month"
    }
]

const filterByData = (data: typeof callsDummyData, dateFilter: string) => {
    const now = dayjs();

    switch (dateFilter) {
        case "today":
            return data.filter((call) => dayjs(call.createdAt).isSame(now, "day"));
        case "yesterday":
            return data.filter((call) => dayjs(call.createdAt).isSame(now.subtract(1, "day"), "days"));
        case "this_month":
            return data.filter((call) => dayjs(call.createdAt).isSame(now, "month"));
        case "last_month":
            return data.filter((call) => dayjs(call.createdAt).isSame(now.subtract(1, "month"), "month"));
        default:
            return data;
    }
}

const filterByType = (data: typeof callsDummyData, typeOfFilter: string) => {
    if (typeOfFilter === "all") return data;
    return data.filter((call) => call.callType === typeOfFilter)
}

export default function OverallCalls() {
    const [selectedTypeFilter, setSelectedTypeFilter] = useState("all")
    const [selectedDateFilter, setSelectedDateFilter] = useState("relevance")

    console.log(selectedDateFilter, selectedTypeFilter, "from the overall calls");

    const applyFilters = useCallback((
        typeOfFilter: string,
        dateFilter: string
    ) => {
        let result = callsDummyData;
        result = filterByData(result, dateFilter);
        result = filterByType(result, typeOfFilter)
        return result;
    }, []);

    const filteredData = applyFilters(selectedTypeFilter, selectedDateFilter);

    const handleTypeFilter = useCallback((value: string) => {
        setSelectedTypeFilter(value)
    }, [])

    const handleDateFilter = useCallback((value: string) => {
        setSelectedDateFilter(value)
    }, [])

    return (
        <main className="p-4 min-h-screen flex flex-col gap-3">
            <section className="p-4 border-b border-gray-500 flex items-center justify-between gap-4">
                <p className="text-white font-semibold text-2xl">Calls</p>

                <div className="flex items-center gap-3 w-full max-w-md">
                    <div className="flex-1">
                        <CustomeInputField
                            options={options}
                            name="filter"
                            placeholder="Filter calls"
                            isDropdown={true}
                            onChangeInput={(e) => handleTypeFilter(e.target.value)}

                        />
                    </div>

                    <CustomButton
                        label="Filter"
                        icon={<ListFilterPlus />}
                        isModelOpen={true}
                        onChange={(e) => handleDateFilter(e.target.value)}
                        option={customeButtonOption}
                        onClick={() => { }}

                    />
                </div>
            </section>
            {(selectedTypeFilter !== "all" || selectedDateFilter !== "relevance") && (
                <div className="flex items-center gap-2 px-4">
                    <p className="text-gray-400 text-xs">Active filters:</p>
                    {selectedTypeFilter !== "all" && (
                        <span className="text-xs bg-[#4F6EF7]/20 text-[#4F6EF7] px-2 py-0.5 rounded-full capitalize">
                            {selectedTypeFilter}
                        </span>
                    )}
                    {selectedDateFilter !== "relevance" && (
                        <span className="text-xs bg-[#4F6EF7]/20 text-[#4F6EF7] px-2 py-0.5 rounded-full capitalize">
                            {customeButtonOption.find(o => o.value === selectedDateFilter)?.label}
                        </span>
                    )}
                    {/* ✅ Clear filter */}
                    <button
                        onClick={() => {
                            setSelectedTypeFilter("all")
                            setSelectedDateFilter("relevance")
                        }}
                        className="text-xs text-red-400 hover:text-red-300 ml-2"
                    >
                        Clear
                    </button>
                </div>
            )}

            <section className="grid grid-cols-5 gap-3">
                {filteredData.length === 0 ? (
                    <p className="text-gray-500 text-sm col-span-5 text-center mt-10">
                        No calls found
                    </p>
                ) : (
                    filteredData.map((call) => (
                        <CallsCard key={call.id} data={call} />
                    ))
                )}
            </section>

        </main>
    )
}