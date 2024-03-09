import { UseFormReturn } from "react-hook-form";

export interface TStepProps {
    methods: UseFormReturn;
    onRequired: (value?: unknown) => boolean;
  }