import { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, isValid, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";

const DATE_STORE_FORMAT = "yyyy-MM-dd";

// Detect the user's locale date format order (DMY, MDY, or YMD)
function getLocaleDateFormat() {
  const testDate = new Date(2025, 0, 15); // January 15, 2025 (month=0 is January)
  const formatted = testDate.toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  // Parse the formatted string to detect order
  // formatted might be: "01/15/2025" or "15/01/2025" or "2025/01/15" etc.
  const parts = formatted.split(/[\/.,-]/); // Split by common separators

  // Find which part is which by value
  const dayIndex = parts.findIndex(p => parseInt(p) === 15);
  const monthIndex = parts.findIndex(p => parseInt(p) === 1);
  const yearIndex = parts.findIndex(p => parseInt(p) === 2025);

  // Determine format string for date-fns parse
  const formatParts = [];
  formatParts[dayIndex] = 'dd';
  formatParts[monthIndex] = 'MM';
  formatParts[yearIndex] = 'yyyy';

  // Get the separator from the formatted string
  const separator = formatted.match(/[\/.,-]/)?.[0] || '/';

  return formatParts.join(separator);
}

// Format date for display (following shadcn pattern)
function formatDate(date) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Check if date is valid (following shadcn pattern)
function isValidDate(date) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function DateFieldShadcn({
  field,
  value,
  onChange,
  onKeyDown,
  readOnly,
  inputProps = {},
  className,
}) {
  const {
    id: controlId,
    name,
    required,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    "aria-errormessage": ariaErrorMessage,
    ...remainingInputProps
  } = inputProps;

  // Parse form0-core value (yyyy-MM-dd string) to Date
  const initialDate = value ? new Date(value) : undefined;

  // State management (following shadcn pattern exactly)
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [month, setMonth] = useState(date);
  const [displayValue, setDisplayValue] = useState(formatDate(date));

  // Track if change is from user input (to prevent circular updates)
  const isInternalChangeRef = useRef(false);

  // Sync internal state when form0-core value changes externally
  useEffect(() => {
    if (isInternalChangeRef.current) {
      // This change came from user input, ignore it
      isInternalChangeRef.current = false;
      return;
    }

    // External change from form0-core (e.g., default_value: 'now')
    const newDate = value ? new Date(value) : undefined;
    const newDateStr = newDate && isValidDate(newDate) ? format(newDate, DATE_STORE_FORMAT) : "";
    const currentDateStr = date && isValidDate(date) ? format(date, DATE_STORE_FORMAT) : "";

    // Only update if the date actually changed
    if (newDateStr !== currentDateStr) {
      setDate(newDate);
      setDisplayValue(formatDate(newDate));
      if (newDate) {
        setMonth(newDate);
      }
    }
  }, [value, date]);

  // Get user's locale date format once
  const localeDateFormat = useRef(getLocaleDateFormat()).current;

  // Generate locale-aware placeholder showing expected format
  const getPlaceholder = () => {
    if (field?.placeholder) {
      return field.placeholder;
    }

    // Show example date in user's locale format
    const exampleDate = new Date(2025, 0, 15); // January 15, 2025
    const exampleFormat = exampleDate.toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    return `e.g., ${exampleFormat}`;
  };

  const placeholder = getPlaceholder();

  // ISO format for hidden native input (form0-core requirement)
  const isoValue = date && isValidDate(date) ? format(date, DATE_STORE_FORMAT) : "";

  return (
    <div className="w-full">
      {/* Hidden native date input for form submission (form0-core requirement) */}
      <input
        type="date"
        name={name}
        value={isoValue}
        onChange={() => {}} // No-op: this input is controlled by the visible input
        readOnly={true}
        required={required}
        aria-hidden="true"
        tabIndex={-1}
        className="sr-only"
        {...remainingInputProps}
      />

      {/* shadcn date picker with input (following shadcn pattern exactly) */}
      <div className="relative">
        <Input
          id={controlId}
          value={displayValue}
          placeholder={placeholder}
          className={cn("bg-background pr-10", className)}
          onChange={(e) => {
            if (readOnly) return;

            // Update display value immediately (free typing)
            const inputValue = e.target.value;
            setDisplayValue(inputValue);

            // Try to parse as a date using locale-aware format
            let parsedDate = parse(inputValue, localeDateFormat, new Date());

            // If that fails, try ISO format as fallback (yyyy-MM-dd)
            if (!isValidDate(parsedDate)) {
              parsedDate = parse(inputValue, DATE_STORE_FORMAT, new Date());
            }

            if (isValidDate(parsedDate)) {
              setDate(parsedDate);
              setMonth(parsedDate);
              // Notify form0-core of the change
              if (typeof onChange === "function") {
                isInternalChangeRef.current = true;
                onChange(format(parsedDate, DATE_STORE_FORMAT));
              }
            } else if (inputValue === "") {
              // Cleared the input
              setDate(undefined);
              if (typeof onChange === "function") {
                isInternalChangeRef.current = true;
                onChange(null);
              }
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              if (!readOnly) {
                setOpen(true);
              }
            }
            // Forward to form0-core's onKeyDown if provided
            if (onKeyDown) {
              onKeyDown(e);
            }
          }}
          disabled={readOnly}
          required={required}
          aria-required={required}
          aria-invalid={ariaInvalid}
          aria-errormessage={ariaErrorMessage}
          aria-describedby={ariaDescribedBy}
        />

        <Popover open={open} onOpenChange={(nextOpen) => {
          if (!readOnly) {
            setOpen(nextOpen);
          }
        }}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              disabled={readOnly}
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              fromYear={1900}
              toYear={2100}
              month={month}
              onMonthChange={setMonth}
              onSelect={(selectedDate) => {
                if (readOnly) return;

                setDate(selectedDate);
                setDisplayValue(formatDate(selectedDate));
                setOpen(false);

                // Notify form0-core of the change
                if (typeof onChange === "function") {
                  isInternalChangeRef.current = true;
                  if (selectedDate && isValidDate(selectedDate)) {
                    onChange(format(selectedDate, DATE_STORE_FORMAT));
                  } else {
                    onChange(null);
                  }
                }
              }}
              disabled={readOnly}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
