import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export function DateTimePicker({ onPublishedAtChange }: { onPublishedAtChange: (date: Date) => void }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState<string>(
    format(new Date(), "HH:mm") // Default to current time
  );

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
    // Combine the selected date with the current time
    const [hours, minutes] = event.target.value.split(":");
    const newDate = date ? new Date(date) : new Date();
    newDate.setHours(parseInt(hours, 10));
    newDate.setMinutes(parseInt(minutes, 10));
    setDate(newDate);
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Combine the selected date with the current time
      const [hours, minutes] = time.split(":");
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      setDate(newDate);
    }
  };
  React.useEffect(() => {
    if(date){
      onPublishedAtChange(date)
    }
  }, [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            <>
              {format(date, "PPP")} at {format(date, "HH:mm")}
            </>
          ) : (
            <span>Pick a date and time</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
        <div className="p-3 border-t">
          <label htmlFor="time" className="block text-sm font-medium mb-1">
            Time
          </label>
          <Input
            type="time"
            id="time"
            value={time}
            onChange={handleTimeChange}
            className="flex justify-center"

          />
        </div>
      </PopoverContent>
    </Popover>
  );
}