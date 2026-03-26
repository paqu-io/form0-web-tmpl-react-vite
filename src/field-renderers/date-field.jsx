import { useCallback, useMemo, useState } from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format, isValid, parse, parseISO } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { cn } from "@/lib/utils";
import { Form0Calendar } from "./components/form0-calendar";

const DATE_STORE_FORMAT = "yyyy-MM-dd";
const DISPLAY_FORMAT = "PP";

const normalizeToDate = (raw) => {
  if (!raw) return null;
  if (raw instanceof Date) {
    return isValid(raw) ? raw : null;
  }
  if (typeof raw === "string") {
    if (raw.length === 0) return null;
    const trimmed = raw.includes("T") ? raw.split("T")[0] : raw;
    const parsedIso = parseISO(trimmed);
    if (isValid(parsedIso)) {
      return parsedIso;
    }
    const parsedFallback = parse(trimmed, DATE_STORE_FORMAT, new Date());
    return isValid(parsedFallback) ? parsedFallback : null;
  }
  return null;
};

export function DateField({
  field,
  value,
  onChange,
  onKeyDown,
  readOnly,
  inputProps = {},
  className,
}) {
  const [open, setOpen] = useState(false);

  const {
    id: controlId,
    name,
    required,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    "aria-errormessage": ariaErrorMessage,
    ...remainingInputProps
  } = inputProps;

  const selectedDate = useMemo(() => normalizeToDate(value), [value]);
  const isoValue = selectedDate ? format(selectedDate, DATE_STORE_FORMAT) : "";
  const displayValue = selectedDate ? format(selectedDate, DISPLAY_FORMAT) : "";

  const fallbackText =
    field?.placeholder ||
    (field?.label ? `Select ${field.label}` : "Select a date");

  const handleManualChange = useCallback(
    (event) => {
      if (typeof onChange !== "function" || readOnly) return;
      const nextValue = event.target.value;
      if (nextValue === "") {
        onChange(null);
      } else {
        onChange(nextValue);
      }
    },
    [onChange, readOnly]
  );

  const handleSelect = useCallback(
    (date) => {
      if (typeof onChange !== "function" || readOnly) return;
      if (!date || !isValid(date)) {
        onChange(null);
        return;
      }
      onChange(format(date, DATE_STORE_FORMAT));
      setOpen(false);
    },
    [onChange, readOnly]
  );

  const triggerAriaLabel = field?.label
    ? `Select ${field.label}`
    : "Select date";

  const handleOpenChange = useCallback(
    (nextOpen) => {
      if (readOnly) return;
      setOpen(nextOpen);
    },
    [readOnly]
  );

  const handleClear = useCallback(
    (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (typeof onChange !== "function" || readOnly) return;
      onChange(null);
      setOpen(false);
    },
    [onChange, readOnly]
  );

  const handleClearKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.stopPropagation();
        event.preventDefault();
        handleClear(event);
      }
    },
    [handleClear]
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <div className="form0-date-field">
        <input
          type="date"
          name={name}
          value={isoValue}
          onChange={handleManualChange}
          onKeyDown={onKeyDown}
          readOnly={readOnly}
          disabled={readOnly}
          required={required}
          aria-hidden="true"
          tabIndex={-1}
          className="form0-date-field__native-input"
          {...remainingInputProps}
        />

        <PopoverTrigger asChild>
          <button
            type="button"
            id={controlId}
            className={cn(
              "form0-field form0-field-trigger",
              readOnly && "form0-field--disabled",
              className
            )}
            aria-label={triggerAriaLabel}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-required={required}
            aria-invalid={ariaInvalid}
            aria-errormessage={ariaErrorMessage}
            aria-describedby={ariaDescribedBy}
            disabled={readOnly}
          >
            <span
              className={cn(
                "form0-field-value",
                displayValue ? "form0-field-value--filled" : "form0-field-value--placeholder"
              )}
            >
              {displayValue || fallbackText}
            </span>
            <div className="form0-field-actions">
              {displayValue && !readOnly && (
                <div
                  role="button"
                  tabIndex={0}
                  className="form0-field-clear"
                  onClick={handleClear}
                  onKeyDown={handleClearKeyDown}
                  aria-label="Clear date"
                >
                  <X className="form0-field-clear-icon" aria-hidden="true" />
                </div>
              )}
              <CalendarIcon className="form0-field-icon" aria-hidden="true" />
            </div>
          </button>
        </PopoverTrigger>
      </div>

      <PopoverContent className="form0-date-popover" align="start">
        <Form0Calendar
          mode="single"
          selected={selectedDate ?? undefined}
          onSelect={handleSelect}
          disabled={readOnly}
          required={required}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
