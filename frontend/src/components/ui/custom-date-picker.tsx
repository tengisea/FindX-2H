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

// Mongolian date formatting function
const formatDateMongolian = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Mongolian month names
    const monthNames = [
        "1-р сар",
        "2-р сар",
        "3-р сар",
        "4-р сар",
        "5-р сар",
        "6-р сар",
        "7-р сар",
        "8-р сар",
        "9-р сар",
        "10-р сар",
        "11-р сар",
        "12-р сар",
    ];

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return `${year} оны ${monthNames[month - 1]} ${day}-ны өдөр ${formattedTime} цагт`;
};

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
        // Close the popover after date selection
        setOpen(false)
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

    const handleClose = () => {
        setOpen(false)
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
                        {value ? formatDateMongolian(value) : placeholder}
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
                                Цаг
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
                        <div className="flex justify-end pt-2 border-t">
                            <Button
                                onClick={handleClose}
                                size="sm"
                                className="bg-[#FF8400] hover:bg-[#FF8400]/90 text-white"
                            >
                                Болсон
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}