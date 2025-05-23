"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormControl, FormLabel, useFormField } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface MultiValueInputProps {
    value: string[];
    isDisabled: boolean;
    onChange: (value: string[]) => void;
}

export function IngredientInputField({ onChange, value, isDisabled }: MultiValueInputProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const { error } = useFormField()


    function addTag(tag: string): void {
        const trimmed = tag.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
        }
    }

    function removeTag(index: number): void {
        const updated = value.filter((_, i: number) => i !== index);
        onChange(updated);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
        if ((e.key === "Enter" || e.key === ",") && inputRef.current) {
            e.preventDefault();
            addTag(inputRef.current.value);
            inputRef.current.value = "";
        } else if (e.key === "Backspace" && inputRef.current?.value === "") {
            removeTag(value.length - 1);
        }
    }

    return (
        <FormControl>
            <div>
                <div className="flex flex-wrap items-center gap-2 px-3 py-2 min-h-[52px] w-full">
                    {value.map(function (tag: string, index: number) {
                        return (
                            <Badge
                                key={index}
                                className="px-3 py-2 rounded-sm"
                            >
                                <p className="text-md font-medium ">{tag}</p>
                                <Button
                                    type="button"
                                    variant={"ghost"}
                                    size={"icon"}
                                    onClick={function () {
                                        removeTag(index);
                                    }}
                                    className="hover:text-red-600 h-5 w-5 ml-2"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </Badge>
                        );
                    })}

                </div>
                <div>
                    <FormLabel>Ingredient</FormLabel>
                    <input
                        className={cn(
                            "flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 bg-white dark:bg-neutral-950 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
                            error && "dark:border-red-500 dark:focus-visible:ring-red-500 border-red-500 focus-visible:ring-red-500"
                        )}
                        disabled={isDisabled}
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                        placeholder="Type and press Enter or comma"
                        autoCapitalize="on"
                    />
                </div>
            </div>
        </FormControl>
    );
}
