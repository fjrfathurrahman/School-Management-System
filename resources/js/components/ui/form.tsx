import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import InputError from '../input-error';

interface FormInputRenderProps {
  component: 'input' | 'select' | 'textarea';
  label: string;
  value: string | number;
  onChange: (value: string | number | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => void;
  className?: string;
  type?: string;
  placeholder?: string;
  errors?: string;
  options?: (string | { value: string; label: string })[];
  disabled?: boolean;
}

export function FormInputRender({
  component,
  label,
  value,
  onChange,
  className,
  type,
  placeholder,
  errors,
  options,
  disabled
}: FormInputRenderProps) {
  return (
    <div>
      <Label>{label}</Label>
      {component === 'input' && (
        <Input
          type={type}
          value={value.toString()}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          className={className}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      {component === 'select' && (
        <Select value={value.toString()} onValueChange={(val) => onChange(val)} disabled={disabled}>
          <SelectTrigger className={className || 'w-full'}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem
                key={typeof option === 'string' ? option : option.value}
                value={typeof option === 'string' ? option : option.value}
              >
                {typeof option === 'string' ? option : option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {component === 'textarea' && (
        <Textarea
          value={value.toString()}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          className={className}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      <InputError message={errors} />
    </div>
  );
}