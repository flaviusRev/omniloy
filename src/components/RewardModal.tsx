/** @format */

// EventModal.tsx
import React, { useEffect, useState } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { ReactComponent as CloseIcon } from "./../assets/icons/close_icon.svg"; // Import your close icon
import { ReactComponent as SelectedRewardIcon } from "./../assets/icons/reward_selected_icon.svg";
import { Typography } from "@material-tailwind/react";
import { supabase } from "../supabaseClient";

// Helper component for toggle buttons
const ToggleButton = ({ label, isActive, onClick }: any) => (
  <button
    className={`flex-1 ${
      isActive
        ? "bg-[#192245] text-white"
        : "bg-transparent border border-[#192245]"
    } py-2 px-4 rounded-full`}
    onClick={onClick}
  >
    {label}
  </button>
);

// Main component
const RewardModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (rewardDetails: {
    rewardType: string;
    rewardValue: string;
    selectedProductCondition: string;
    selectedProduct: number;
    rewardAmountType: string;
    productQuantity: number;
    spentCondition: string;
    startDateCondition: string;
    endDateCondition: string;
  }) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [rewardType, setRewardType] = useState("Coupon");
  const [rewardValue, setRewardValue] = useState("");
  const [rewardAmountType, setRewardAmountType] = useState("Discount");
  const [selectedProduct, setSelectedProduct] = useState<any>(0);
  const [productsList, setProductList] = useState<any>([]);
  const [productQuantity, setProductQuantity] = useState<any>(0);
  const [selectedProductCondition, setSelectedProductCondition] =
    useState("All");
  const [conditionType, setConditionType] = useState<any>("All");
  // State for the spent condition inputs
  const [spentCondition, setSpentCondition] = useState<any>({
    type: ">",
    value: "",
  });
  const [spentConditionRange, setSpentConditionRange] = useState<any>({
    lower: "",
    upper: "",
  });
  // State for the date condition inputs
  const [startDateCondition, setStartDateCondition] = useState<any>("");
  const [endDateCondition, setEndDateCondition] = useState<any>("");

  useEffect(() => {
    if (rewardType === "Product") {
      getProducts();
    }
  }, [rewardType]);

  useEffect(() => {
    if (conditionType === "Product") {
      getProducts();
    }
  }, [conditionType]);
  useEffect(() => {
    console.log("selected: ", selectedProduct);
  }, [selectedProduct]);

  const getProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    setProductList(data);
    console.log("ERROR: ", error);
  };
  const handleSave = () => {
    onSave({
      rewardType,
      rewardValue,
      selectedProductCondition,
      selectedProduct,
      rewardAmountType,
      productQuantity,
      spentCondition,
      startDateCondition,
      endDateCondition,
    });
    onClose();
  };

  if (!isOpen) return null;

  const renderSpentConditionInput = () => {
    return (
      <div className="flex items-center space-x-4">
        <Input
          type="number"
          label="Minimum Amount"
          value={spentConditionRange.lower}
          onChange={(e) =>
            setSpentConditionRange({
              ...spentConditionRange,
              lower: e.target.value,
            })
          }
          crossOrigin={undefined}
        />
        <Input
          type="number"
          label="Maximum Amount"
          value={spentConditionRange.upper}
          onChange={(e) =>
            setSpentConditionRange({
              ...spentConditionRange,
              upper: e.target.value,
            })
          }
          crossOrigin={undefined}
        />
      </div>
    );
  };

  const renderConditionInput = () => {
    switch (conditionType) {
      case "Product":
        return (
          <Select
            label="Product Condition"
            onChange={(e) => setSelectedProduct(e)}
            placeholder={undefined}
          >
            <Option value="All">All</Option>
            {productsList.map((product: any) => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
        );
      case "Spent":
        return renderSpentConditionInput();
      case "Date":
        return (
          <div className="flex items-center space-x-4">
            <Input
              type="date"
              label="Start Date"
              onChange={(e) => setStartDateCondition(e.target.value)}
              crossOrigin={undefined}
            />
            <Input
              type="date"
              label="End Date"
              onChange={(e) => setEndDateCondition(e.target.value)}
              crossOrigin={undefined}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow p-6 min-w-[20rem] w-auto">
        {/* Header */}
        <div className="flex justify-start items-center mb-4">
          <SelectedRewardIcon />
          <h3 className="text-xl font-semibold pl-4">Add Reward</h3>
          <CloseIcon
            onClick={onClose}
            className="cursor-pointer absolute top-2 right-2"
          />
        </div>

        {/* Reward description */}
        <div className="flex flex-row mb-4 justify-between">
          <div className="flex flex-col space-x-0 mr-36 tracking-tighter">
            <Typography className="text-sm" placeholder={undefined}>
              Which customers do you want to target? Where do they live?
            </Typography>
            <Typography className="text-sm" placeholder={undefined}>
              How old are they? Filter them as you like.
            </Typography>
          </div>
          <button
            className="bg-[#3E54AC] hover:bg-[#192245] text-white py-2 px-4 rounded-lg"
            onClick={() => console.log("use saved rewards")}
          >
            Use saved rewards
          </button>
        </div>

        {/* Reward type selection */}
        <Typography
          className="text-lg font-semibold mb-5"
          placeholder={undefined}
        >
          Reward type
        </Typography>
        <div className="mb-10 flex space-x-4">
          <ToggleButton
            label="Coupon"
            isActive={rewardType === "Coupon"}
            onClick={() => setRewardType("Coupon")}
          />
          <ToggleButton
            label="Product"
            isActive={rewardType === "Product"}
            onClick={() => setRewardType("Product")}
          />
          <ToggleButton
            label="Points"
            isActive={rewardType === "Points"}
            onClick={() => setRewardType("Points")}
          />
        </div>

        {/* Choose type */}
        <Typography
          className="text-lg font-semibold mb-5"
          placeholder={undefined}
        >
          {rewardType === "Product" ? "Choose product" : "Choose type"}
        </Typography>
        {rewardType !== "Product" && (
          <div className="mb-4 flex space-x-4 w-2/3">
            <ToggleButton
              label="Discount"
              isActive={rewardAmountType === "Discount"}
              onClick={() => setRewardAmountType("Discount")}
            />
            <ToggleButton
              label="Fixed amount"
              isActive={rewardAmountType === "Fixed amount"}
              onClick={() => setRewardAmountType("Fixed amount")}
            />
          </div>
        )}

        {/* Input for discount percentage or fixed amount */}
        <div
          className={`mb-10 ${rewardType === `Product` ? `w-2/3` : `w-1/3`}`}
        >
          {rewardType === "Product" ? (
            <div className="flex flex-row justify-between w-full space-x-4">
              <Select
                className=" h-10 px-2 text-base"
                label="Select Product"
                onChange={(e: any) => setSelectedProduct(e)}
                placeholder={undefined}
              >
                {productsList.map((product: any) => (
                  <Option key={product.id} value={product.id}>
                    {product.name}
                  </Option>
                ))}
              </Select>
              <Input
                variant="standard"
                className=" h-10 px-2 text-base bg-[#F6F6F6] border-b-[#192245]"
                label={"Amount"}
                onChange={(e) => setProductQuantity(e.target.value)}
                crossOrigin={undefined}
              />
            </div>
          ) : (
            <Input
              variant="standard"
              className="w-1/3 h-10 px-2 text-base bg-[#F6F6F6] border-b-[#192245]"
              label={rewardAmountType === "Discount" ? "Percentage" : "Amount"}
              onChange={(e) => setRewardValue(e.target.value)}
              crossOrigin={undefined}
            />
          )}
        </div>
        <Typography
          className="text-lg font-semibold mb-5"
          placeholder={undefined}
        >
          Condition
        </Typography>
        <div className="mb-4">
          <Select
            label="Condition"
            onChange={(e) => setConditionType(e)}
            placeholder={undefined}
          >
            <Option value="None">None</Option>
            <Option value="Product">Product</Option>
            <Option value="Spent">Spent</Option>
            <Option value="Date">Date</Option>
          </Select>
        </div>
        {renderConditionInput()}
        {/* Save button */}
        <div className="flex justify-end mt-6">
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

export default RewardModal;
