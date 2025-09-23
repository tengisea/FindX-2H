"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CustomCalendar } from "./custom-calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CustomDateTimePickerProps {
    value?: Date
    onChange?: (date: Date | undefined) => void
    placeholder?: string
    className?: string
    disabled?: boolean
}

export function CustomDateTimePicker({
    value,
    onChange,
    placeholder = "Pick a date and time",
    className,
    disabled = false,
}: CustomDateTimePickerProps) {

    const [open, setOpen] = React.useState(false)
    const [timeValue, setTimeValue] = React.useState("")

    React.useEffect(() => {
        if (value) {
            const timeString = format(value, "HH:mm")
            setTimeValue(timeString)
        } else {
            setTimeValue("")
        }
    }, [value])

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate && timeValue) {
            const [hours, minutes] = timeValue.split(":").map(Number)
            const newDate = new Date(selectedDate)
            newDate.setHours(hours, minutes, 0, 0)
            onChange?.(newDate)
        } else if (selectedDate) {
            const newDate = new Date(selectedDate)
            const now = new Date()
            newDate.setHours(now.getHours(), now.getMinutes(), 0, 0)
            onChange?.(newDate)
            setTimeValue(format(now, "HH:mm"))
        } else {
            onChange?.(undefined)
        }
    }

    const handleTimeChange = (time: string) => {
        setTimeValue(time)
        if (value && time) {
            const [hours, minutes] = time.split(":").map(Number)
            const newDate = new Date(value)
            newDate.setHours(hours, minutes, 0, 0)
            onChange?.(newDate)
        }
    }

    return (
        <div className={cn("space-y-2", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal transition-colors",
                            "bg-white hover:bg-gray-100 text-gray-800 focus:outline-none focus:ring-0",
                            open && "opacity-40"
                        )}
                        disabled={disabled}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? format(value, "PPP 'at' p") : placeholder}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <div className="p-3 space-y-3 bg-white">
                        <CustomCalendar
                            mode="single"
                            selected={value}
                            onSelect={handleDateSelect}
                            initialFocus
                            defaultMonth={new Date()}
                        />
                        <div className="space-y-2">
                            <Label htmlFor="time" className="text-sm font-medium text-gray-900">
                                Time
                            </Label>
                            <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-gray-600" />
                                <Input
                                    id="time"
                                    type="time"
                                    value={timeValue}
                                    onChange={(e) => handleTimeChange(e.target.value)}
                                    className="flex-1 bg-white border-gray-200 text-gray-900 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}