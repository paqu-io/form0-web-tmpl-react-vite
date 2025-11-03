import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Form0Calendar({
  className,
  fromYear = 1900,
  toYear = 2100,
  onSelect,
  selected,
  ...props
}) {
  const handleTodayClick = () => {
    if (onSelect) {
      onSelect(new Date());
    }
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isTodaySelected = isToday(selected);
  return (
    <div className="form0-calendar-container">
      <DayPicker
        showOutsideDays={false}
        captionLayout="dropdown"
        fromYear={fromYear}
        toYear={toYear}
        onSelect={onSelect}
        selected={selected}
        className={cn("form0-calendar", className)}
        classNames={{
        months: "form0-calendar__months",
        month: "form0-calendar__month",
        caption: "form0-calendar__caption",
        caption_label: "form0-calendar__caption-label",
        caption_dropdowns: "form0-calendar__dropdowns",
        dropdown: "form0-calendar__dropdown",
        dropdown_month: "form0-calendar__dropdown--month",
        dropdown_year: "form0-calendar__dropdown--year",
        dropdown_icon: "form0-calendar__dropdown-icon",
        nav: "form0-calendar__nav",
        nav_button: "form0-calendar__nav-button",
        nav_button_previous: "form0-calendar__nav-button--previous",
        nav_button_next: "form0-calendar__nav-button--next",
        table: "form0-calendar__table",
        head_row: "form0-calendar__head-row",
        head_cell: "form0-calendar__head-cell",
        row: "form0-calendar__row",
        cell: "form0-calendar__cell",
        day: "form0-calendar__day",
        day_today: "form0-calendar__day--today",
        day_selected: "form0-calendar__day--selected",
        day_disabled: "form0-calendar__day--disabled",
        day_outside: "form0-calendar__day--outside",
        day_hidden: "form0-calendar__day--hidden",
      }}
      components={{
        IconLeft: () => <ChevronLeft className="form0-calendar__nav-icon" />,
        IconRight: () => <ChevronRight className="form0-calendar__nav-icon" />,
      }}
      {...props}
      />
      <div className="form0-calendar-footer">
        <button
          type="button"
          className={cn("form0-calendar-today-button", isTodaySelected && "selected")}
          onClick={handleTodayClick}
        >
          Today
        </button>
      </div>
    </div>
  );
}
