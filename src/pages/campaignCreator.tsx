/** @format */

import React, { useEffect, useState } from "react";
import { ReactComponent as EventIcon } from "./../assets/icons/campaign_event_icon.svg";
import { ReactComponent as FilterIcon } from "./../assets/icons/campaign_filter_icon.svg";
import { ReactComponent as RewardIcon } from "./../assets/icons/campaign_reward_icon.svg";
import { ReactComponent as ActionIcon } from "./../assets/icons/campaign_action_icon.svg";
import { ReactComponent as SelectedEventIcon } from "./../assets/icons/event_selected_icon.svg";
import { ReactComponent as SelectedFilterIcon } from "./../assets/icons/filter_selected_icon.svg";
import { ReactComponent as SelectedRewardIcon } from "./../assets/icons/reward_selected_icon.svg";
import { ReactComponent as SelectedActionIcon } from "./../assets/icons/action_selected_icon.svg";
import { ReactComponent as PlaceholderEventIcon } from "./../assets/icons/placeholder_event.svg";
import { ReactComponent as PlaceholderFilterIcon } from "./../assets/icons/placeholder_filter.svg";
import { ReactComponent as PlaceholderRewardIcon } from "./../assets/icons/placeholder_reward.svg";
import { ReactComponent as PlaceholderActionIcon } from "./../assets/icons/placeholder_action.svg";
import { ReactComponent as CheckIcon } from "./../assets/icons/check_icon.svg";
import { ReactComponent as DeleteIcon } from "./../assets/icons/delete_icon.svg";
import { ReactComponent as DragIcon } from "./../assets/icons/drag_icon.svg";
import { Typography } from "@material-tailwind/react";
import Button from "../components/Button";
import EventModal from "../components/EventModal";
import RewardModal from "../components/RewardModal";
import FilterModal from "../components/FilterModal";

interface TransactionDetails {
  amount: string;
  currency: string;
}

interface EventDetails {
  eventType: string;
  eventDate?: string;
  transactionDetails?: TransactionDetails;
}

type Trigger = {
  id: string;
  name: string;
  description: string;
  descriptionPlaceholder: string;
  color: string;
  uniqueId: number;
};

const triggers: Omit<Trigger, "uniqueId">[] = [
  {
    id: "event",
    name: "Event",
    description: "Choose an event",
    descriptionPlaceholder: "Add event",
    color: "bg-[#E8EDFF] border border-[#6576BD]",
  },
  {
    id: "filter",
    name: "Filter",
    description: "Who is the target",
    descriptionPlaceholder: "Add filter",
    color: "bg-[#DCFFFE] border border-[#00CEC9]",
  },
  {
    id: "reward",
    name: "Reward",
    description: "Benefits they get",
    descriptionPlaceholder: "Add reward",
    color: "bg-[#FFE9F1] border border-[#FD79A8]",
  },
  {
    id: "action",
    name: "Action",
    description: "Send email",
    descriptionPlaceholder: "Add action",
    color: "bg-[#FFF1C5] border border-[#FFBF4A]",
  },
];

const createTrigger = (
  baseTrigger: Omit<Trigger, "uniqueId">,
  uniqueId: number
): Trigger => ({
  ...baseTrigger,
  uniqueId,
});

const TriggerOption: React.FC<{
  trigger: Trigger;
  onSelect: (trigger: Omit<Trigger, "uniqueId">) => void;
}> = ({ trigger, onSelect }) => {
  return (
    <div
      className={`flex flex-row justify-between p-2 px-4 ${trigger.color} rounded-xl shadow cursor-pointer w-auto`}
      onClick={() => onSelect(trigger)}
    >
      <div className="flex flex-row items-center">
        <div className={`h-10 w-10 text-gray-700 mr-3`}>
          {trigger.id === "event" && <EventIcon />}
          {trigger.id === "filter" && <FilterIcon />}
          {trigger.id === "reward" && <RewardIcon />}
          {trigger.id === "action" && <ActionIcon />}
        </div>
        <div>
          <Typography className="font-semibold text-lg" placeholder={undefined}>
            {trigger.name}
          </Typography>
          <Typography placeholder={undefined}>{trigger.description}</Typography>
        </div>
      </div>
      <div className="pt-1 ml-2">
        <DragIcon />
      </div>
    </div>
  );
};

