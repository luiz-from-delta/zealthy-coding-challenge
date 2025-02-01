"use client";

import { DatePickerProps } from "./DatePicker.types";
import cx from "classnames";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export function DatePicker({
  inputClassName,
  label,
  labelClassName,
  name,
  placeholder,
  wrapperClassName,
  ...props
}: DatePickerProps) {
  return (
    <div className={cx("w-full flex flex-col gap-2", wrapperClassName)}>
      <label
        htmlFor={name}
        className={cx(
          "w-full font-semibold text-xs text-paragraph",
          labelClassName
        )}
      >
        {label}
      </label>
      <div className="w-full relative">
        <ReactDatePicker
          name={name}
          wrapperClassName="w-full"
          calendarClassName="w-full !bg-[#FDFDFD] !border-[#F0F0F0]"
          showPopperArrow={false}
          popperClassName="w-full"
          weekDayClassName={() =>
            "!w-[54.5px] h-[38px] !inline-flex items-center justify-center font-mulish font-bold"
          }
          dayClassName={(date: Date) =>
            cx(
              "!w-[54.5px] h-[38px] !inline-flex items-center justify-center font-mulish",
              date.toDateString() === props.value?.toDateString()
                ? "!bg-primary-green !text-white"
                : "bg-[#F4F4F4] text-paragraph"
            )
          }
          className={cx(
            "w-full h-10 bg-input-background rounded text-paragraph text-input px-4 outline-none focus:ring-1 focus:ring-primary-green hover:ring-1 hover:ring-primary-green transition-all",
            inputClassName
          )}
          placeholderText={placeholder}
          selected={props.value}
          onChange={props.onChange}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <div className="w-full h-10 flex items-center justify-between px-4">
              <button
                onClick={decreaseMonth}
                className="w-8 h-8 rounded-full bg-opacity-10 bg-paragraph flex items-center justify-center"
              >
                <ArrowLeft />
              </button>
              <span className="font-bold font-mulish">
                {Intl.DateTimeFormat("en-US", {
                  month: "long",
                  year: "numeric",
                }).format(date)}
              </span>
              <button
                onClick={increaseMonth}
                className="w-8 h-8 rounded-full bg-opacity-10 bg-paragraph flex items-center justify-center"
              >
                <ArrowRight />
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
