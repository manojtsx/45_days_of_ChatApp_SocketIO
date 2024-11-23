import React from "react";

export interface BasicFormControlProps {
  label: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}

export interface ButtonProps {
  text: string;
  onClick: (event:React.FormEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
}

export interface CustomTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface A11yProps {
  id: string;
  "aria-controls": string;
}

export interface UserInterface {
  _id?: string;
  name?: string;
  password: string;
  email: string;
  confirmPassword?: string;
  pic?: string;
  token?: string;
}

export interface InputFileInterface {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PostDetailsInterface {
  pics: File;
  type?: string;
}
