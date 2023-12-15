/** @format */

// EventModal.tsx
import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "./../assets/icons/close_icon.svg";
import { ReactComponent as SelectedEventIcon } from "./../assets/icons/event_selected_icon.svg";
import { Select, Option, Typography, Input } from "@material-tailwind/react";

interface TransactionDetails {
  amount: string;
  currency: string;
}

interface EventDetails {
  eventType: string;
  eventDate?: string;
  transactionDetails?: TransactionDetails;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventDetails: EventDetails) => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSave }) => {
  const [eventType, setEventType] = useState<any>("Date");
  const [eventDate, setEventDate] = useState<string>("Immediately");
  const [transactionAmount, setTransactionAmount] = useState<string>("");
  const [currency, setCurrency] = useState<any>("USD");
  const [customDate, setCustomDate] = useState<any>("");

  const handleSave = () => {
    const details: EventDetails =
      eventType === "Transaction"
        ? {
            eventType,
            transactionDetails: { amount: transactionAmount, currency },
          }
        : {
            eventType,
            eventDate: eventDate === "Choose date" ? customDate : eventDate,
          };
    onSave(details);
    onClose();
  };

  if (!isOpen) return null;

  const renderDateOptions = () => (
    <div className="flex flex-col mt-4">
      <div className="flex space-x-4">
        <button
          className={`flex-1 ${
            eventDate === "Immediately"
              ? "bg-[#192245] text-white"
              : "bg-transparent border border-[#192245]"
          } py-2 px-4 rounded-full`}
          onClick={() => setEventDate("Immediately")}
        >
          Immediately
        </button>
        <button
          className={`flex-1 ${
            eventDate === "Choose date"
              ? "bg-[#192245] text-white"
              : "bg-transparent border border-[#192245]"
          } py-2 px-4 rounded-full`}
          onClick={() => setEventDate("Choose date")}
        >
          Choose date
        </button>
      </div>
      {eventDate === "Choose date" && (
        <div className="flex justify-end mt-4">
          <div className="w-1/2">
            <Input
              type="date"
              label="Start Date"
              onChange={(e) => setCustomDate(e.target.value)}
              crossOrigin={undefined}
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderTransactionOptions = () => (
    <div className="flex flex-col mt-4">
      <div className="flex items-center space-x-4 mb-4">
        <Input
          type="text"
          label="Amount"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          crossOrigin={undefined}
        />
        <Select
          label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e)}
          placeholder={undefined}
        >
          <Option value="USD">USD</Option>
          <Option value="EUR">EUR</Option>
          <Option value="GBP">GBP</Option>
        </Select>
      </div>
      <Typography placeholder={undefined}>
        Transactions above {transactionAmount} {currency}.
      </Typography>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow p-6 min-w-[20rem]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <SelectedEventIcon />
          <Typography className="text-xl font-semibold" placeholder={undefined}>
            Add Event
          </Typography>
          <CloseIcon onClick={onClose} className="cursor-pointer" />
        </div>

        {/* Body */}
        <div className="mb-4">
          <Typography className="mb-2" placeholder={undefined}>
            What action(s) need to take place so that the campaign is triggered?
          </Typography>
          <Select
            value={eventType}
            onChange={(e) => setEventType(e)}
            placeholder={undefined}
          >
            <Option value="Date">Date</Option>
            <Option value="Transaction">Transaction</Option>
          </Select>
        </div>

        {eventType === "Transaction"
          ? renderTransactionOptions()
          : renderDateOptions()}

        {/* Footer */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-[#3E54AC] hover:bg-[#192245] text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
