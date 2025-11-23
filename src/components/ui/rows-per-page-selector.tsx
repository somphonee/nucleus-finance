import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface RowsPerPageSelectorProps {
    value: number;
    onValueChange: (value: number) => void;
    options?: number[];
}

export function RowsPerPageSelector({
    value,
    onValueChange,
    options = [5, 10, 20, 50]
}: RowsPerPageSelectorProps) {
    const { t } = useLanguage();

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
                {t('common.rowsPerPage')}
            </span>
            <Select
                value={value.toString()}
                onValueChange={(val) => onValueChange(Number(val))}
            >
                <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={value.toString()} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={option.toString()}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
