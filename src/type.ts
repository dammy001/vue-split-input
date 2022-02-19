export type SplitInputType = {
 values: any;
 index?: any;
};

export interface Prop extends Partial<HTMLInputElement> {
 modelValue?: string;
 inputNumber: number;
 placeholders?: string[] | undefined[] | unknown[];
 type: string;
 clearAllInput?: () => void;
}
