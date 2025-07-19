import * as React from "react";
import { Input } from "./input";
import { InputProps } from "@radix-ui/react-input";

export interface PhoneInputProps extends Omit<InputProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: string;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value, onChange, defaultCountry = 'US', ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // Basic formatting - this is a simplified version
      // For production, consider using a library like libphonenumber-js
      let phoneNumber = event.target.value.replace(/\D/g, '');
      
      // Add the country code if not present
      if (phoneNumber && !phoneNumber.startsWith('+')) {
        // US country code is +1
        if (defaultCountry === 'US' && !phoneNumber.startsWith('1')) {
          phoneNumber = `+1${phoneNumber}`;
        } else {
          phoneNumber = `+${phoneNumber}`;
        }
      }
      
      onChange(phoneNumber);
    };

    return (
      <div className="flex items-center">
        <Input
          type="tel"
          ref={ref}
          value={value}
          onChange={handleChange}
          className={className}
          placeholder="+1 (555) 000-0000"
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput"; 