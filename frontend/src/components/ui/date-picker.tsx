"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DateTimePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Pick a date and time",
  className,
  disabled = false,
}: DateTimePickerProps) {
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
      // If no time is set, use current time
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
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP 'at' p") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 space-y-3">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleDateSelect}
              initialFocus
              defaultMonth={new Date()}
            />
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium">
                Time
              </Label>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={timeValue}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
