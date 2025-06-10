
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface TimeSelectorProps {
  hours: number;
  minutes: number;
  onHoursChange: (hours: number) => void;
  onMinutesChange: (minutes: number) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  hours,
  minutes,
  onHoursChange,
  onMinutesChange,
}) => {
  const hourOptions = Array.from({ length: 25 }, (_, i) => i);
  const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="hours-select" className="text-sm font-medium text-foreground mb-2 block">
            Hours
          </Label>
          <Select value={hours.toString()} onValueChange={(value) => onHoursChange(parseInt(value))}>
            <SelectTrigger id="hours-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {hourOptions.map((hour) => (
                <SelectItem key={hour} value={hour.toString()}>
                  {hour}h
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="minutes-select" className="text-sm font-medium text-foreground mb-2 block">
            Minutes
          </Label>
          <Select value={minutes.toString()} onValueChange={(value) => onMinutesChange(parseInt(value))}>
            <SelectTrigger id="minutes-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {minuteOptions.map((minute) => (
                <SelectItem key={minute} value={minute.toString()}>
                  {minute}min
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground text-center">
        Total time: {hours}h {minutes}min
      </div>
    </div>
  );
};

export default TimeSelector;
