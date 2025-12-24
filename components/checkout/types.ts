export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  shippingMethod: "standard" | "express";
}

export interface CheckoutStep {
  number: number;
  label: string;
}

export interface ShippingOption {
  id: "standard" | "express";
  label: string;
  price: string;
  time: string;
}

export interface CheckoutCartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
