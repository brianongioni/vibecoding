export type UserRole = "BOOKER" | "OWNER" | "ADMIN";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export type PaymentStatus = "PENDING" | "SUCCEEDED" | "FAILED" | "REFUNDED";

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  name: string;
  description: string | null;
  location: string;
  capacity: number;
  pricePerHour: number;
  amenities: string[];
  imageUrl: string | null;
  isActive: boolean;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  totalPrice: number;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  stripePaymentId: string | null;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}