const PlaceholderCard: React.FC<Omit<Trigger, "uniqueId">> = ({
  id,
  name,
  descriptionPlaceholder,
  color,
}) => {
  const Icon = () => {
    switch (id) {
      case "event":
        return <PlaceholderEventIcon />;
      case "filter":
        return <PlaceholderFilterIcon />;
      case "reward":
        return <PlaceholderRewardIcon />;
      case "action":
        return <PlaceholderActionIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row w-full items-center mx-auto justify-center">
      <div
        className={`flex justify-between items-center p-4 m-2 ${color} rounded-lg w-full max-w-lg border-2 border-dashed border-[#A4A4A4]`}
      >
        <div className="flex items-center">
          <div className="h-10 w-10 text-[#A4A4A4] mr-3">
            <Icon />
          </div>
          <div>
            <Typography
              className="font-semibold text-lg text-[#A4A4A4]"
              placeholder={undefined}
            >
              {name}
            </Typography>
            <Typography className="text-[#A4A4A4]" placeholder={undefined}>
              {descriptionPlaceholder}
            </Typography>
          </div>
        </div>
      </div>
      <DeleteIcon className="h-6 w-6 text-[#A4A4A4]" />
    </div>
  );
};

const CampaignCreator: React.FC = () => {
  const [savedTriggers, setSavedTriggers] = useState<Set<string>>(new Set());
  const [selectedTriggers, setSelectedTriggers] = useState<Trigger[]>([]);
  const [uniqueIdCounter, setUniqueIdCounter] = useState<number>(0);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [campaign, setCampaign] = useState<{ [key: string]: any }>({});

  const handleSelectTrigger = (baseTrigger: Omit<Trigger, "uniqueId">) => {
    const newTrigger = createTrigger(baseTrigger, uniqueIdCounter);
    setSelectedTriggers((prevSelectedTriggers) => [
      ...prevSelectedTriggers,
      newTrigger,
    ]);
    setUniqueIdCounter((prevId) => prevId + 1);
  };

  const handleRemoveTrigger = (uniqueId: number) => {
    setSelectedTriggers((prevSelectedTriggers) => {
      const updatedTriggers = prevSelectedTriggers.filter(
        (trigger) => trigger.uniqueId !== uniqueId
      );

      // Update the campaign object to remove the trigger with the uniqueId
      const triggerType = prevSelectedTriggers.find(
        (t) => t.uniqueId === uniqueId
      )?.id;
      if (triggerType) {
        setCampaign((prevCampaign) => {
          const newCampaign = { ...prevCampaign };
          delete newCampaign[triggerType]; // Remove the trigger from the campaign
          return newCampaign;
        });

        setSavedTriggers((prevSavedTriggers) => {
          const newSavedTriggers = new Set(prevSavedTriggers);
          newSavedTriggers.delete(triggerType);
          return newSavedTriggers;
        });
      }

      return updatedTriggers;
    });
  };

  const TriggerCard: React.FC<{ trigger: Trigger; onClick?: () => void }> = ({
    trigger,
    onClick,
  }) => {
    const Icon = () => {
      switch (trigger.id) {
        case "event":
          return <SelectedEventIcon />;
        case "filter":
          return <SelectedFilterIcon />;
        case "reward":
          return <SelectedRewardIcon />;
        case "action":
          return <SelectedActionIcon />;
        default:
          return null;
      }
    };
    const isSaved = savedTriggers.has(trigger.id);
    return (
      <div className="flex flex-row w-full items-center mx-auto justify-center">
        <div
          className={`flex justify-between items-center bg-white p-4 m-2 border border-[#D8DDEE] rounded-lg w-full max-w-lg  cursor-pointer`}
          onClick={onClick}
        >
          <div className="flex items-center">
            <div className="h-10 w-10 text-gray-700 mr-3">
              <Icon />
            </div>
            <div>
              <Typography
                className="font-semibold text-lg"
                placeholder={undefined}
              >
                {trigger.name}
              </Typography>
              <Typography placeholder={undefined}>
                {trigger.description}
              </Typography>
            </div>
          </div>
          {isSaved && (
            <div className="pt-1 ml-2">
              <CheckIcon className="text-green-600" />
            </div>
          )}
        </div>
        <DeleteIcon
          className="h-6 w-6 text-gray-700 cursor-pointer"
          onClick={() => handleRemoveTrigger(trigger.uniqueId)}
        />
      </div>
    );
  };
  const handleTriggerClick = (trigger: Trigger) => {
    console.log("Clicked on trigger:", trigger);
    if (trigger.id === "event") {
      setIsEventModalOpen(true);
    } else if (trigger.id === "reward") {
      setIsRewardModalOpen(true);
    } else if (trigger.id === "filter") {
      setIsFilterModalOpen(true);
    }
  };

  const renderTriggersAndPlaceholders = () => {
    const renderables = triggers.map((triggerType) => {
      const selectedOfType = selectedTriggers.filter(
        (t) => t.id === triggerType.id
      );
      const selectedComponents = selectedOfType.map((trigger) => (
        <TriggerCard
          key={trigger.uniqueId}
          trigger={trigger}
          onClick={() => handleTriggerClick(trigger)}
        />
      ));
      if (selectedComponents.length === 0) {
        selectedComponents.push(
          <PlaceholderCard
            key={`placeholder-${triggerType.id}`}
            id={triggerType.id}
            name={triggerType.name}
            descriptionPlaceholder={triggerType.descriptionPlaceholder}
            color="bg-transparent"
            description={""}
          />
        );
      }
      return selectedComponents;
    });

    return renderables.flat();
  };

  const isCampaignReady = () => {
    const hasEvent = selectedTriggers.some((t) => t.id === "event");
    const hasFilter = selectedTriggers.some((t) => t.id === "filter");
    const hasReward = selectedTriggers.some((t) => t.id === "reward");
    const hasAction = selectedTriggers.some((t) => t.id === "action");
    return hasEvent && hasFilter && hasReward && hasAction;
  };

  useEffect(() => {
    console.log("campaign items: ", campaign);
  }, [campaign]);

  const handleSaveEventDetails = (eventDetails: EventDetails) => {
    // Update the campaign object with the event details
    setCampaign((prevCampaign) => ({
      ...prevCampaign,
      event: eventDetails,
    }));
    setSavedTriggers(
      (prevSavedTriggers) => new Set(prevSavedTriggers.add("event"))
    );
  };

  const handleSaveRewardDetails = (rewardDetails: {
    rewardType: string;
    rewardValue: string;
    spentCondition: string;
    startDateCondition: string;
    endDateCondition: string;
    selectedProductCondition: string;
    selectedProduct: number;
    rewardAmountType: string;
    productQuantity: number;
  }) => {
    // Update the campaign object with the reward details
    setCampaign((prevCampaign) => ({
      ...prevCampaign,
      reward: rewardDetails,
    }));
  };

  const handleSaveFilterDetails = (filterDetails: any) => {
    setCampaign((prevCampaign) => ({
      ...prevCampaign,
      filters: [...(prevCampaign.filters || []), filterDetails],
    }));
  };

  return (
    <>
      <div className="flex flex-col pt-16 space-y-4">
        <div className="flex justify-between items-center px-8 mb-12">
          <Typography
            className="text-3xl font-semibold"
            placeholder={undefined}
          >
            Campaign Name
          </Typography>
          <div className="flex flex-row space-x-4">
            <Button
              text="Save draft"
              disabled={!isCampaignReady()}
              onClick={() => console.log("Save draft clicked")}
              borderColor={
                isCampaignReady() ? "border-[#3E54AC]" : "border-[#A4A4A4]"
              }
              borderWidth="border"
              textColor={
                isCampaignReady() ? "text-[#3E54AC]" : "text-[#A4A4A4]"
              }
              background="bg-transparent"
              padding="py-1 px-4"
              size="text-sm"
              rounded="rounded-md"
              fontWeight="font-semibold"
            />
            <Button
              text="Launch campaign"
              disabled={!isCampaignReady()}
              onClick={() => console.log("Launch campaign clicked")}
              borderColor="border-transparent"
              borderWidth="border"
              textColor="text-white"
              background={isCampaignReady() ? "bg-[#3E54AC]" : "bg-[#A4A4A4]"}
              padding="py-1 px-4"
              size="text-sm"
              rounded="rounded-md"
              fontWeight="font-semibold"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-auto bg-white rounded-3xl p-4 shadow-md space-y-8 px-8">
            <Typography
              className="text-2xl font-semibold mt-8"
              placeholder={undefined}
            >
              Triggers
            </Typography>
            {triggers.map((trigger, index) => (
              <TriggerOption
                key={index}
                trigger={createTrigger(trigger, uniqueIdCounter + index)} // Unique ID for React key, not related to our state
                onSelect={handleSelectTrigger}
              />
            ))}
          </div>
          <div className="w-3/4 flex flex-col items-center">
            {renderTriggersAndPlaceholders()}
          </div>
        </div>
      </div>
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSave={handleSaveEventDetails}
      />
      <RewardModal
        isOpen={isRewardModalOpen} // Make sure you have a state variable for this
        onClose={() => setIsRewardModalOpen(false)}
        onSave={handleSaveRewardDetails}
      />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onSave={handleSaveFilterDetails}
      />
    </>
  );
};

export default CampaignCreator;
