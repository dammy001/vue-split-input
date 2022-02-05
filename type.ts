export type SplitInputType = {
 values: any;
 index?: any;
};

export interface Prop extends HTMLInputElement {
 modelValue?: string;
 inputNumber: number;
 placeholders?: string[] | undefined;
 type: string;
 clearAllInput: () => void;
}
